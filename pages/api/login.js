import config from '../../config/mysql';
var mysql = require('mysql');

export default function handler(req, res) {

    const errorHandler = (err = null) => {
        res.status(401).json({ err: err });
    }

    const loginSuccess = () => {
        res.status(200).json({ authStatus: true });
    }

    if (req.method === 'POST') {
        // Process a POST request
        const username = req.body.username;
        const pwd = req.body.pwd;
    
        if(!username | !pwd){
            errorHandler({err: "Empty username / password. "});
        } else {
            var statements = "SELECT COUNT(*) AS result FROM auth WHERE username=? AND pwd=?;";
            var insert = [username, pwd];
            statements = mysql.format(statements, insert);
        
            var con = mysql.createConnection(config);
        
            con.connect(function (err) {
                if (err) { errorHandler(err); };
                con.query(statements, function (err, result) {
                    if (err) { errorHandler(err); };
                    const authResult = (result[0].result === 1);
                    if(authResult === true) {
                        loginSuccess();
                    } else {
                        errorHandler({err: "Invalid username / password."});
                    }
                });
            });
        }
    
      } else {
        // Handle any other HTTP method
        errorHandler({err: "Invalid method."});
      }

}