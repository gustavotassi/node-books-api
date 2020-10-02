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

    getPessoa(): Observable<IPerson[]> {
        return new Observable<IPerson[]>((obs) => {
            const query = `SELECT * FROM tabpessoa`;

            this.dbPool.query({ sql: query }, (err: MysqlError | null, results?: any) => {
                if (err) {
                    obs.error(err);
                    obs.complete();
                    return;
                }

                const res: IPerson[] = results;
                const peop: IPerson[] = [];

                res.map((pes) => {
                    peop.push(pes);
                });
                obs.next(peop);
                obs.complete();
            }).start();
        });
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
            const query = `
            DELETE FROM
                tabpessoa
            WHERE
                pesID = ?
            `;

            this.dbPool
                .query({ sql: query, values: [pes.id] },
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

    /* TODO: Terminar updatePessoa */

    // updatePessoa(pes: IPerson): Observable<any> {
    //     return new Observable<any>((obs) => {
    //         const query = `
    //         UPDATE
    //             tabpessoa
    //         SET
    //             pesNome = ?,
    //             pesSobrenome = ?,
    //             pesEmail = ?,
    //             pesCpf = ?,
    //             pesSenha = ?
    //         WHERE
    //             pesID = ?
    //         `;

    //         this.dbPool
    //             .query({ sql: query, values: [pes.name, pes.surname, pes.email, pes.cpf, pes.password, pes.ID] },
    //                 (err: MysqlError | null, results?: any) => {
    //                     if (err) {
    //                         obs.error(err);
    //                         return;
    //                     }
    //                     obs.next(results);
    //                     obs.complete();
    //                 }).start();
    //     });
    // }

}
