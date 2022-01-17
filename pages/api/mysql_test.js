import config from '../../config/mysql';
var mysql = require('mysql');

var con = mysql.createConnection(config);

export default function handler(req, res) {
    con.connect(function (err) {
        if (err) {
            res.status(200).json({ err: err });
        };
        con.query("SHOW TABLES", function (err, result) {
            if (err) {res.status(200).json({ err: err });};
            res.status(200).json({ result: result })
        });
    });
}