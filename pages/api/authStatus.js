import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    function handler(req, res) {
        // input userID, check whether session.userID contain input, output boolean

        const successHandler = (result = false) => {
            res.status(200).json({ authStatus: result });
        }

        // Error Handler 
        const errorHandler = (err = undefined) => {
            res.status(401).json({ err: err });     // goes to clients side .catch(err) methods 
        }

        if (!req.method === 'POST') { errorHandler("POST method only") }     // force methods to POST only 
        if (!req.body.userID) { errorHandler("No value passed"); }  // must pass value to this api route

        successHandler(req.session.userID.toString() === req.body.userID.toString());
    }
    ,
    {
        cookieName: "myapp_cookiename",
        password: "mdTR2e7stMmnYm67NHeWEPdbQJppzzZ7",
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    },
);
