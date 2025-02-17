import express, {Express, Request, Response} from 'express';
import cors from 'cors';

const app: Express = express();

app.use(cors())


app.get('/', (req: Request, res: Response)=> {
    res.send('This is Todo Server with mysql database')
})



export default app;