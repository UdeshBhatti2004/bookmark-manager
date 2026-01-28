import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Mongo url is not found");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    console.log("Database connected from cache");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((c) => c.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("Database connected from promise");
  } catch (error) {
    throw error;
  }

  return cached.conn;
};

export default connectDb;
