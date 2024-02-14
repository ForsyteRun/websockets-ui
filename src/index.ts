import * as dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { clients, shipsPosition, users } from "./db";
import { httpServer } from "./http_server/index";
import { IAddShips, IResponseLoginData } from "./types";
import createGame from "./utils/createGame";
import loginUser from "./utils/loginUser";
import updateRoom from "./utils/updateRoom";
import setDataToAllClients from "./utils/setDataToAllClients";
import startGame from "./utils/startGame";

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

          // const responseLogin = updateRoom(data);

          // ws.send(responseLogin);

          break;
        case "create_room":
          const responseLoginUser = updateRoom(data);

          if (users.length > 1) {
            setDataToAllClients(responseLoginUser);
          } else {
            ws.send(responseLoginUser);
          }

          break;
        case "add_user_to_room":
          const responseCreateRoomData = updateRoom(data);

          setDataToAllClients(responseCreateRoomData);

          createGame(data);

          break;
        case "add_ships":
          let ships: IAddShips = JSON.parse(data.toString());

          const singleUserShips = { ...ships, id: shipsPosition.length };

          shipsPosition.push(singleUserShips);

          if (shipsPosition.length === 2) {
            startGame();
          }

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
