import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import mysql from 'mysql';
import dbConnect from './utils/dbConnect';

const app: Express = express();

app.use(cors())

//database connection
dbConnect();


app.get('/', (req: Request, res: Response)=> {
    res.send('This is Todo Server with mysql database')
})



export default app;