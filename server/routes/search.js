const express = require('express')
const router = express.Router()
const db = require('../models')
const { Op } = require('sequelize')

const Video = db.models.Video

router.get('/', async (req, res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } }
                ]
            }
        })
        res.json({ succes: true, videos })
    } catch (err) {
        next(err)
    }
})

module.exports = router