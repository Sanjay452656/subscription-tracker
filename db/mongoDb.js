import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // ← move here

const DBuri = process.env.MONGODB_URI;

if (!DBuri) {
    throw new Error("Please make sure to add mongoDB uri");
}

const connectToDB = async () => {
    try {
        await mongoose.connect(DBuri);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
};

export default connectToDB;