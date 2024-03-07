import { createClient, print } from 'redis';

const client = await createClient();
client.on('connect', () => {
  console.log('Redis client connected to the server');
});
    
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});


const obj = {
  'Portland': 50,
  'Seattle': 80,
  'New York': 20,
  'Bogota': 20,
  'Cali': 40,
  'Paris': 2
};

for (const [field, value] of Object.entries(obj)) {
  client.hset('HolbertonSchools', field, value, print);
}

client.hgetall('HolbertonSchools',  (err, value) => {
  console.log(value);
});
