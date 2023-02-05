exports.board = async (req, res) => {
    try {
        // const result = await user.create(req.body);
        // res.status(200).json({
        //     message: "User Register Successfully",
        // })
    } catch (error) {
        res.status(400).json({
            message: "Error " + error
        })
    }
}