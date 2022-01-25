import config from '../../../config/mysql';
var mysql = require('mysql');

export default function handler(req, res) {
    const { id } = req.query;

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

    if (req.method === 'POST') {    // Create a new item
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
    } else if (req.method === 'GET') {  // get info with item id
        var statements = "SELECT * FROM items WHERE id=?;";
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
    } else if (req.method === 'PUT') {  // modify items with id

    } else if (req.method === 'DELETE') {   // delete items with id
        var statements = "DELETE FROM items WHERE id=?;";
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
}