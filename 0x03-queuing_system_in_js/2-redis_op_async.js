import { createClient, print } from 'redis';
import { promisify } from 'util';

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

const getAsync = promisify(client.get).bind(client);

const displaySchoolValue = async (schoolName) => {
  const rep = await getAsync(schoolName)
  console.log(rep);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
