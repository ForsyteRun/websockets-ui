import * as dotenv from "dotenv";
import { WebSocketServer } from "ws";
import createGame from "./createGame";
import { clients, users } from "./db";
import { httpServer } from "./http_server/index";
import {
  IRequestLogin,
  IRequestLoginData,
  IResponseLogin,
  IResponseLoginData,
} from "./types";
import updateRoom from "./updateRoom";

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
          const parseData: IRequestLogin = JSON.parse(data.toString());
          const parseUserData: IRequestLoginData = JSON.parse(
            parseData.data.toString()
          );

          users.push(parseUserData);

          const responseData: IResponseLoginData = {
            error: false,
            errorText: "",
            index: 0,
            name: parseUserData.name,
          };

          const user: IResponseLogin = {
            ...parseData,
            data: JSON.stringify(responseData),
          };

          ws.send(JSON.stringify(user));
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
