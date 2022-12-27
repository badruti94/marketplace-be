const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { user, profile } = require('../../models')

exports.register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(4).required(),
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
        console.log('1111');

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const userData = await user.create({
            username: req.body.username,
            password: hashPassword,
        })

        const usersData = await user.bulkCreate([
            {
                username: 'tesss1',
                password: hashPassword,
            },
            {
                username: 'tesss2',
                password: hashPassword,
            },
        ])

        const tesssar = ['a','b']
        console.log(tesssar.map((tes, i) => ({...tes, i})))

        await profile.create({
            ...req.body,
            user_id: userData.id,
        })

        res.status(200).send({
            message: 'user registered successfully',
        })

    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            ms: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        const userLogin = await user.findOne({
            include: {
                model: profile,
                as: 'profile',
                attribute: ['name'],
            },
            where: {
                username
            }
        })
        if (!userLogin) {
            return res.status(401).send({
                message: 'Username not found'
            })
        }

        const result = await bcrypt.compare(password, userLogin.password)
        if (!result) {
            return res.status(401).send({
                message: 'wrong password'
            })
        }

        const token = jwt.sign({
            userId: userLogin.id,
            userRole: userLogin.role,
        }, process.env.TOKEN_KEY)

        res.status(200).send({
            message: 'user login successfully',
            data: {
                user: {
                    username: userLogin.username,
                    name: userLogin.profile.name,
                    id: userLogin.id,
                    role: userLogin.role,
                },
                token
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}