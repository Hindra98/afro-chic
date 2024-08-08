const express = require('express');
// const bcrypt = require('bcrypt')
const md5 = require('md5')
const controler = require('../controler/controler.authentification')

const session = require('express-session')
// const cookieParser = require('cookie-parser')

const router = express.Router();


const SALT_PASS_ROUND = 1

var expiryDate = new Date(Date.now() + 60 * 60 * 100);

router.post('/connexion', async (request, response) => {
    try {
        response.status(200).json({ 'eee': 'Connexion etablit avec succes!' })
    }
    catch (error) {
        response.status(400).json({ 'error': `${error}` })
    }

})

router.get('/register', async (req, res) => {
    // const password = md5(req.body.password)
    const email = req.params.email
    // const token_k = md5(54 + '' + email + '' + 10)

    // try {
    //     // results = await controler.loginControler(email, password, token_k)
    //     if (results.success = true) {
    //         res.status(200).send(results)
    //     }
    //     else{
    //         res.status(404).send(results)
    //     }
    // } catch (error) {
    //     res.status(500).send(error)
    // }
})
router.post('/register', async (req, res) => {
    const user = req.body.user_id
    // const password = md5(req.body.password)
    const email = req.body.email
    // const token_k = md5([email, password, email].join())

    console.log(email)
    // try {
    //     results = await controler.pushCredentials(user, email, password, token_k)
    //     if (results.success = true) {
    //         res.status(200).send(results)
    //     }
    //     else{
    //         res.status(404).send(results)
    //     }
    // } catch (error) {
    //     res.status(500).send(error)
    // }
})



router.post('/connexions', async (request, response) => {
    try {
        response.status(200).json({ 'eee': 'Connexion etablit avec succes!' })
    }
    catch (error) {
        response.status(400).json({ 'error': `${error}` })
    }

})

router.get('/connexions', async (req, res) => {
    // const email = req.body.email
    // const passw = md5(req.body.passw)
    const email = "john.doe@example.com"
    // const email = req.body.email
    console.log(email)
    const passw = md5('123456789')
    const token_k = md5(54 + '' + Math.random() + '' + 10)

    try {
        results = await controler.loginControler(email, passw)
        if (results.success = true) {
            res.status(200).send(results)
        }
        else{
            res.status(404).send(results)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports =  router ;
