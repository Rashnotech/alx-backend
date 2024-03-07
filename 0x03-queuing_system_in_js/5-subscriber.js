import { createClient, print } from 'redis';

const client = await createClient();
client.on('connect', () => {
  console.log('Redis client connected to the server');
});
    
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});


client.subscribe('hoberton school channel');
client.on('message', (err, msg) => {
  console.log(msg);
  if (msg === "KILL_SERVER") {
    client.unsubscribe();
    client.quit();
  }
});
