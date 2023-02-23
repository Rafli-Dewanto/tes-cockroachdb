import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { router as productRoute } from './routes/products-routes.js';
dotenv.config();


const app = express();
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: async (req, res) => {
		return res.status(429).json({
			message: "You can only make up to 5 request per 15 minutes, please try again later",
			code: 429,
			status: "TOO_MANY_REQUEST"
		})
	}
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [process.env.ALLOW_ORIGIN, 'http://127.0.0.1:5173'],
	credentials: true,
	optionsSuccessStatus: 200,
	methods: ['GET']
}))
app.use(limiter)
app.use('/products', productRoute);
app.listen(process.env.PORT, () => console.log(`listening on http://localhost:${process.env.PORT}`));