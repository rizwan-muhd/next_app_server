import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the user document
export interface User extends Document {
    mobileNumber: string;
    email: string;  // Include other fields as per your schema
    password: string;
    // Add other fields as necessary
  }

// Create the schema for the student model
const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
   
});

// Create the student model
const User = mongoose.model<User>('User', userSchema);

export default User;
