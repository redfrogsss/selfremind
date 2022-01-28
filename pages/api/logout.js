import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    function handler(req, res, session) {
        // Error Handler 
        const errorHandler = (err = null) => {
            res.status(401).json({ err: err });     // goes to clients side .catch(err) methods 
        }

        // Success Handler
        const successHandler = async () => {
            res.status(200).json({ ok: true });     // goes to clients side .then(res) methods 
        }

        if (!req.method === 'POST') { errorHandler("POST method only") } else {  // POST only
            if (!req.body.userID) { errorHandler("No value passed") } else {
                req.session.destroy();
                successHandler();
            }
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