import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/satisfaction-survey');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});