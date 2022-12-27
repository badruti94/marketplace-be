const cloudinary = require('cloudinary')
const DatauriParser = require('datauri/parser')
const path = require('path')
const Joi = require('joi')
const { item } = require('../../models')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const parser = new DatauriParser()

exports.getAllItems = async (req, res) => {
    try {
        let items = await item.findAll({
            attributes: {
                exclude: ['description','createdAt', 'updatedAt']
            }
        })

        items = items.map(item => ({
            ...item.dataValues,
            name: item.dataValues.name.substring(0, 20)
        }))

        res.status(200).send({
            data: {
                items
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.getItemById = async (req, res) => {
    try {
        const { id } = req.params

        const data = await item.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        if (!data) {
            return res.status(403).send({
                message: 'Not found'
            })
        }

        res.status(200).send({
            data: {
                item: data
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.createItem = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(401).send({
            message: error.details[0].message,
        })
    }

    if (!req.files) {
        return res.status(401).send({
            message: "\"image\" is required",
        })
    }

    try {
        const file = parser.format(path.extname(req.files.image.name).toString(), req.files.image.data).content
        const result = await cloudinary.uploader.upload(file, {
            folder: 'uploads',
            use_filename: true,
            unique_filename: false
        })
        await item.create({
            ...req.body,
            image: result.secure_url,
        })

        res.status(200).send({
            message: 'Item created successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
        })
    }
}

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params

        const data = await item.findByPk(id)

        if (!data) {
            return res.status(403).send({
                message: 'Not found'
            })
        }

        if (req.files) {
            const file = parser.format(path.extname(req.files.image.name).toString(), req.files.image.data).content
            const result = await cloudinary.uploader.upload(file, {
                folder: 'uploads',
                use_filename: true,
                unique_filename: false
            })

            await item.update({
                ...req.body,
                image: result.secure_url,
            }, {
                where: {
                    id
                }
            })
        } else {
            await item.update(req.body, {
                where: {
                    id
                }
            })
        }

        res.status(200).send({
            message: 'Item updated successfully'
        })

    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            // msg: error.message
        })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params

        const data = await item.findByPk(id)

        if (!data) {
            return res.status(403).send({
                message: 'Not found'
            })
        }

        await item.destroy({
            where: {
                id
            }
        })

        res.status(200).send({
            message: 'Item deleted successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            msg: error.message
        })
    }
}