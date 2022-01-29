import config from '../../../config/mysql';
var mysql = require('mysql');
import { withIronSessionApiRoute } from "iron-session/next";
import moment from 'moment'

export default withIronSessionApiRoute(
    function handler(req, res) {

        // Error Handler 
        const errorHandler = (err = undefined) => {
            res.status(401).json({ err: err, body: req.body, query: req.query });     // goes to clients side .catch(err) methods 
        }

        const createFolder = (value) => {  // Create a new item
            // Folder Object Structure
            const folder = {
                userID: parseInt(value.userID),
                name: value.name.toString(),
            }

            var statements = "INSERT INTO folders (userID, name) VALUES (?,?);";
            var insert = [folder.userID, folder.name];
            statements = mysql.format(statements, insert);

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

        const getAllFolders = (userID = undefined) => {
            if(userID === undefined) {
                errorHandler("No userID passed");
            } else {
                var statements = "SELECT * FROM folders WHERE userID=? ORDER BY name ASC;";
                var insert = [userID];
                statements = mysql.format(statements, insert);
    
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
        }

        if (req.method === 'POST') {
            if (!req.body.userID) { errorHandler("Not logged in.") } else {
                if (req.body.userID.toString() !== req.session.userID.toString()) { errorHandler("User not match") } else {
                    createFolder(req.body);
                }
            }
        } else if (req.method === 'GET') {
            if (!req.query.userID) { errorHandler("Not logged in.") } else {
                if (req.query.userID.toString() !== req.session.userID.toString()) { errorHandler("User not match") } else {
                    getAllFolders(req.query.userID);
                }
            }
        } else if (req.method === 'PUT') {
            errorHandler("PUT is not allowed.");
        } else if (req.method === 'DELETE') {
            errorHandler("DELETE is not allowed.");
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
