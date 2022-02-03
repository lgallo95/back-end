const db = require('../data/db-config')

module.exports = {
  find,
  findById, 
  add,
  edit, 
  del
}

function find() {
  return db("items as i")
  .join('users as u','u.user_id', 'i.user_id' )
  .select('i.*', 'u.user_id')
}

function findById(id) {
  return db('items as i')
    .where("i.item_id", id)
}

async function add(newItem) {
  const [added] = await db('items').insert(newItem, ["item_name"]);
  return added;
}

async function edit(id, changes) {
  await db('items').where("item_id", id).update(changes)
  return findById(id)
}

function del(id) {
  return db('items').where("item_id", id).del()
} 