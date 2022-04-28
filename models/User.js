import mongoose from "mongoose";

export const UserModel = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: String,
      username: String,
      password: String,
      register_at: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      timestamps: true,
    }
  )
);
