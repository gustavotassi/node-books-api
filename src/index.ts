import * as dotenv from 'dotenv';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { DBService } from './services/db-service';

dotenv.config();

// Setando a porta padrão para 3000
const port = process.env.SERVER_PORT;
// Iniciando o aplicativo
const app = express();

const people: any[] = [];

app.use(cors());

// Usar JSON no body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/api', (req: express.Request, res: express.Response) => {
//     res.send(req.body);
// });

app.post('/api', (req: express.Request, res: express.Response) => {
    res.json(req.body);

    // console.log(req.body);

    DBService.getInstance().addPessoa(req.body).subscribe((result) => console.log(result), (err) => console.log(err));
});

app.post('/delete', (req: express.Request, res: express.Response) => {
    res.json(req.body);

    // console.log(req.body);

    DBService.getInstance().deletePessoa(req.body).subscribe((result) => console.log(result), (err) => console.log(err));
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
