import { User } from "../models/userModel.js";

class userService {
  async add(username, socketId) {
    const user = await User.create({ username: username, socketId: socketId });
    return user;
  }

  async delete(id) {
    if (id) {
      const count = await User.destroy({
        where: { id: id },
      });
      return count > 0;
    }
  }

  async getBySocket(socketId) {
    if (socketId) {
      const user = await User.findOne({
        where: { socketId: socketId },
      });
      return user;
    }
  }

  async getById(id) {
    if (id) {
      const user = await User.findOne({
        where: { id: id },
      });
      return user;
    }
  }

  async getByName(name) {
    if (name) {
      const user = await User.findOne({
        where: { username: name },
      });
      return user;
    }
  }
}

export default new userService();
