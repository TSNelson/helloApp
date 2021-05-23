
const MONGO_USER = process.env.MONGO_USER; // 'root'
const MONGO_PASSWORD = process.env.MONGO_PASSWORD; // 'example'
const MONGO_IP = process.env.MONGO_IP || 'mongo';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
// "mongodb://root:example@mongo:27017/?authSource=admin"
const REDIS_URL = process.env.REDIS_URL || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const SESSION_SECRET = process.env.SESSION_SECRET

module.exports = {
  MONGO_URL,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET
}