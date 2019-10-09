const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'example',
    database : 'orders'
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        const query = connection.query(sql, values, (error, results, fields) => {
            if (error) {
                return reject(error);
            }
            resolve(results, fields);
        });
        console.log(query.sql);
    });
}
connection.connect();

module.exports = {
    async execute (sql, values) {
        let result = null;
        try {
            result = await query(sql, values);
        } catch (error) {
            console.log(error);
        }
        // connection.end();
        return result;
    }
}