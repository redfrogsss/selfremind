import config from '../../../config/mysql';
var mysql = require('mysql');


export default function handler(req, res) {
    const { id } = req.query;
    
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

    const getItem = (id) => { // get info with item id
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
    }

    const modifyItem = (id) => {  // modify items with id
        const items = {
            name: req.body.name,
            description: req.body.description,
            datetime: req.body.datetime,
            reminder: req.body.reminder,
            repeats: req.body.repeats,
            folder: req.body.folder,
            finished: req.body.finished,
        }
    
        var statements = "";
        if (items.name !== undefined) {
            statements += "UPDATE items SET name=? WHERE id=?;";
            var insert = [items.name, id];
            statements = mysql.format(statements, insert);
        }
        if (items.description !== undefined) {
            statements += "UPDATE items SET description=? WHERE id=?;";
            var insert = [items.description, id];
            statements = mysql.format(statements, insert);
        }
        if (items.datetime !== undefined) {
            statements += "UPDATE items SET datetime=? WHERE id=?;";
            var insert = [items.datetime, id];
            statements = mysql.format(statements, insert);
        }
        if (items.reminder !== undefined) {
            statements += "UPDATE items SET reminder=? WHERE id=?;";
            var insert = [items.reminder, id];
            statements = mysql.format(statements, insert);
        }
        if (items.repeats !== undefined) {
            statements += "UPDATE items SET repeats=? WHERE id=?;";
            var insert = [items.repeats, id];
            statements = mysql.format(statements, insert);
        }
        if (items.folder !== undefined) {
            statements += "UPDATE items SET folder=? WHERE id=?;";
            var insert = [items.folder, id];
            statements = mysql.format(statements, insert);
        }
        if (items.finished !== undefined) {
            statements += "UPDATE items SET finished=? WHERE id=?;";
            var insert = [items.finished, id];
            statements = mysql.format(statements, insert);
        }
    
        var con = mysql.createConnection(config);
    
        con.connect(function (err) {
            if (err) {
                res.status(200).json({ err: err, statements: statements });
            };
            con.query(statements, function (err, result) {
                if (err) { res.status(200).json({ err: err , req: req.body, statements: statements}); };
                res.status(200).json({ result: result, req: req.body , statements: statements})
            });
        });
    }

    const deleteItem = (id) => {  // delete items with id
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

    if (req.method === 'POST') {    
        // createItem();
    } else if (req.method === 'GET') {  
        getItem(id);
    } else if (req.method === 'PUT') {  
        modifyItem(id);
    } else if (req.method === 'DELETE') {   
        deleteItem(id);
    }
}