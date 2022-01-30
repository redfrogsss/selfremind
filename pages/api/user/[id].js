import config from '../../../config/mysql';
var mysql = require('mysql');

export default function handler(req, res) {
    const { id } = req.query;

    // Error Handler 
    const errorHandler = (err = undefined) => {
        res.status(401).json({ err: err });     // goes to clients side .catch(err) methods 
    }

    const getUser = (id) => { // get info with user id
        var statements = "SELECT * FROM auth WHERE id=?;";
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

    const modifyUser = (id) => {  // modify user with id
        const items = {
            username: req.body.username,
            pwd: req.body.pwd,
        }

        if (!req.body.username & !req.body.pwd) { errorHandler("No value passed") }
        else {
            var statements = "";
            if (items.username) {
                statements += "UPDATE auth SET username=? WHERE id=?;";
                var insert = [items.name, id];
                statements = mysql.format(statements, insert);
            }
            if (items.pwd) {
                statements += "UPDATE items SET pwd=? WHERE id=?;";
                var insert = [items.description, id];
                statements = mysql.format(statements, insert);
            }

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

    // const deleteUser = (id) => {  // delete user with id
    //     var statements = "DELETE FROM items WHERE id=?;";
    //     var insert = [id];
    //     statements = mysql.format(statements, insert);

    //     var con = mysql.createConnection(config);

    //     con.connect(function (err) {
    //         if (err) {
    //             res.status(200).json({ err: err });
    //         };
    //         con.query(statements, function (err, result) {
    //             if (err) { res.status(200).json({ err: err }); };
    //             res.status(200).json({ result: result, req: req.query })
    //         });
    //     });

    // }

    if (req.method === 'POST') {
        errorHandler("Method not available");
    } else if (req.method === 'GET') {
        getUser(id);
    } else if (req.method === 'PUT') {
        modifyUser(id);
    } else if (req.method === 'DELETE') {
        // deleteUser(id);
        errorHandler("Method not available");
    }
}