import { createPool, MysqlError, Pool } from 'mysql';
import { Observable } from 'rxjs';
import { IPerson } from '../interfaces/person';

export class DBService {
    private static instance: DBService;

    private dbPool: Pool;

    private constructor() {

        this.dbPool = createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'people',
            connectionLimit: 50,
        });
    }

    static getInstance(): DBService {
        if (!DBService.instance) {
            DBService.instance = new DBService();
        }

        return DBService.instance;
    }

    // ADD

    addPessoa(pes: IPerson): Observable<any> {
        return new Observable<any>((obs) => {
            const query = `
            INSERT INTO tabpessoa (
                pesNome,
                pesSobrenome,
                pesEmail,
                pesCpf,
                pesSenha
            ) VALUES (
                ?,
                ?,
                ?,
                ?,
                ?
            )`;

            this.dbPool
                .query({ sql: query, values: [pes.name, pes.surname, pes.email, pes.cpf, pes.password] },
                    (err: MysqlError | null, results?: any) => {
                        if (err) {
                            obs.error(err);
                            return;
                        }
                        obs.next(results);
                        obs.complete();
                    }).start();
        });
    }

    // DELETE

    deletePessoa(pes: IPerson): Observable<any> {
        return new Observable<any>((obs) => {
            const query = `DELETE FROM tabpessoa WHERE pesCpf = ? AND pesSenha = ?`;

            this.dbPool
                .query({ sql: query, values: [pes.cpf, pes.password] },
                    (err: MysqlError | null, results?: any) => {
                        if (err) {
                            obs.error(err);
                            return;
                        }
                        obs.next(results);
                        obs.complete();
                    }).start();
        });
    }

    // TODO: updatePessoa
}
