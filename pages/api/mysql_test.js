import config from '../../config/mysql';
var mysql = require('mysql');

export default function handler(req, res) {
    var con = mysql.createConnection(config);

    con.connect(function (err) {
        if (err) {
            res.status(200).json({ err: err });
        };
        con.query("SHOW TABLES;", function (err, result) {
            if (err) { res.status(200).json({ err: err }); };
            res.status(200).json({ result: result })
        });
    });
}