/*
 * incription route contrler
 */

const auth_factory = require('../model/dao/dao.authentification')
const user_model = require('../model/model.user')

// Create new user
const loginControler = async (email, passw) => {
    try {
        const results = await auth_factory.loginDAO(email, passw); 
        if(results){
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': ''};
        }
        return {'data': null, 'success': false, 'detail': ''};
    } catch (error) {
        throw {'data': null, 'success': false, 'detail': error};
    }
}

const pushCredentials = async (user_id, email, password, token) => {
    try {
        const results = await auth_factory.pushCredentials(user_id, email, password, token); 
        if(results){
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': ''};
        }
        return {'data': null, 'success': false, 'detail': ''};
    } catch (error) {
        throw {'data': null, 'success': false, 'detail': error};
    }
}

module.exports = {
    pushCredentials,
    loginControler
}