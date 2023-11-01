import { Employee } from "../models/employee.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const { name, surname, email, password, salary, dateBirth } = req.body;
    const assumptionDate = new Date();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
        name: name,
        surname: surname,
        email: email,
        password: passwordHash,
        salary: salary,
        assumptionDate: assumptionDate,
        dateBirth: dateBirth,
    });

    try {
        await newEmployee.save();
        res.status(201).json({
            message: "New employee added",
            data: newEmployee,
            check: true,
        });
    } catch (error) {
        if (error && error.code === 11000) {
            res.status(409).json({
                message: "Email already entered",
                data: [],
                check: false,
            });
        } else {
            res.status(500).json({
                message: error.message,
                data: [],
                check: false,
            });
        }
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const employee = await Employee.findOne({
            email: email,
        });

        if (employee === null) {
            res.status(404).json({
                message: "Wrong email or password",
                data: [],
                check: false,
            });
        } else {
            if (await bcrypt.compare(password, employee.password)) {
                const token = jwt.sign(
                    { _id: employee._id },
                    process.env.JWT_SECRET,
                    {
                        algorithm: "HS256",
                    }
                );
                res.status(200).json({
                    message: "Employee",
                    token: token,
                    check: true,
                });
            } else {
                res.status(404).json({
                    message: "Wrong email or password",
                    data: [],
                    check: false,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};
