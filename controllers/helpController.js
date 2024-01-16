const helpDetails = (req, res) => {
    res.status(200).send({
        success: true,
        message: "Successfully hitting the help API.",
        data: {
            contact: '+91 XXXXXXXXXXX'
        }
    });
};

module.exports = {
    helpDetails
}
