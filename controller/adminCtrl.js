const userModel = require('../models/userModels')
const hotelDetailModel = require('../models/hotelDetailModel')

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

const createHotelController = async (req, res) => {
    try {
        await hotelDetailModel.create({
            type: req.body.type,
            price: req.body.price,
            title1: req.body.title1,
            title2: req.body.title2,
            title3: req.body.title3,
            title4: req.body.title4,
            title5: req.body.title5,
            image: req.file.filename,
        });
        res.status(200).send({
            success: true,
            message: 'create detail success',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'create details error',
            error,
        });
    }
};

const getHotelController = async (req, res) => {
    try {
        const detail = await hotelDetailModel.find({});
        res.status(200).send({
            success: true,
            message: 'details data list',
            data: detail,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while fetching details',
            error,
        });
    }
};

const getUserCountController = async (req,res) => {
    try {
        const count_data = [];
        const userCount = await userModel.countDocuments({isAdmin: false})

        count_data.push({
            user:userCount,
        })

        res.status(200).send({
            success: true,
            message: 'users total list',
            data: count_data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while fetching details',
            error,
        });
    }
}


module.exports = {
    getAllUsersController, 
    getAllEmployeeController,
    createHotelController,
    getHotelController,
    getUserCountController,
}