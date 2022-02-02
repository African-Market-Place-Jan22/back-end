const Item = require('./items-model');

function checkItemId (req, res, next) {
    console.log(req)
}

function validateItem (req, res, next) {
    console.log(req)
}

module.exports = {
    checkItemId,
    validateItem,
}