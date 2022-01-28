
export default function handler(req, res) {
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

    const getAllItems = () => {
        var statements = "SELECT id FROM items WHERE userID=?;";
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

    // Error Handler 
    const errorHandler = (err = undefined) => {
        res.status(401).json({ err: err });     // goes to clients side .catch(err) methods 
    }

    if (req.method === 'POST') {
        createItem();
    } else if (req.method === 'GET') {
        getAllItems();
    } else if (req.method === 'PUT') {
        errorHandler("PUT is not allowed.");
    } else if (req.method === 'DELETE') {
        errorHandler("PUT is not allowed.");
    }
}