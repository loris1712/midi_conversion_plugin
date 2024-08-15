import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3');



const db = new sqlite3.Database('./public/db.sqlite3', (err: any)=> {
    if(err){
        // console.log("Databse opening error: ", err)
    }
});


const initDB = (name: string, version: string) => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS App (name, version)');
    db.run('INSERT INTO App VALUES (?, ?)', [name, version]);
  });
};

export { initDB };
