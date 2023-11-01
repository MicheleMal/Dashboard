import { Employee } from "../models/employee.js";

export const getAllEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();

        return res.status(200).json({
            message: "All employees",
            data: employees,
            check: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};

export const getInformationUser = async (req, res) => {
    try {
        const employee = await Employee.findById(req.employee._id);

        if (employee === null) {
            res.status(404).json({
                message: "No employees found",
                data: [],
                check: false,
            });
        } else {
            res.status(200).json({
                message: "Employee",
                data: employee,
                check: true,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};

export const modifyEmployee = async (req, res) => {
    const data = req.body;
    const {id} = req.params

    try {
        const employeeUpdate = await Employee.findOneAndUpdate(
            // { _id: req.employee._id},
            {_id: id},
            data,
            { new: true }
        );

        if (employeeUpdate === null) {
            res.status(404).json({
                message: "No employees found",
                data: [],
                check: false,
            });
        } else {
            res.status(200).json({
                message: "Updated employee information",
                data: employeeUpdate,
                check: true,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};

export const deleteEmployee = async (req, res) => {
    const {id} = req.params
    try {
        const removeEmployee = await Employee.findOneAndDelete({
            // _id: req.employee._id,
            _id: id
        });

        res.status(200).json({
            message: "Employee successfully eliminated",
            data: removeEmployee,
            check: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};
