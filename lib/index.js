"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db_service_1 = require("./services/db-service");
dotenv.config();
// Setando a porta padrão para 3000
const port = process.env.SERVER_PORT;
// Iniciando o aplicativo
const app = express();
const people = [];
app.use(cors());
// Usar JSON no body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/api', (req, res) => {
    res.json(req.body);
    // console.log(req.body);
    db_service_1.DBService.getInstance().addPessoa(req.body).subscribe((response) => console.log(response), (err) => console.log(err));
});
app.post('/delete', (req, res) => {
    res.json(req.body);
    // console.log(req.body);
    db_service_1.DBService.getInstance().deletePessoa(req.body).subscribe((response) => console.log(response), (err) => console.log(err));
});
app.get('/getPessoas', (req, res) => {
    db_service_1.DBService.getInstance().getPessoa().subscribe((pes) => res.json(pes), (err) => console.log(err));
});
app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
