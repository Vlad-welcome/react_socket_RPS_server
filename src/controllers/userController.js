import userService from "../services/userService.js";
import { Events } from "../socketEvents.js";

export const userController = (io, socket) => {
  socket.on(Events.JOIN, async (username, callback) => {
    console.log("Server Events.JOIN");
    const name = username?.trim().split(" ")[0];
    if (!name) {
      callback({ success: false });
      return;
    }

    const user = await userService.getByName(name);
    if (user) {
      if (username.split(" ")[1] === "-") {
        await userService.delete(user.id);
        callback({ success: false });
        return;
      }

      callback({ success: false });
      return;
    }

    await userService.add(username.trim(), socket.id);
    callback({ success: true });
  });

  socket.on("disconnect", async () => {
    console.log("Server disconnect");
    const user = await userService.getBySocket(socket.id);
    if (user) {
      await userService.delete(user?.id);
    }
  });
};
