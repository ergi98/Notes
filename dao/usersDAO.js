let users
let sessions

class UsersDAO {

  ObjectID = require('mongodb').ObjectID
  
  static async injectDB(conn) {
    if (users && sessions) {
      return
    }
    try {
      users = await conn.db(process.env.MONOG_NS).collection('users')
      sessions = await conn.db(process.env.MONOG_NS).collection('sessions')
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async registerUser(user) {
    try {
      await users.insertOne(user, { w: 'majority' })
      return { success: true }
    } catch (e) {
      if (String(e).startsWith('MongoError: E11000 duplicate key error')) {
        return { error: 'A user with the given email already exists.' }
      }
      console.error(`Error occurred while adding new user, ${e}.`)
      return { error: e }
    }
  }

  static async getUserPassword(username) {
    let pipeline = [
      {
        $match: {
          username
        }
      },
      {
        $project: {
          _id: 0,
          password: 1
        }
      }
    ]

    return await users.aggregate(pipeline).toArray()
  }

  static async getUser(username) {
    return await users.findOne({ username })
  }

  static async getUsedNames() {
    try {
      let pipeline = [
        {
          $project: {
            _id: 0,
            username: 1
          }
        }
      ]

      return await users.aggregate(pipeline).toArray()
    }
    catch(e) {
      console.log(`Error occurred while getting used usernames, ${e}`)
      return { error: e }
    }
  }

  static async getPassword(username) {
    let pipeline = [
      {
        $match: {
          username
        }
      },
      {
        $project: {
          _id: 0,
          password: 1
        }
      }
    ]

    return await users.aggregate(pipeline).toArray()
  }

  static async loginUser(username, jwt) {
    try {
      await sessions.updateOne(
        { username },
        { $set: { jwt } },
        { upsert: true }
      )
      return { success: true }
    }
    catch (e) {
      console.log(`Error occurred while logging in user, ${e}`)
      return { success: false, error: e }
    }
  }

  static async getUserSession(username) {
    try {
      return sessions.findOne({ username })
    } catch (e) {
      console.error(`Error occurred while retrieving user session, ${e}`)
      return { success: false, error: e }
    }
  }

  static async logoutUser(username) {
    try {
      await sessions.deleteOne({ username })
      return { success: true }
    }
    catch (e) {
      console.log(`Error occurred while logging out user, ${e}`)
      return { success: false, error: e }
    }
  }

  static async updatePassword(username, password) {
    try {
      await users.updateOne(
        { username },
        { $set: { password } }
      )
      return { success: true}
    }
    catch (e) {
      console.log(`Error occured while updating password, ${e}`)
      return { success: false, error: e }
    }

  }

  static async deleteUser(username) {
    try {
      await users.deleteOne({ username })
      await sessions.deleteOne({ username })
      if (!(await this.getUser(username)) && !(await this.getUserSession(username))) {
        return { success: true }
      } else {
        return { success: false, error: `Deletion unsuccessful` }
      }
    } catch (e) {
      console.error(`Error occurred while deleting user, ${e}`)
      return { success: false, error: e }
    }
  }

  static async getUserNotes(username) {
    try {
      let pipeline = [
        {
          $match: {
            username: username
          }
        },
        {
          $project: {
            _id: 0,
            notes: 1
          }
        }
      ]

      let res = await users.aggregate(pipeline)

      return await res.toArray()
    }
    catch (e) {
      console.error(`Error occurred while popoulating notes, ${e}`)
      return { success: false, error: e }
    }
  }

  static async addNote(username, note) {
    try {
      await users.updateOne({ username }, { $push: { notes: note } },{ w: 'majority' })
      return { success: true }
    }
    catch (e) {
      console.error(`Error occurred while adding note, ${e}`)
      return { success: false, error: e }
    }
  }

  static async updateNote(username, note) {
    try {
      await users.updateOne(
        { username }, 
        { 
          $set: { 
            'notes.$[note].title': note.title,
            'notes.$[note].text': note.text,
            'notes.$[note].last_edited': note.last_edited, 
          } 
        }, 
        { 
          arrayFilters: [{ 'note.id': note.id }],
          w: 'majority'
        }
      )
      return { success: true }
    }
    catch (e) {
      console.error(`Error occurred while updating note, ${e}`)
      return { success: false, error: e }
    }
  }

  static async deleteNote(username, id) {
    try {
      await users.updateOne({ username }, { $pull: { notes: { id } } }, { w: 'majority' })
      return { success: true }
    }
    catch (e) {
      console.error(`Error occurred while deleting note, ${e}`)
      return { success: false, error: e }
    }
  }
}
  
module.exports = UsersDAO;   