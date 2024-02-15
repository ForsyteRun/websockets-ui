import { WebSocket } from "ws";
import { clients, shipsPosition } from "../db";
import { IStartGame } from "../types";
import setDataToAllClients from "./setDataToAllClients";

const startGame = () => {
  clients.forEach((client: WebSocket, index) => {
    const startGameRequest: IStartGame = {
      type: "start_game",
      data: shipsPosition[index].data,
      id: 0,
    };

    client.send(JSON.stringify(startGameRequest));
  });

  // setDataToAllClients(JSON.stringify(startGameRequest));
};

export default startGame;
