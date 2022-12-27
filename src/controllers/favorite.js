const { favorite, item } = require('../../models')

exports.addToFavorite = async (req, res) => {
    try {
        await favorite.create({
            ...req.body,
            user_id: req.userId
        })

        res.status(200).send({
            message: 'Item added to favorite successfully',
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
        })
    }
}

exports.getItemsFromFavorite = async (req, res) => {
    try {
        const favorites = await favorite.findAll({
            include: {
                model: item,
                as: 'item',
                attributes: {
                    exclude: ['description','stock','createdAt', 'updatedAt']
                }
            },
            where: {
                user_id: req.userId
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })

        res.status(200).send({
            data: {
                favorites
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.isFavorite = async (req, res) => {
    try {
        const { id } = req.params

        const item = await favorite.findOne({
            where: {
                user_id: req.userId,
                item_id: id,
            }
        })

        const isFavorite = item ? true : false

        res.status(200).send({
            data: {
                isFavorite
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.deleteItemFromFavorite = async (req, res) => {
    try {
        const { id } = req.params

        await favorite.destroy({
            where: {
                user_id: req.userId,
                item_id: id,
            }
        })

        res.status(200).send({
            message: 'Item deleted from favorite successfully',
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}