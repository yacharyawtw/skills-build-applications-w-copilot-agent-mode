/**
 * Seed the octofit_db index with test data.
 * Run with: npm run seed --prefix octofit-tracker/backend
 */

import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seed(): Promise<void> {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at octofit_db');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    // Create sample users
    console.log('Creating users...');
    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        profile: {
          firstName: 'Alex',
          lastName: 'Johnson',
          bio: 'Marathon enthusiast and fitness lover',
        },
        totalActivityPoints: 450,
      },
      {
        username: 'sam_cyclist',
        email: 'sam@example.com',
        profile: {
          firstName: 'Sam',
          lastName: 'Smith',
          bio: 'Cycling is life',
        },
        totalActivityPoints: 380,
      },
      {
        username: 'jordan_swimmer',
        email: 'jordan@example.com',
        profile: {
          firstName: 'Jordan',
          lastName: 'Davis',
          bio: 'Water sports enthusiast',
        },
        totalActivityPoints: 320,
      },
      {
        username: 'taylor_yogi',
        email: 'taylor@example.com',
        profile: {
          firstName: 'Taylor',
          lastName: 'Wilson',
          bio: 'Yoga and wellness focused',
        },
        totalActivityPoints: 290,
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create sample teams
    console.log('Creating teams...');
    const teams = await Team.insertMany([
      {
        name: 'Morning Runners',
        description: 'A team dedicated to early morning runs',
        members: [users[0]._id, users[1]._id],
        totalTeamPoints: 830,
      },
      {
        name: 'Water Warriors',
        description: 'Water sports and swimming enthusiasts',
        members: [users[2]._id],
        totalTeamPoints: 320,
      },
      {
        name: 'Wellness Warriors',
        description: 'Holistic health and fitness community',
        members: [users[3]._id, users[0]._id],
        totalTeamPoints: 740,
      },
    ]);
    console.log(`✓ Created ${teams.length} teams`);

    // Create sample activities
    console.log('Creating activities...');
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        description: '5K morning run in the park',
        duration: 30,
        points: 150,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[0]._id,
        type: 'running',
        description: '10K training session',
        duration: 60,
        points: 300,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        description: 'Weekend bike ride',
        duration: 90,
        points: 380,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[2]._id,
        type: 'swimming',
        description: 'Pool workout - 50 laps',
        duration: 45,
        points: 320,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[3]._id,
        type: 'yoga',
        description: 'Vinyasa flow session',
        duration: 60,
        points: 200,
        date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
      },
      {
        userId: users[3]._id,
        type: 'meditation',
        description: 'Guided meditation',
        duration: 20,
        points: 90,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ Created ${activities.length} activities`);

    // Create leaderboard entries
    console.log('Creating leaderboard entries...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        rank: 1,
        totalPoints: 450,
        activitiesCount: 2,
      },
      {
        userId: users[1]._id,
        rank: 2,
        totalPoints: 380,
        activitiesCount: 1,
      },
      {
        userId: users[2]._id,
        rank: 3,
        totalPoints: 320,
        activitiesCount: 1,
      },
      {
        userId: users[3]._id,
        rank: 4,
        totalPoints: 290,
        activitiesCount: 2,
      },
    ]);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);

    // Create sample workouts
    console.log('Creating personalized workouts...');
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        title: 'Beginner Running Program',
        description: 'Start your running journey with this beginner-friendly program',
        exercises: [
          { name: 'Warm-up jog', duration: 5 },
          { name: '5K run', duration: 30 },
          { name: 'Cool-down walk', duration: 5 },
        ],
        difficultyLevel: 'beginner',
        estimatedDuration: 40,
      },
      {
        userId: users[1]._id,
        title: 'Advanced Cycling Workout',
        description: 'High-intensity interval training for cycling',
        exercises: [
          { name: 'Warm-up', duration: 10 },
          { name: 'HIIT intervals', sets: 5, reps: 30, duration: 40 },
          { name: 'Cool-down', duration: 10 },
        ],
        difficultyLevel: 'advanced',
        estimatedDuration: 60,
      },
      {
        userId: users[2]._id,
        title: 'Intermediate Swimming Routine',
        description: 'Build endurance with varied swimming techniques',
        exercises: [
          { name: 'Freestyle laps', sets: 10, reps: 50 },
          { name: 'Backstroke laps', sets: 5, reps: 50 },
          { name: 'Cool-down float', duration: 5 },
        ],
        difficultyLevel: 'intermediate',
        estimatedDuration: 45,
      },
      {
        userId: users[3]._id,
        title: 'Beginner Yoga for Wellness',
        description: 'Gentle yoga flows for relaxation and flexibility',
        exercises: [
          { name: 'Child pose', duration: 1 },
          { name: 'Downward dog', duration: 2 },
          { name: 'Vinyasa flow', duration: 20 },
          { name: 'Savasana', duration: 10 },
        ],
        difficultyLevel: 'beginner',
        estimatedDuration: 40,
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts`);

    console.log('\n✅ Database seed completed successfully!');
    console.log(`Summary: ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, ${workouts.length} workouts`);

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

void seed();
