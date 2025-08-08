import fs from 'fs';
import csv from 'csv-parser';
import mysql from 'mysql2';

export function insertRows() {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'Andrsxfelipe',
        password: 'idQ6kwx+',
        database: 'SR_Database1'
    });
    db.connect((error) => {
        if (error) throw error;
        console.log('Conectado exitosamente a la db');

        // Crear la bd si no existe descomentar lineas con * al final si se necesita crear
        // const createTableQuery = `CREATE TABLE IF NOT EXISTS product(*
        // id INT AUTO_INCREMENT PRIMARY KEY,*
        // product VARCHAR(255) NOT NULL,*
        // price DECIMAL(10, 2) NOT NULL,*
        // amount INT NOT NULL,*
        // isActive BOOLEAN NOT NULL DEFAULT true*
        // );`*

        // db.query(createTableQuery, (error) => {*
        //     if (error) throw error;*
        //     console.log('Tabla creada o ya existe.');*

        let pending = 0;
        fs.createReadStream('data_import.csv')
            .pipe(csv())
            .on('data', (row) => {
                pending++;
                // Esta linea se cambia dependiendo si el csv tiene true y false en su columna de estado
                // const status = row.status.toLowerCase() === 'true' ? 1 : 0;
                db.query('SELECT 1 FROM sr_costumers WHERE phone = ?', [row.phone], (err, results) => {
                    if (err) throw err;
                    if (results.length == 0) {
                        db.query('INSERT INTO sr_costumers (phone, name, address, status, note, city, main_language) VALUES (?, ?, ?, ?, ?, ?, ?)',
                            [row.phone, row.name, row.address, row.status, row.note, row.city, row.main_language],
                            (error) => {
                                if (error) throw error;
                                console.log('Fila insertada');
                                console.log(row);
                                console.log('--');
                                pending--;
                                if (pending === 0) {
                                    console.log('Todos los registros insertados.');
                                    db.end();
                                }
                            }
                        );
                    } else {
                        console.log('Registro duplicado, no se inserta:', row.phone);
                        pending--;
                        if (pending === 0) {
                            console.log('Todos los registros insertados.');
                            db.end();
                        }
                    }

                })

            })
            .on('end', () => {
                console.log('CSV único procesado.');
            });
        // });*
    });
}