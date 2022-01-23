import config from '../../config/mysql';
var mysql = require('mysql');
const fs = require('fs')

export default function handler(req, res) {
    var statements = "";
    statements += "DROP TABLE IF EXISTS auth;";
    statements += "CREATE TABLE auth (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20), pwd VARCHAR(255));";
    statements += "INSERT INTO auth (username, pwd) VALUES ('admin', 'admin');";
    // statements += "CREATE TABLE items (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,);";

    var con = mysql.createConnection(config);

    con.connect(function (err) {
        if (err) {
            res.status(200).json({ err: err });
        };
        con.query(statements, function (err, result) {
            if (err) { res.status(200).json({ err: err }); };
            res.status(200).json({ result: result })
        });
    });
}