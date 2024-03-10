import { sinon } from 'sinon';
import { expect } from 'chai';
import { describe, it, after, before, afterEach} from 'mocha';
import { createQueue } from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationJobs', () => {
  let queue;
  let con;

  before(() => {
    queue = createQueue();
    con = sinon.spy(console);
    queue.testMode.enter(true);
  })

  after(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });


  afterEach(() => {
    con.log.resetHistory();
  });

  it('create two new jobs to the queue', (done) => {
    const jobs = [
      {
        phoneNumber: '4153518780',
	message: 'This is the code 1234 to verify your account'
      },
      {
	phoneNumber: '4153518781',
	message: 'This is the code 4562 to verify your account'
      }
    ]

    expect(queue.testMode.jobs.length).to.be.equal(0);
    createPushNotificationsJobs(job, queue);

    expect(queue.testMode.jobs.length).to.be.equal(2);
    expect(queue.testMode.jobs[0].data).to.be.deep.equal(jobs[0]);
    expect(queue.testMode.jobs[0].type).to.be.equal('push_notification_code_3');
    queue.process('push_notification_code_3', (jobs, done) => {
      expect(con.log.calledWith(`Notification job created ${queue.testMode.jobs[0].id}`)).to.be.true
    });
    done();
  })

  it('progress', (done) => {
    queue.testMode.jobs[0].addListener('progress', () => {
    const pro = 50

    expect(con.log.calledWith("Notification job", queue.testMode.jobs[0].id, '50% complete')).to.be.true;
      done()
    })
    queue.testMode.jobs[0].emit('progress', 50);
  })
})
