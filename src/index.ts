import { httpServer } from "./http_server/index";
import { WebSocketServer } from "ws";
import db from "./db";
import {
  IRequestLogin,
  IRequestLoginData,
  IResponseLogin,
  IResponseLoginData,
  IResponseUpdateRoom,
} from "./types";
import * as dotenv from "dotenv";

dotenv.config();

const HTTP_PORT = process.env.PORT;

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data: Buffer) {
    const type = JSON.parse(data.toString()).type;

    try {
      switch (type) {
        case "reg":
          const parseData: IRequestLogin = JSON.parse(data.toString());
          const parseUserData: IRequestLoginData = JSON.parse(
            parseData.data.toString()
          );

          db.push(parseUserData);

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
          const createRoomData: IResponseUpdateRoom = JSON.parse(
            data.toString()
          );

          const roomData = JSON.stringify([
            {
              roomId: createRoomData.id,
              roomUsers: [
                {
                  name: db[db.length - 1].name,
                  index: db.length - 1,
                },
              ],
            },
          ]);

          const responseCreateRoomData: IResponseUpdateRoom = {
            type: "update_room",
            data: roomData,
            id: 0,
          };

          ws.send(JSON.stringify(responseCreateRoomData));

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
