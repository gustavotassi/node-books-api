import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

dotenv.config();

// Setando a porta padrão para 3000
const port = process.env.SERVER_PORT;
// Iniciando o aplicativo
const app = express();

const games: any[] = [];

app.use(cors());

//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurando o Express para usar EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Criando um endpoint, como vai ser a página inicial mesmo, então '/'
app.get('/', (req: express.Request, res: express.Response) => {
    // Renderizar o html em tela
    res.render('index');
});

// Criando um endpoint para inserir os livros
app.get('/games', (req: express.Request, res: express.Response) => {
    // Renderizar o html em tela
    res.render('games');
});

app.post('/games', (req: express.Request, res: express.Response) => {
    const game = req.body;

    console.log(game);
    games.push(game);

    res.send(game);
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
