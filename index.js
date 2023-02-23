import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { router as productRoute } from './routes/products-routes.js';
dotenv.config();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.ALLOW_ORIGIN
}))
app.use(limiter)
app.use('/products', productRoute);
app.listen(process.env.PORT, () => console.log(`listening on http://localhost:${process.env.PORT}`));