import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  exercises: Array<{
    name: string;
    sets?: number;
    reps?: number;
    duration?: number;
  }>;
  difficultyLevel: string; // 'beginner', 'intermediate', 'advanced'
  estimatedDuration: number; // in minutes
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number },
      reps: { type: Number },
      duration: { type: Number },
    },
  ],
  difficultyLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  estimatedDuration: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
