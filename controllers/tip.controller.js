const Tip = require('../models/tip');


const tipController = {
    index: async (req, res) => {
        try {
            const tips = await Tip.find({});

            return res.status(200).json({status: 'success', data: tips})
        } catch (e) {
            console.log(e)
            return res.status(500).json({status: 'error', msg: e})
        }
    },
    create: async (req, res) => {
        try {
            const newTip = {
                tags: req.body.tags,
                title: req.body.title,
                content: req.body.content
            }
            await Tip.create(newTip)

            return res.status(200).json({status: 'success', data: newTip})
        }catch (e) {
            console.log(e)
            return res.status(500).json({status: 'error', msg: e})
        }
    },
    update: async (req, res) => {
        try {
            const updatedTip = {
                tags: req.body.tags,
                title: req.body.title,
                content: req.body.content,
                like: req.body.like
            }
            const targetTip = await Tip.findOne({_id: req.params.id})
            await targetTip.updateOne(updatedTip)
            return res.status(200).json({status: 'success', data: updatedTip})
        }catch (e) {
            console.log(e)
            return res.status(500).json({status: 'error', msg: e})
        }
    },
    delete: async (req, res) => {
        try {
            const targetTip = await Tip.findOne({_id: req.params.id})
            await targetTip.deleteOne()
            return res.status(200).json({status: 'success'})
        }catch (e) {
            console.log(e)
            return res.status(500).json({status: 'error', msg: e})
        }
    }

}

module.exports = tipController
