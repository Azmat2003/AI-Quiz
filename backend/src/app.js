import express from 'express';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js'
import cors from 'cors';
const app = express();


// connecting DB
connectDB();


// global middlewares
app.use(express.json());
app.use(cookieParser());


app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }
))

app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

export default app;