import config from '../../../config/mysql';
var mysql = require('mysql');
import { withIronSessionApiRoute } from "iron-session/next";


export default withIronSessionApiRoute(
    function handler(req, res) {
        const { id } = req.query;

        // Error Handler 
        const errorHandler = (err = undefined) => {
            res.status(401).json({ err: err, body: req.body, query: req.query });     // goes to clients side .catch(err) methods 
        }

        const getFolder = (id) => { // get info with folder id
            var statements = "SELECT * FROM folders WHERE id=?;";
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

        const modifyFolder = (value) => {  // modify items with id
            const folder = {
                id: value.id
                name: value.name,
            }

            var statements = "";
            if (folder.name !== undefined) {
                statements += "UPDATE folders SET name=? WHERE id=?;";
                var insert = [folder.name, folder.id];
                statements = mysql.format(statements, insert);
            }
            
            var con = mysql.createConnection(config);

            con.connect(function (err) {
                if (err) {
                    res.status(200).json({ err: err, statements: statements });
                };
                con.query(statements, function (err, result) {
                    if (err) { res.status(200).json({ err: err, req: req.body, statements: statements }); };
                    res.status(200).json({ result: result, req: req.body, statements: statements })
                });
            });
        }

        const deleteItem = (id) => {  // delete items with id
            var statements = "DELETE FROM folders WHERE id=?;";
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
            errorHandler("POST is not allowed.");
        } else if (req.method === 'GET') {
            getItem(id);
        } else if (req.method === 'PUT') {
            modifyItem(id);
        } else if (req.method === 'DELETE') {
            deleteItem(id);
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
