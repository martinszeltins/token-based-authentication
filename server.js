const fs = require('fs')
const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const events = require('./db/events.json')

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
app.get('/dashboard', (request, response) => {
    response.json({
        events: events
    })
})

/**
 * Register route
 */
app.post('/register', (request, response) => {
    if (request.body) {
        const user = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        }

        const data = JSON.stringify(user, null, 2)
        var dbUserEmail = require('./db/user.json').email

        if (dbUserEmail === request.body.email) {
            response.sendStatus(400)
        } else {
            fs.writeFile('./db/user.json', data, err => {
                if (err) {
                    console.log(err + data)
                } else {
                    const token = jwt.sign({ user }, 'the_secret_key')

                    response.json({
                        token,
                        email: user.email,
                        name: user.name
                    })
                }
            })
        }
    } else {
        response.sendStatus(400)
    }
})

/**
 * Login route
 */
app.post('/login', (request, response) => {
    const userDB = fs.readFileSync('./db/user.json')
    const userInfo = JSON.parse(userDB)

    if (request.body && request.body.email === userInfo.email && request.body.password === userInfo.password) {
        const token = jwt.sign({ userInfo }, 'the_secret_key')

        response.json({
            token,
            email: userInfo.email,
            name: userInfo.name
        })
    } else {
        response.sendStatus(400)
    }
})

/**
 * Verify token
 */
function verifyToken(request, response, next)
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
