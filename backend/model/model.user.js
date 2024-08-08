
user = new Object()

// init empty user
initUser = () => {
    user['nom'] =  ''
    user['phone'] = ''
    user['passw'] = ''
    user['type'] = ''
    user['mail'] = ''
    return user
}

// create new user object
newUser  = (name, phone, email, type, pass) => {
    user['nom'] =  name
    user['phone'] = phone
    user['passw'] = pass
    user['type'] = type
    user['mail'] = email
    return user
}

// user's setter
setName = (name) => { user['nom'] = name }
setPassw = (pass) => { user['passw'] = pass }
setPhone = (phone) => { user['phone'] = phone }
setType = (type) => { user['passw'] = type }
setMail = (email) => { user['mail'] = email }

// user's getter
getUser = () => {return user}
getName = () => { return user['nom']}
getPassw = () => { return user['passw']}
getPhone = () => { return user['phone']}
getType = () => { return user['passw']}
getMail = () => { return user['mail']}

// newUser('Alain', '6569', 'ssssx', 'pieton')
// console.log(getName())

module.exports = {
    initUser,
    newUser,

    setName,
    setPassw,
    setPhone,
    setType,
    setMail,

    getUser,
    getName,
    getPassw,
    getPhone,
    getType,
    getMail,
    
}