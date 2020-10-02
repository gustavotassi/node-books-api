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

app.post('/addPerson', (req: express.Request, res: express.Response) => {
    DBService.getInstance().addPessoa(req.body).subscribe((response) => {
        res.json('Pessoa Inserida com Sucesso');
    }, (err) => {
        res.status(600).send(`Falha ao Inserir Pessoa: ${err}`);
    });
});

app.post('/uptPerson', (req: express.Request, res: express.Response) => {
    DBService.getInstance().uptPessoa(req.body).subscribe((response) => {
        res.json('Pessoa Atulizada com Sucesso');
    }, (err) => {
        res.status(600).send(`Falha ao Atualizar Pessoa: ${err}`);
    });
});

app.post('/delPerson', (req: express.Request, res: express.Response) => {
    DBService.getInstance().deletePessoa(req.body).subscribe((response) => {
        res.json('Pessoa Deletada com Sucesso.');
    }, (err) => {
        res.status(600).send(`Falha ao Deletar Pessoa: ${err}`);
    });
});

app.get('/getPerson', (req: express.Request, res: express.Response) => {

    DBService.getInstance().getPessoa().subscribe((pes) => {
        res.json(pes);
    }, (err) => {
        res.status(600).send(`Falha ao Trazer Pessoas: ${err}`);
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
