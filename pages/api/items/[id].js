export default function handler(req, res) {
    const { id } = req.query;

    // Items Object Structure
    const items = {
        id: -1,
        name: "",
        description: "",
        timestamp: new Date(),
        reminder: 0,
        repeat: "",
        folder: "",
        finished: false,
    }

    res.status(200).json({id: id});
}