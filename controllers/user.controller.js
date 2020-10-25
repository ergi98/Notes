const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsersDAO = require('../dao/usersDAO')

const hashPassword = async password => await bcrypt.hash(password, 10)

const verify = async(userJwt) => {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
        if (error) {
            return false
        }
        return true
    })
}

const validateToken = async (bearer) => {
    if(typeof bearer !== undefined ) {
        const jwt = bearer.split(' ')[1]
        return await verify(jwt)
    }
    else {
        return false
    }
}

class User {
    constructor({ username, password, notes } = {}) {
        this.username = username
        this.password = password
        this.notes = notes
    }

    async comparePassword(plainText) {
        return await bcrypt.compare(plainText, this.password)
    }

    toJson() {
        return { username: this.username, notes: this.notes }
    }

    encoded() {
        return jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
                ...this.toJson(),
            },
            process.env.SECRET_KEY,
        )
    }
}

class UsersController {

    static async login(req, res) {
        try {
            const { username, password } = req.body

            let userData = await UsersDAO.getUser(username)

            if (!userData) {
                res.status(401).json({ error: 'No user found with this username.' })
                return
            }

            const user = new User(userData)

            if (!(await user.comparePassword(password))) {
                res.status(401).json({ error: 'Make sure your password is correct.' })
                return
            }

            // On success return the auth_token and all the user info
            res.json({ auth_token: user.encoded(), info: user.toJson() })
            
        } catch (e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async getUser(req, res) {
        try {
            let { username } = req.body

            let result = await UsersDAO.getUset(username)

            res.json({ result })
        }
        catch(e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async getUsedNames(req, res) {
        try {
            let result = await UsersDAO.getUsedNames()
            res.json({ result })
        }
        catch (e) {
            res.status(400).json({ error: e })
            return
        }
    }
    
    static async registerUser(req, res) {
        try {
            let { user } = req.body
                        
            // Encrypting the user password
            user.password = await hashPassword(user.password)

            let result = await UsersDAO.registerUser(user)
            res.json({ result })
        }
        catch (e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async addNote(req, res) {
        try {
            const bearer = req.headers['authorization']
            let { username, note } = req.body

            if(await validateToken(bearer)) {
                    let result = await UsersDAO.addNote(username, note)
                    res.json({ result })
            }
            else {
                res.status(403).json({ error: "Invalid token!"})
            }
        }
        catch(e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async updateNote(req, res) {
        try {
            const bearer = req.headers['authorization']
            let { username, note } = req.body

            if(await validateToken(bearer)) {
                let result = await UsersDAO.updateNote(username, note)
                res.json({ result })
            }
            else {
                res.status(403).json({ error: "Invalid token!"})
            }
        }
        catch(e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async deleteNote(req, res) {
        try {
            const bearer = req.headers['authorization']
            let { username, id } = req.body

            if(await validateToken(bearer)) {
                let result = await UsersDAO.deleteNote(username, id)
                res.json({ result })
            }
            else {
                res.status(403).json({ error: "Invalid token!"})
            }
        }
        catch(e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async changePassword(req, res) {
        try {
            let { username, old_pass, new_pass } = req.body

            // Get current user password
            let user = await UsersDAO.getUserPassword(username)

            if(await bcrypt.compare(old_pass, user[0].password)) {
                // Hashing the password
                let hashed = await hashPassword(new_pass)
                let result = await UsersDAO.updatePassword(username, hashed)
                res.json({ result })
            }
            else {
                res.status(401).json({ error: 'The current password is not correct.' })
                return
            }
        }
        catch(e) {
            console.log(e)
            res.status(400).json({ error: e })
            return
        }
    }
}

module.exports = { UsersController, User }