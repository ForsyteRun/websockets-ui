import { clients } from "../db";
import { ITurn } from "../types";
import { WebSocket } from "ws";

const turn = (userIndex?: number) => {
  clients.forEach((client: WebSocket, index) => {
    const currentTurn: ITurn = {
      type: "turn",
      data: JSON.stringify({
        currentPlayer: userIndex === 0 ? userIndex : 1,
      }),
      id: 0,
    };

    client.send(JSON.stringify(currentTurn));
  });
};

export default turn;
