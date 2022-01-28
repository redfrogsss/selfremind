import config from '../../config/mysql';
var mysql = require('mysql');
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    function handler(req, res) {

        // Error Handler 
        const errorHandler = (err = null) => {
            res.status(401).json({ err: err });     // goes to clients side .catch(err) methods 
        }

        // Login Success Handler
        const loginSuccess = async (userID) => {
            // session part
            req.session.userID = userID;
            await req.session.save();

            res.status(200).json({ authStatus: true, userID: req.session.userID });     // goes to clients side .then(res) methods 
        }

        if (req.method === 'POST') {    // force methods to POST only for secure
            // Process a POST request

            // Get data from POST request
            const username = req.body.username;
            const pwd = req.body.pwd;

            if (!username | !pwd) {   // check whether username or pwd is empty
                errorHandler({ err: "Empty username / password. " });
            } else {
                //create SQL statements
                var statements = "SELECT id AS userID FROM auth WHERE username=? AND pwd=?;";
                var insert = [username, pwd];
                statements = mysql.format(statements, insert);

                //create MYSQL connection
                var con = mysql.createConnection(config);

                //connect to MYSQL and query statements
                con.connect(function (err) {
                    if (err) { errorHandler(err); };    //return error if exists
                    con.query(statements, function (err, result) {
                        if (err) { errorHandler(err); };    //return error if exists
                        if (!result) { errorHandler("result undefined") };   //return error if no result
                        const authResult = (result.length > 0);    // determine login result
                        if (authResult === true) {
                            loginSuccess(result[0].userID);
                        } else {
                            errorHandler({ err: "Invalid username / password." });
                        }
                    });
                });
            }

        } else {
            // Handle any other HTTP method
            errorHandler({ err: "Invalid method." });
        }

    },
    {
        cookieName: "myapp_cookiename",
        password: "mdTR2e7stMmnYm67NHeWEPdbQJppzzZ7",
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    },
);