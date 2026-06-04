import { Schema, model, Types } from 'mongoose';

const workoutSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    focusAreas: [{ type: String }],
    suggestedDurationMinutes: { type: Number, default: 30, min: 5 },
    difficulty: { type: String, default: 'medium' },
  },
  { timestamps: true }
);

export const Workout = model('Workout', workoutSchema);
