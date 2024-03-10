import { createClient } from 'redis'
import { createQueue } from 'kue'
import { promisify } from 'util'
import express from 'express'


const client = await createClient();

client.on('error', (err) => {
  console.log(`Redis client not connect to the server ${err}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

const reserveSeat = (number) => {
  const asynSet = promisify(client.set).bind(client)
  asynSet('available_seats', number)
}

reserveSeat("50")

const getCurrentAvailableSeats = () => {
  const asynGet = promisify(client.get).bind(client)
  asynGet('available_seats')
}

let reservationEnabled = true;

const app = express();

app.get('/available_seats', (req, res) => {
  getCurrentAvailableSeats().then((num) => {
      res.json({'numberofAvailableSeats': num})
    })
})

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({'status': 'Reservation are blocked'})
    return
  }
  
  const job = queue.create('reserve_seat', )
  
  job.on('completed', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  })

  job.on('failed', err => console.log(`Seat reservation job ${job.id} failed: ${err.toString()}`))

  job.save((err) => {
    if (err) {
      res.json({'status': 'Reservation failed'})
      return
    } else {
      res.json({'status': 'Reservation in process'})
      return
    }
  })
})

app.get('/process', (req, res) => {
  res.json({'status': 'Queue processing'});
  queue.process('reserve_seat', (jobs, done) => {
    getCurrentAvailableSeats()
      .then((nums) => Number.parseInt(num))
      .then((num) => {
        reservationEnabled = num > 1 ? reservationEnabled : false
	if (num > 0) {
          reserveSeat(num - 1)
          done()
	} else {
          done(new Error('Not enough seats available'))
	}
      })
  })
})

app.listen(1245)
