import mongoose from "mongoose";

export const connectToDb = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    await mongoose.connect(uri);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
  });
};