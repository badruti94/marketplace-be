const { profile } = require('../../models')
exports.getProfile = async (req, res) => {
    try {

        const data = await profile.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                user_id: req.userId
            }
        })

        if (!data) {
            return res.status(403).send({
                message: 'Not found'
            })
        }

        res.status(200).send({
            data: {
                profile: data
            }
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        await profile.update(req.body, {
            where: {
                user_id: req.userId
            }
        })

        res.status(200).send({
            message: 'Profile updated successfully'
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}