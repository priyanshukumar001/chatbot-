import express from 'express';
import { json as bodyParser } from 'express';
import connectDB from './config/db.js';
import UserRouter from './api/User_route.js';
import cors from 'cors';


const app = express();
connectDB();
const port = 3000;

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000/', // Your frontend's origin //need to be updated
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

//for accepting post form data
app.use(bodyParser());
app.use('/user', UserRouter);

app.listen(port, () => {
    console.log(`Sever running on port ${port}`);
})