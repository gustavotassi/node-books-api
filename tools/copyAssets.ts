import * as shell from 'shelljs';

// Eu mando o arquivo convertido para JS lá pra /lib
// Mas eu não mando uma cópia das páginas EJS para lugar nenhum
// O comando abaixo vai copiar tudo do views para dist
shell.cp('-R', 'src/views', 'dist/');
