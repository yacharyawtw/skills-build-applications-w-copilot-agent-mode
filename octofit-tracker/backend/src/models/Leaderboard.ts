import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  rank: number;
  totalPoints: number;
  activitiesCount: number;
  lastUpdated: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  rank: { type: Number, required: true },
  totalPoints: { type: Number, required: true },
  activitiesCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
