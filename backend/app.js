
require('dotenv').config()
const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');

const session = require('express-session')
// const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors());

app.use(express.json())

// Connexion du back et du front
app.use(cors({
    origin: ['http://localhost:5000'],
    methods: ["GET", "POST"],
    credentials: true
}))

const home = express.Router();

// app.use(cookieParser())
// app.use(express.urlencoded({extended: true}))

// var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour

// app.use(
//     session({  
//         key: "userId",
//         secret: "subscribe",
//         resave: false,
//         saveUninitialized: false,  
//         cookie:   
//         {
//             maxAge: expiryDate
//         }
//     })
// );
/* Define All Routes app */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/route.authentification')
const sessionRoute = require('./routes/SessionRoute')
const panierRoutes = require('./routes/route.panier')
const productRoutes = require('./routes/route.produit')
const commandeRoutes = require('./routes/route.commande')

app.use(
    session({
        // key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: true,
        cookie:
        {
            maxAge: 36000,
            httpOnly: true
        }
    })
);

app.use('/static', express.static(__dirname + '/public'));
app.use('/', authRoutes)
app.use('/', sessionRoute)
app.use('/', panierRoutes)
app.use('/', productRoutes)
app.use('/', commandeRoutes)

// home.get('/', async (req, res) => {
//     res.send('Welcome to home page')
// })
// home.post('/', async (req, res) => {
// })

// app.get('*', (req, res) => {
//     res.send('Impossible')
// })

app.use(home)
app.use((_, res) => res.redirect("/"))

app.listen(PORT, () => { console.log(`server listening at ${PORT}`) })