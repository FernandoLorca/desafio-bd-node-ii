import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
const app = express();

import postsRouter from './routes/posts.routes.js';

app.use(cors());
app.use(express.json());
app.use('/api', postsRouter);

app.get('/', (req, res) => {
  res.redirect('http://localhost:5173');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
