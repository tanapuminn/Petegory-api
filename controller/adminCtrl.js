const userModel = require('../models/userModels')

const getAllUsersController = async (req,res) => {
    try {
        const users = await userModel.find({isAdmin: false, isEmployee: false})
        res.status(200).send({
            success: true,
            message: 'users data list',
            data: users,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while fetching users',
            error
        })
    }
}

const getAllEmployeeController = async (req,res) => {
    try {
        const employees = await userModel.find({isAdmin: false, isEmployee: true})
        res.status(200).send({
            success: true,
            message: 'employees data list',
            data: employees,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while fetching users',
            error
        })
    }
}

module.exports = {getAllUsersController, getAllEmployeeController}