import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

const app = express();
const port = 8000;


const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

function pass(any: any) {}
// Codespaces-aware API URL support
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

// Users API
app.get('/api/users/', async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Teams API
app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.post('/api/teams/', async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' });
  }
});

app.get('/api/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members');
    if (!team) {
      res.status(404).json({ error: 'Team not found' });
      return;
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

// Activities API
app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

app.post('/api/activities/', async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to log activity' });
  }
});

app.get('/api/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId');
    if (!activity) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Leaderboard API
app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).populate('userId');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.get('/api/leaderboard/:userId', async (req, res) => {
  try {
    const position = await Leaderboard.findOne({ userId: req.params.userId }).populate('userId');
    if (!position) {
      res.status(404).json({ error: 'User leaderboard position not found' });
      return;
    }
    res.json(position);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user leaderboard position' });
  }
});

// Workouts API
app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

app.get('/api/workouts/:userId', async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId }).populate('userId');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user workouts' });
  }
});

async function startServer(): Promise<void> {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at octofit_db');

    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend service:', error);
    process.exit(1);
  }
}

void startServer();
