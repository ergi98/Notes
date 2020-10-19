let users

class UsersDAO {

  ObjectID = require('mongodb').ObjectID
  
  static async injectDB(conn) {
    if (users) {
      return
    }
    try {
      users = await conn.db(process.env.MONOG_NS).collection('users')
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
            'notes.$[note].updated_at': note.updated_at, 
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