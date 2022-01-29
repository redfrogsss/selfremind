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

        const createItem = (value) => {  // Create a new item
            // Items Object Structure
            const items = {
                userID: parseInt(value.userID),
                name: value.name.toString(),
                description: value.description.toString(),
                datetime: moment(value.datetime).utc().format('YYYY-MM-DD HH:mm:ss'),
                reminder: parseInt(value.reminder),
                repeats: value.repeat.toString(),
                folder: parseInt(value.folder),
                finished: false,
            }

            var statements = "INSERT INTO items (userID, name, description, datetime, reminder, repeats, folder, finished) VALUES (?,?,?,?,?,?,?,?);";
            var insert = [items.userID, items.name, items.description, items.datetime, items.reminder, items.repeats, items.folder, items.finished];
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
            var statements = "SELECT * FROM items WHERE userID=? ORDER BY datetime ASC;";
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
            if (!req.body.userID) { errorHandler("Not logged in.") } else {
                if (req.body.userID.toString() !== req.session.userID.toString()) { errorHandler("User not match") } else {
                    createItem(req.body);
                }
            }
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
