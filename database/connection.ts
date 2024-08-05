
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URL from environment variables
const MONGODB_URL = process.env.MONGO_URL || ''; // Provide a default value

// Set strict query option
mongoose.set('strictQuery', false);

// Create a connection function
const connection = async (): Promise<void> => {
    try {
        // Connect to MongoDB without deprecated options
        await mongoose.connect(MONGODB_URL);
        console.log('Database connected successfully');
    } catch (error: any) {
        console.error('Error in database connection:', error.message);
    }
};

// Event listeners for Mongoose connection
mongoose.connection.on('connected', () => {
    console.log('Database connected successfully');
});

mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
});

mongoose.connection.on('error', (error: any) => {
    console.error('Error in database connection:', error.message);
});

// Export the connection function
export default connection;
