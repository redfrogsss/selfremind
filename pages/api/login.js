import config from '../../config/mysql';
var mysql = require('mysql');

export default function handler(req, res) {

    if (req.method === 'POST') {
        // Process a POST request
        const username = req.body.username;
        const pwd = req.body.pwd;
    
        if(!username | !pwd){
            res.status(200).json({ err: "Empty username / password. "});
        } else {
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
                        res.status(200).json({ authStatus: true });
                    } else {
                        res.status(200).json({ err: "Invalid username / password.", query: req.query });
                    }
                });
            });
        }
    
      } else {
        // Handle any other HTTP method
        res.status(200).json({ err: "Invalid method." });
      }

}