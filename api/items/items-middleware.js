const Item = require('./items-model');

function logger(req,res, next){
    console.log(`logger middleware`)
    next()
}

async function validateItemId (req, res, next) {
    try{
        const item = await Item.getById(req.params.id)
        if (!item) {
            res.status(404).json({
                message: 'no such item'
            })
        } else {
            req.item = item
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'Problem fetching item.'
        })
    }
}

function validateItem (req, res, next) {
    console.log(req)
}

module.exports = {
    checkItemId,
    validateItem,
}