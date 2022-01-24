import config from '../../config/mysql';
var mysql = require('mysql');
var fs = require('fs');
var readline = require('readline');

const sqlToString = async (path = "") => {  //convert sql file into string
    return new Promise((resolve) => {

        var statements = "";

        var rl = readline.createInterface({
            input: fs.createReadStream(path),
            terminal: false
        });
        
        rl.on('line', function (chunk) {
            statements += chunk.toString('ascii');
        });

        rl.on('close', function () {
            resolve(statements);
        });
    });
}

export default function handler(req, res) {
    var con = mysql.createConnection(config);

    sqlToString("./config/init.sql").then((statements)=> {
        con.connect(function (err) {
            if (err) {
                res.status(200).json({ err: err });
            };
            con.query(statements, function (err, result) {
                if (err) { res.status(200).json({ err: err }); };
                res.status(200).json({ result: result })
            });
        });
    });

}