import { createClient, print } from 'redis';

const client = await createClient();
client.on('connect', () => {
  console.log('Redis client connected to the server');
});
    
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});


const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, print);
}

const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, rep) => {
    console.log(rep);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
