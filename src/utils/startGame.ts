import { WebSocket } from "ws";
import { clients, shipsPosition } from "../db";
import { IStartGame } from "../types";

const startGame = () => {
  clients.forEach((client: WebSocket, index) => {
    const startGameRequest: IStartGame = {
      type: "start_game",
      data: shipsPosition[index].data,
      id: 0,
    };

    client.send(JSON.stringify(startGameRequest));
  });
};

export default startGame;
