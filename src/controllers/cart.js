const { cart, item } = require('../../models')
const { countTotal } = require('../utils')

exports.getItems = async (req, res) => {
    try {
        let items = await cart.findAll({
            include: {
                model: item,
                as: 'item',
                attributes: ['name','price']
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                user_id: req.userId
            },
        })
        items = items.map(item => item.dataValues)

        const total = countTotal(items)

        res.status(200).send({
            data: {
                items,
                total
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
        })
    }
}


exports.addItem = async (req, res) => {
    try {
        const item = await cart.findOne({
            where: {
                user_id: req.userId,
                item_id: req.body.item_id
            }
        })

        if (item) {
            await cart.increment({
                qty: 1
            }, {
                where: {
                    user_id: req.userId,
                    item_id: req.body.item_id
                }
            })
        } else {
            await cart.create({
                user_id: req.userId,
                item_id: req.body.item_id,
                qty: 1
            })
        }

        res.status(200).send({
            message: 'Item add to cart',
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.plusItem = async (req, res) => {
    try {
        await cart.increment({
            qty: 1
        }, {
            where: {
                user_id: req.userId,
                item_id: req.body.item_id
            }
        })

        res.status(200).send({
            message: 'Plus item to cart',
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.minusItem = async (req, res) => {
    try {
        const item = await cart.findOne({
            where: {
                user_id: req.userId,
                item_id: req.body.item_id
            }
        })

        if (item.qty === 1) {
            await cart.destroy({
                where: {
                    user_id: req.userId,
                    item_id: req.body.item_id
                }
            })
        } else {
            await cart.increment({
                qty: -1
            }, {
                where: {
                    user_id: req.userId,
                    item_id: req.body.item_id
                }
            })
        }

        res.status(200).send({
            message: 'Minus item to cart',
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}