/*const db = require('../data/db-configrs')

function find() {
    return db(`users`)
    .select('user_id', 'username')
}
function findBy(filter){
    return db('users')
    .select('user_id','username','password')
    .where(filter)
}
function findById(id) {
    return db('users')
    .select('user_id', 'username')
    .where({ id })
    .first();
  }

async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
  }

  module.exports = {
    find,
    findBy,
    findById,
    add
  }*/