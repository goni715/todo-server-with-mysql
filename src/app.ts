import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import dbConnect from './utils/dbConnect';
import router from './routes/routes';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app: Express = express();

app.use(cors())
app.use(morgan("dev"))

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

//database connection
dbConnect();


app.get('/', (req: Request, res: Response)=> {
    res.send('This is Todo Server with mysql database')
})


app.use('/api/v1/todo', router)


app.use('*', (req: Request, res:Response)=> {
    res.status(404).json({
        sucess: false,
        data: "Route not found"
    })
})


export default app;