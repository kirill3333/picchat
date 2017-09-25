function checkByName(name) {
  return Promise.resolve(true)
}

function checkByPhone(phone) {
  return Promise.resolve(true)
}

function saveUser(user) {
  return Promise.resolve(true)
}

module.exports = {
  checkByName: checkByName,
  checkByPhone: checkByPhone,
  saveUser: saveUser
}