import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT256;

app.use(express.json());

app.use('/api/hamburguesas', router);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})