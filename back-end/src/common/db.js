const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'example',
    database : 'orders'
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                return reject(error);
            }
            const query = connection.query(sql, values, (error, results, fields) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(results, fields);
            });
            console.log(query.sql);
        });
    });
}

module.exports = {
    async execute (sql, values) {
        let result = null;
        try {
            result = await query(sql, values);
        } catch (error) {
            console.log(error);
        }
        return result;
    }
}