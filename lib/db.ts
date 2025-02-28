import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('add MONGODB_URI environment variable');
}

interface CachedMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: CachedMongoose = global.mongoose as CachedMongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<Mongoose> {
  console.log('Connecting to database...');
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log('Connected to database');
      return mongoose;
    }).catch((error) => {
      console.error('Failed to connect to database', error);
      throw error;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;