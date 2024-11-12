import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config();

const app = express();

connectDB()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1800000 }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/health', (_, res) => {
  res.status(200).json({ message: 'API is running...' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use((err, _, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;