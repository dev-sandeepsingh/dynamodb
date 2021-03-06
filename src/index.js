// require('newrelic');

const { port } = require('./config');
const { createSequelize } = require('./infra/sequelize');
const { createApp } = require('./infra/http/app');
const { reportError } = require('./infra/report-error');
const { Queue } = require('./common/queue.js');
const { createServices } = require('./services/index.js');

(async () => {
  const sequelize = await createSequelize();
  const queue = Queue();
  const services = createServices();

  const app = createApp({
    reportError,
    sequelize,
    queue,
    services,
  });

  const server = app.listen(port, () => {
    console.info(`Listening on ${port}`); // eslint-disable-line no-console
  });

  const cleanUp = async () => {
    try {
      await Promise.all([
        await sequelize.close(),
        queue.close(),
        await server.close(),
      ]);
      process.exit(0);
    } catch (err) {
      process.exit(1);
    }
  };

  process.on('SIGINT', cleanUp);
  process.on('SIGTERM', cleanUp);
})();
