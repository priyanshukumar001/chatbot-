import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.KEY_API);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


export default model;