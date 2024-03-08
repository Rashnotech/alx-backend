import { createQueue } from 'kue'

const queue = createQueue();


const createPushNotificationsJobs = (jobs, queue) => {
  if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');

  for (const obj of jobs) {
    const job = queue.create('push_notification_code_3', obj);
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`)
    });

    job.on('failed', (err) => {
      console.log(`Notification job ${job.id} failed:`, err);
    });	


    job.on('progress', (progress, data) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    job.save( (err) => {
      if (!err) console.log(`Notification job created: ${job.id}`);
    })
  }
}

export default createPushNotificationsJobs;
