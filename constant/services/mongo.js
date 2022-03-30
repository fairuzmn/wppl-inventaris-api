import mongoose from "mongoose";

export const MONGODB_URI =
  "mongodb+srv://admin:admin@cluster0.c3xy5.mongodb.net/wppl_inventaris?retryWrites=true&w=majority";

export const validateMongoID = (id) => mongoose.isValidObjectId(id);
