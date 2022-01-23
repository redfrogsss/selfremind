export default function handler(req, res) {
    const { id } = req.query
    res.status(200).json({id: id});
}