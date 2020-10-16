var fs = require('fs')
var cors = require('cors')
var express = require('express')
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var events = require('./db/events.json')

const app = express()

app.use(cors())
app.use(bodyParser.json())


/**
 * Index route
 */
app.get('/', (request, response) => {
    response.json({
        message: 'Welcome to the API.'
    })
})

/**
 * Dashboard route
 */
app.get('/dashboard', verifyToken, (request, response) => {
    jwt.verify(request.token, 'the_secret_key', error => {
        if (error) {
            response.sendStatus(401)
        } else {
            response.json({
                events: events
            })
        }
    })
})

/**
 * Register route
 */
app.post('/register', (request, response) => {
    const user = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    }

    var userData = JSON.stringify(user, null, 2)

    let dbUserEmail = require('./db/user.json').email

    if (dbUserEmail == user.email) {
        response.status(400).json({ error: 'User already exists.' }).end()
    }

    fs.writeFile('db/user.json', userData, error => {
        console.log('Added user to user.json')
    })

    const token = jwt.sign({ user }, 'the_secret_key')

    response.json({
        name: user.name,
        email: user.email,
        token,
    })
})

/**
 * Login route
 */
app.post('/login', (request, response) => {
    var userDB = fs.readFileSync('./db/user.json')

    var userInfo = JSON.parse(userDB)

    if (request.body.email === userInfo.email && request.body.password === userInfo.password) {
        const token = jwt.sign({ userInfo }, 'the_secret_key')

        response.json({
            name: userInfo.name,
            email: userInfo.email,
            token,
        })
    } else {
        response.status(401).json({ error: 'Invalid login.' })
    }
})

/**
 * Verify token
 */
function verifyToken (request, response, next)
{
    const bearerHeader = request.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        request.token = bearerToken
        next()
    } else {
        response.sendStatus(401)
    }
}

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
