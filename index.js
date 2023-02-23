import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import rateLimit from 'express-rate-limit'
dotenv.config();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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
    origin: 'https://tes-cockroachdb-production.up.railway.app'
}))
app.use(limiter)
app.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})

app.post('/products', async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = await prisma.product.create({
            data: {
                name,
                price,
            },
        });
        res.status(201).json({
            message: 'data created',
            product,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});



app.listen(process.env.PORT, () => console.log(`listening on http://localhost:${process.env.PORT}`));