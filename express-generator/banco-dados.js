const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('database.sqlite');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS user (name VARCHAR(200))");

    const stmt = db.prepare("INSERT INTO user VALUES (?)");

    for (let i = 0; i < 10; i++) {
        stmt.run("Person " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, name FROM user", function (err, row) {
        if (err) {
            console.error('Não foi possível executar a consulta.')
        } else {
            console.log(row.id + ": " + row.name);
        }
    });
});
