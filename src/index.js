import express from 'express'
import cookieParser from 'cookie-parser'; // import cookie-parser to use req.cookies
import cors from 'cors'
import Route from './Routes/index.js';
const app = express()

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // use cookie-parser to read cookies
app.use(cors())
Route(app)

app.listen(3001);