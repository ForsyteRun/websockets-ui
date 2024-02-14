import * as dotenv from "dotenv";
import { WebSocketServer } from "ws";
import createGame from "./utils/createGame";
import { clients, users } from "./db";
import { httpServer } from "./http_server/index";
import {
  IRequestLogin,
  IRequestLoginData,
  IResponseLogin,
  IResponseLoginData,
} from "./types";
import updateRoom from "./utils/updateRoom";
import loginUser from "./utils/loginUser";

dotenv.config();

const HTTP_PORT = process.env.PORT;

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  clients.push(ws);

  ws.on("message", function message(data: Buffer) {
    const type = JSON.parse(data.toString()).type;

    try {
      switch (type) {
        case "reg":
          const user = loginUser(data);

          ws.send(user);
          break;
        case "create_room":
          updateRoom(data);
          break;
        case "add_user_to_room":
          updateRoom(data);
          createGame(data);

          break;
        default:
          break;
      }
    } catch {
      const error = new Error();
      error.message = "error during request";
      error.name = "error";

      const responseError: IResponseLoginData = {
        error: true,
        errorText: error.message,
        index: 0,
        name: error.name,
      };

      ws.send(JSON.stringify(responseError));
    }
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
