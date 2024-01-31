const EmployeeService = require("../services/employeeService");
const TaxService = require("../services/taxService");

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
};

const calculateTax = async (req, res) => {
    try{
        const employee = await EmployeeService.getEmployee(req.params.id);
        const tax = await TaxService.calculateTax(employee.salary);
        return res.status(200).json({
            message: "Successfully calculated the tax.",
            success: true,
            data: tax
        })
    }catch(err){
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            data: {}
        })
    }
};

module.exports = {
    update, calculateTax
};