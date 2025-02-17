import express, {Express, Request, Response} from 'express';

const app: Express = express();


app.get('/', (req: Request, res: Response)=> {
    res.send('This is Todo Server with mysql database')
})



export default app;