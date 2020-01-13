import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;
export interface IMongoUser extends Document {
  name: string;
  email: string;
  role: number;
  pwdHash: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  role: {
    type: Number,
    required: true,
  },
  pwdHash: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<IMongoUser>("User", userSchema);
