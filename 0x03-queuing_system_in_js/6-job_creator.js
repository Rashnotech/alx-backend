import { createQueue } from 'kue'

const queue = createQueue();

const job = queue.create('push_notification_code', {
  phoneNumber: '+234817299',
  message: 'Registered'
})

job.on('complete', () => { console.log('Notification job completed'); });
job.on('failed attempt', () => { console.log('Notification job failed') });
job.save( function(err) {
  if (!err) console.log(`Notification job created: ${job.id}`);
});
