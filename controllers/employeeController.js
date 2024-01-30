const EmployeeService = require("../services/employeeService");

const update = async (req, res) => {
    try{
        const user = await EmployeeService.update(req.body);
        return res.status(200).json({
            message: "Successfully updated employee.",
            success: true,
            data: user
        })
    }catch(err){
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            data: {}
        })
    }
}

module.exports = {
    update
};