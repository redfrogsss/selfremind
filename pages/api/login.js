import config from '../../config/mysql';
var mysql = require('mysql');

export default function handler(req, res) {

    const username = req.query.username;
    const pwd = req.query.pwd;

    if(!username | !pwd){
        res.status(200).json({ err: "Invalid username / password." });
        return ;
    }

    var statements = "SELECT COUNT(*) AS result FROM auth WHERE username=? AND pwd=?;";
    var insert = [username, pwd];
    statements = mysql.format(statements, insert);

    var con = mysql.createConnection(config);

    con.connect(function (err) {
        if (err) {
            res.status(200).json({ err: err });
        };
        con.query(statements, function (err, result) {
            if (err) { res.status(200).json({ err: err }); };
            const authResult = (result[0].result === 1);
            if(authResult === true) {
                res.status(200).json({ authStatus: "success" });
            } else {
                res.status(200).json({ err: "Invalid username / password." });
            }
        });
    });
}