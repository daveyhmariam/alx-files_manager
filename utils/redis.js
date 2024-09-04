import createClient from 'redis';
import promisify from 'util';

export default class RedisClient {
  constractor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`not connected: ${error}`);
    });
  }

  isAlive() {

  }

  async get(key) {
    const req = promisify(this.client.get).bind(this.client);
    const val = await req(key);
    return val;
  }

  async set(key, value, time) {
    const req = promisify(this.client.set).bind(this.client);
    await req.set(key, value);
    await this.client.expire(key, time);
  }

  async del(key) {
    const req = promisify(this.client.del).bind(this.client);
    await req(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
