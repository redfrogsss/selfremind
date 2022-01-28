import config from '../../../config/mysql';
var mysql = require('mysql');
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    function handler(req, res) {

        // Error Handler 
        const errorHandler = (err = undefined) => {
            res.status(401).json({ err: err, body: req.body, query: req.query });     // goes to clients side .catch(err) methods 
        }

        const createItem = () => {  // Create a new item
            // Items Object Structure
            const items = {
                name: "Test1",
                description: "This is a testing item.",
                datetime: new Date(),
                reminder: 0,
                repeats: "",
                folder: "1",    //pending changes after implemented folder
                finished: false,
            }

            var statements = "INSERT INTO items (name, description, datetime, reminder, repeats, folder, finished) VALUES (?,?,?,?,?,?,?);";
            var insert = [items.name, items.description, items.datetime, items.reminder, items.repeats, items.folder, items.finished];
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

        const getAllItems = (id) => {
            var statements = "SELECT * FROM items WHERE userID=?;";
            var insert = [id];
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



        if (req.method === 'POST') {
            createItem();
        } else if (req.method === 'GET') {
            if (!req.query.userID) { errorHandler("Not logged in.") } else {
                if (req.query.userID.toString() !== req.session.userID.toString()) { errorHandler("User not match") } else {
                    getAllItems(req.query.userID);
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
