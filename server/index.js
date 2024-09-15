import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

import path from "path";

import { fileURLToPath } from "url";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, '/client/build')))

app.get("*", (req, res) => res.sendFile(path.join(__dirname, '/client/build/index.html')))

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(PORT, ()=> console.log(`Server is up and running on port: ${PORT}`)) )
.catch((error) => console.log(error.message) );