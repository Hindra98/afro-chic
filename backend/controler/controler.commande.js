const commande_factory = require('../model/dao/dao.commande')
const commande_model = require('../model/model.commande')

// const findAllCommande = async () => {
//     try {
//         const results = await commande_factory.findAllCommande(); 
//         if(results){
//             return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': ''};
//         }
//         return {'data': null, 'success': false, 'detail': ''};
//     } catch (error) {
//         throw {'data': null, 'success': false, 'detail': error};
//     }
// }

const findCommande = async (id) => {
    try {
        const results = await commande_factory.findCommande(id); 
        if(results !== 0){
            return {'data': JSON.parse(JSON.stringify(results))[0], 'success': true, 'detail': ''};
        }
        return {'data': [], 'success': false, 'detail': results};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}

const createCommande = async (commande_item) => {
    try {
        const results = await commande_factory.createCommande(commande_item); 
        if(results){
            console.log(`'data': ${JSON.parse(JSON.stringify(commande_item))}`)
            return {'data': JSON.parse(JSON.stringify(commande_item)), 'success': true, 'detail': 'New product created'};
        }
        return {'data': [], 'success': false, 'detail': 'Error when trying to create a new product'};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}

const updateCommande = async (id, commande_item) => {
    try {
        const results = await commande_factory.updateCommande(id, commande_item); 
        if(results){
            return {'data': JSON.parse(JSON.stringify(commande_item)), 'success': true, 'detail': 'New product created'};
        }
        return {'data': [], 'success': false, 'detail': 'Error when trying to create a new product'};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}


const deleteCommande = async (id) => {
    try {
        const results = await commande_factory.deleteCommande(id); 
        if(results){
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': 'New product created'};
        }
        return {'data': [], 'success': false, 'detail': 'Error when trying to create a new product'};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}


const showDetailCommande = async (id_) => {
    try {
        const results = await commande_factory.showDetailCommande(id_); 
        if(results){
            console.log(results)
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': ''};
        }
        return {'data': null, 'success': false, 'detail': ''};
    } catch (error) {
        throw {'data': null, 'success': false, 'detail': error};
    }
}

const createDetailCommande = async (categorie) => {
    try {
        const results = await commande_factory.createDetailCommande(categorie); 
        if(results){
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': 'New product created'};
        }
        return {'data': [], 'success': false, 'detail': 'Error when trying to create a new product'};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}


module.exports = {
    findCommande,
    createCommande,
    updateCommande,
    deleteCommande,
    showDetailCommande,
    createDetailCommande
}