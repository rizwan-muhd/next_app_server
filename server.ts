// src/index.ts

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connection from './database/connection'; 
import bodyParser from 'body-parser';
import userRoutes from './routes/user'; 

const app = express();

// Load environment variables
dotenv.config({ path: './.env' });

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to the database
connection();

// Mount routes
app.use('/api/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
