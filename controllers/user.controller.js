const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsersDAO = require('../dao/usersDAO')

const hashPassword = async password => await bcrypt.hash(password, 10)

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

    static async decoded(userJwt) {
        return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
            if (error) {
                return { error }
            }
            return new User(res)
        })
    }
}

class UsersController {
    static async login(req, res) {
        try {
            const { username, password } = req.body

            if (!username || typeof username !== 'string') {
                res.status(400).json({ error: 'Bad username format, expected string.' })
                return
            }
            if (!password || typeof password !== 'string') {
                res.status(400).json({ error: 'Bad password format, expected string.' })
                return
            }

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

            const loginResponse = await UsersDAO.loginUser(user.username, user.encoded())

            if (!loginResponse.success) {
                res.status(500).json({ error: loginResponse.error })
                return
            }

            // On success return the auth_token and all the user info
            res.json({ auth_token: user.encoded(), info: user.toJson() })
        } catch (e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async getSession(req, res) {
        try {
            const { username } = req.body

            let session = await UsersDAO.getUserSession(username)

            if(!session) {
                res.status(401).json({ error: 'Session not found for this user.' })
                return
            }
            res.json({ session })
        }
        catch (e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async logout(req, res) {
        try {
            const { username } = req.body

            if(!username || typeof username !== 'string') {
                res.status(400).json({ error: 'Bad username format, expected string.' })
                return
            }
            
            let result = await UsersDAO.logoutUser(username)

            if(!result.success) {
                res.status(401).json({ error: 'Session not found for this user.' })
                return
            }
            
            res.json({ result })
        }
        catch (e) {
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
            console.log(e)
            res.status(400).json({ error: e })
            return
        }
    }

    static async getUserNotes(req, res) {
        try {
            let { username } = req.body

            let result = await UsersDAO.getUserNotes(username)

            res.json({ result })
        }
        catch(e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async addNote(req, res) {
        try {
            let { username, note } = req.body

            let result = await UsersDAO.addNote(username, note)
            res.json({ result })
        }
        catch(e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async updateNote(req, res) {
        try {
            let { username, note } = req.body

            let result = await UsersDAO.updateNote(username, note)

            res.json({ result })
        }
        catch(e) {
            res.status(400).json({ error: e })
            return
        }
    }

    static async deleteNote(req, res) {
        try {
            let { username, id } = req.body

            let result = await UsersDAO.deleteNote(username, id)
            
            res.json({ result })
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