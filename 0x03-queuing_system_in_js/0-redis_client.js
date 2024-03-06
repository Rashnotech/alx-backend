import { createClient } from 'redis';

const connectToRedis = async () => {
  try {
    const client = await createClient();
    client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
    client.on('error', err => console.log(`Redis client not connected to the server: ${err.message}`));
  } catch (err) {
    console.log(`Redis client not connected to the server: ${err.message}`);
  }
}

connectToRedis();
