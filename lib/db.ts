import mongoose from 'mongoose';
//mongoose.set("strictQuery", false);
const uri = 'mongodb://localhost:27017/tasksDB'; // Cambia por tu URI de conexión

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export const getDatabase = (): mongoose.Connection => {
  return mongoose.connection;
};