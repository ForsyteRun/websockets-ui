import * as dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { clients, fullShipsCoors, shipsPosition, users } from "./db";
import { httpServer } from "./http_server/index";
import {
  IAddShips,
  IExectUserShipsPosition,
  IResponseLoginData,
  IShipsData,
  IUpdateRoom,
} from "./types";
import createGame from "./utils/createGame";
import getAllCoors from "./utils/getAllCoors";
import loginUser from "./utils/loginUser";
import setDataToAllClients from "./utils/setDataToAllClients";
import startGame from "./utils/startGame";
import turn from "./utils/turn";
import updateRoom from "./utils/updateRoom";
import attack from "./utils/attack";

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
          const responseLoginUser = updateRoom(data);

          if (users.length > 1) {
            setDataToAllClients(responseLoginUser);
          } else {
            ws.send(responseLoginUser);
          }

          break;
        case "add_user_to_room":
          createGame(data);

          const responseData: IUpdateRoom = {
            type: "update_room",
            data: JSON.stringify([]),
            id: 0,
          };

          setDataToAllClients(JSON.stringify(responseData));

          break;
        case "add_ships":
          let ships: IAddShips = JSON.parse(data.toString());

          const singleUserShips = { ...ships, id: shipsPosition.length };

          shipsPosition.push(singleUserShips);

          const shipsCoorDB: IShipsData = JSON.parse(singleUserShips.data);

          const coors = getAllCoors(shipsCoorDB.ships);

          const exectUserShipsPosition: IExectUserShipsPosition = {
            id: shipsCoorDB.indexPlayer,
            data: coors,
          };

          fullShipsCoors.push(exectUserShipsPosition);

          if (shipsPosition.length === 2) {
            startGame();
            turn();
          }

          break;
        case "attack":
          attack(data);
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
