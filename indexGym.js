const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

let workouts = [
  { 
    "id": "1",
    "exerciseName": "Hack Squats", 
    "date": "2026-07-23",
    "sets": [
      { "weight": 40, "reps": 15 },
      { "weight": 50, "reps": 12 },
      { "weight": 55, "reps": 10 }
    ]
  },
  { 
    "id": "2",
    "exerciseName": "Leg Press", 
    "date": "2026-07-23",
    "sets": [
      { "weight": 60, "reps": 15 },
      { "weight": 65, "reps": 12 },
      { "weight": 70, "reps": 10 }
    ]
  },
  { 
    "id": "3",
    "exerciseName": "Leg Extension", 
    "date": "2026-07-23",
    "sets": [
      { "weight": 30, "reps": 15 },
      { "weight": 35, "reps": 12 },
      { "weight": 40, "reps": 10 }
    ]
  },
  { 
    "id": "4",
    "exerciseName": "Leg Curls", 
    "date": "2026-07-23",
    "sets": [
      { "weight": 35, "reps": 15 },
      { "weight": 40, "reps": 12 },
      { "weight": 45, "reps": 10 }
    ]
  },
  { 
    "id": "5",
    "exerciseName": "Standing Calf Raises", 
    "date": "2026-07-23",
    "sets": [
      { "weight": 50, "reps": 15 },
      { "weight": 60, "reps": 15 },
      { "weight": 70, "reps": 15 }
    ]
  },
    { 
    "id": "6",
    "exerciseName": "Standing Lunges", 
    "date": "2026-07-23",
    "sets": [
      { "side": "left", "weight": 0, "reps": 10 },
      { "side": "right", "weight": 0, "reps": 10 },
      { "side": "left", "weight": 0, "reps": 10 },
      { "side": "right", "weight": 0, "reps": 10 },
      { "side": "left", "weight": 0, "reps": 10 },
      { "side": "right", "weight": 0, "reps": 10 },
    ]
  },
]

// Custom token so POST bodies can appear in logs
morgan.token('body', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
)

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateId = () => {
  return Math.floor(Math.random() * 1000000).toString();
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

app.get('/info', (request, response) => {
  response.send(`<p>Workout log has info for ${workouts.length} workouts</p><p>${new Date().toISOString()}</p>`)
});

app.post('/api/workouts', (request, response) => {
  const body = request.body;

  if (!body.exerciseName || !body.date || !Array.isArray(body.sets) || body.sets.length === 0) {
    return response.status(400).json({
      error: 'exerciseName, date, and sets are required'
    })
  }

  const hasInvalidSet = body.sets.some(set => {
    return set.weight === undefined || set.reps === undefined;
  });

  if (hasInvalidSet) {
    return response.status(400).json({
      error: 'each set must include weight and reps'
    })
  }

  const workout = {
    exerciseName: body.exerciseName,
    date: body.date,
    sets: body.sets,
    id: generateId(),
  }

  workouts = workouts.concat(workout);
  response.json(workout);
});


app.get('/api/workouts', (request, response) => {
  const { exerciseName, date } = request.query;

  if (exerciseName) {
    const filtered = workouts.filter(workout => workout.exerciseName === exerciseName);
    return response.json(filtered);
  }

  if (date) {
    const filtered = workouts.filter(workout => workout.date === date);
    return response.json(filtered);
  }

  response.json(workouts);
});

app.delete('/api/workouts/:exerciseName', (request, response) => {
  const exerciseName = request.params.exerciseName;
  workouts = workouts.filter(workout => workout.exerciseName !== exerciseName);
  response.status(204).end();
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
