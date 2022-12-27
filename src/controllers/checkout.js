const cloudinary = require('cloudinary')
const DatauriParser = require('datauri/parser')
const path = require('path')
const moment = require('moment')
const { order, order_item, user, cart, item, profile } = require('../../models')
const { countTotal } = require('../utils')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const parser = new DatauriParser()

exports.checkout = async (req, res) => {
    try {
        let items = await cart.findAll({
            include: {
                model: item,
                as: 'item',
                attributes: ['price']
            },
            where: {
                user_id: req.userId
            }
        })
        items = items.map(item => item.dataValues)

        const total = countTotal(items)

        const userOrder = await order.create({
            total,
            user_id: req.userId,
        })

        items = items.map(item => ({
            ...item,
            order_id: userOrder.id,
        }))

        await order_item.bulkCreate(items)

        await cart.destroy({
            where: {
                user_id: req.userId
            }
        })

        res.status(200).send({
            data: {
                orderId: userOrder.id
            },
            message: 'User ordered successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            msg: error.message
        })
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const role = req.userRole

        let orders;

        if (role === 'user') {
            orders = await order.findAll({
                attributes: {
                    exclude: ['updatedAt']
                },
                where: {
                    user_id: req.userId,
                },
            })
        } else {
            orders = await order.findAll({
                include: {
                    model: user,
                    as: 'user',
                    include: {
                        model: profile,
                        as: 'profile',
                        attributes: ['name']
                    },
                },
                attributes: {
                    exclude: ['updatedAt']
                },
            })
        }

        orders = orders.map(order => ({
            ...order.dataValues,
            date: moment(order.dataValues.createdAt).format("DD MMM YYYY HH:mm")
        }))


        res.status(200).send({
            data: {
                orders
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            msg: error.message
        })
    }
}

exports.getOrderDetail = async (req, res) => {
    try {
        const { id } = req.params

        const orderData = await order.findByPk(id, {
            attributes: {
                exclude: ['user_id', 'createdAt', 'updatedAt']
            },
        })

        if (!orderData) {
            return res.status(403).send({
                message: 'Not found'
            })
        }

        const orderItem = await order_item.findAll({
            include: {
                model: item,
                as: 'item',
                attributes: ['name', 'price']
            },
            where: {
                order_id: orderData.id
            },
            attributes: ['id','qty'],
        })

        res.status(200).send({
            data: {
                orderData,
                orderItem
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            msg: error.message
        })
    }
}

exports.payOrder = async (req, res) => {
    try {
        const { id } = req.params

        const file = parser.format(path.extname(req.files.transfer_proof.name).toString(), req.files.transfer_proof.data).content
        console.log('aaa');
        const result = await cloudinary.uploader.upload(file, {
            folder: 'uploads',
            use_filename: true,
            unique_filename: false
        })
        console.log('bbb');


        await order.update({
            transfer_proof: result.secure_url,
            status: 'Sudah Dibayar',
        }, {
            where: {
                id
            }
        })

        res.status(200).send({
            message: 'Order pay successfully'
        })

    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.sendOrder = async (req, res) => {
    try {
        const { id } = req.params

        await order.update({
            status: 'Dikirim',
        }, {
            where: {
                id
            }
        })

        res.status(200).send({
            message: 'Order send successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.receiveOrder = async (req, res) => {
    try {
        const { id } = req.params

        await order.update({
            status: 'Diterima',
        }, {
            where: {
                id
            }
        })

        res.status(200).send({
            message: 'Order received successfully'
        })

    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}