const IORedis = require('ioredis');

const client = new IORedis(process.env.REDIS_URI);
client.setMaxListeners(process.env.REDIS_MAX_LISTENER_COUNT || 25);

module.exports = client;
