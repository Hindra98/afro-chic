const product_factory = require('../model/dao/dao.product')
const user_model = require('../model/model.product')

// Create new user
const findProduct = async () => {
    try {
        const results = await product_factory.findProduct(); 
        if(results){
            console.log(results)
            // return {'data': JSON.stringify(results), 'success': true, 'detail': ''};
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': ''};
        }
        return {'data': null, 'success': false, 'detail': ''};
    } catch (error) {
        throw {'data': null, 'success': false, 'detail': error};
    }
}

const findOneProduct = async (id) => {
    try {
        const results = await product_factory.findOneProduct(id); 
        if(results !== 0){
            return {'data': JSON.parse(JSON.stringify(results))[0], 'success': true, 'detail': ''};
        }
        return {'data': [], 'success': false, 'detail': results};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}

const createProduct = async (product) => {
    try {
        const results = await product_factory.createProduct(product); 
        if(results){
            console.log(`'data': ${JSON.parse(JSON.stringify(product))}`)
            return {'data': JSON.parse(JSON.stringify(product)), 'success': true, 'detail': 'New product created'};
        }
        return {'data': [], 'success': false, 'detail': 'Error when trying to create a new product'};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}

const updateProduct = async (id, product) => {
    try {
        const results = await product_factory.updateProduct(id, product); 
        if(results){
            return {'data': JSON.parse(JSON.stringify(product)), 'success': true, 'detail': 'New product created'};
        }
        return {'data': [], 'success': false, 'detail': 'Error when trying to create a new product'};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}


const deleteProduct = async (id) => {
    try {
        const results = await product_factory.deleteProduct(id); 
        if(results){
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': 'New product created'};
        }
        return {'data': [], 'success': false, 'detail': 'Error when trying to create a new product'};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}


const findProductCategory = async () => {
    try {
        const results = await product_factory.findProductCategory(); 
        if(results){
            console.log(results)
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': ''};
        }
        return {'data': null, 'success': false, 'detail': ''};
    } catch (error) {
        throw {'data': null, 'success': false, 'detail': error};
    }
}

const createProductCategory = async (categorie) => {
    try {
        const results = await product_factory.createProductCategory(categorie); 
        if(results){
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': 'New product created'};
        }
        return {'data': [], 'success': false, 'detail': 'Error when trying to create a new product'};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}

const updateProductCategory = async (id, categorie) => {
    try {
        const results = await product_factory.updateProductCategory(id, categorie); 
        if(results){
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': 'New product created'};
        }
        return {'data': [], 'success': false, 'detail': 'Error when trying to create a new product'};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}


const deleteProductCategory = async (id) => {
    try {
        const results = await product_factory.deleteProductCategory(id); 
        if(results){
            return {'data': JSON.parse(JSON.stringify(results)), 'success': true, 'detail': 'New product created'};
        }
        return {'data': [], 'success': false, 'detail': 'Error when trying to create a new product'};
    } catch (error) {
        throw {'data': [], 'success': false, 'detail': error};
    }
}

module.exports = {
    findProduct,
    findOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,

    findProductCategory,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory
}