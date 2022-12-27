const bcrypt = require('bcrypt')
const Joi = require('joi')
const { user, profile } = require('../../models')

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await user.findAll({
            include: {
                model: profile,
                as: 'profile',
                attributes: ['name', 'phone_number'],
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
            where: {
                role: 'user'
            }
        })

        res.status(200).send({
            data: {
                accounts
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
        })
    }
}

exports.getAccountById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await user.findByPk(id, {
            include: {
                model: profile,
                as: 'profile',
                attributes: ['name', 'phone_number', 'address'],
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })

        res.status(200).send({
            data: {
                account: data
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
        })
    }
}

exports.createAccount = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(4).required(),
        role: Joi.string().required(),
        phone_number: Joi.string().min(10).required(),
        address: Joi.string().min(7).required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(401).send({
            message: error.details[0].message,
        })
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const userData = await user.create({
            username: req.body.username,
            password: hashPassword,
            role: req.body.role,
        })

        await profile.create({
            ...req.body,
            user_id: userData.id,
        })

        res.status(200).send({
            message: 'Account created successfully',
        })

    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
        })
    }
}

exports.updateAccount = async (req, res) => {
    try {
        const { id } = req.params

        const userData = await user.findByPk(id)

        if (!userData) {
            return res.status(403).send({
                message: 'Not found'
            })
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)

            const userData = await user.update({
                username: req.body.username,
                password: hashPassword,
                role: req.body.role,
            }, {
                where: {
                    id
                }
            })
        } else {
            const userData = await user.update({
                username: req.body.username,
                role: req.body.role,
            }, {
                where: {
                    id
                }
            })
        }


        await profile.update({
            ...req.body,
        }, {
            where: {
                user_id: userData.id,
            }
        })

        res.status(200).send({
            message: 'Account updated successfully'
        })

    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params

        const data = await user.findByPk(id)

        if (!data) {
            return res.status(403).send({
                message: 'Not found'
            })
        }

        await user.destroy({
            where: {
                id
            }
        })

        res.status(200).send({
            message: 'Account deleted successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
        })
    }
}