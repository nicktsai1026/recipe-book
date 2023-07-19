import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}

export default connectMongoDB;