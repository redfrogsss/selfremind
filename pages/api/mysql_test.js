import config from '../../config/mysql';
var mysql = require('mysql');

export default function handler(req, res) {
    const statements = "SHOW TABLES";

    var con = mysql.createConnection(config);

    con.connect(function (err) {
        if (err) {
            res.status(200).json({ err: err });
        };
        con.query(statements, function (err, result) {
            if (err) { res.status(200).json({ err: err }); };
            res.status(200).json({ result: result, req: req.query })
        });
    });
}