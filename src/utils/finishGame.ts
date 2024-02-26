import { WebSocket } from "ws";
import { clients } from "../db";
import { IExectUserShipsPosition, IFinishGame, IModifyCoor } from "../types";

const sendFinishGameMessage = (client: WebSocket, winPlayer: number) => {
  const finishGame: IFinishGame = {
    type: "finish",
    data: JSON.stringify({
      winPlayer: winPlayer,
    }),
    id: 0,
  };

  client.send(JSON.stringify(finishGame));
};

const finishGame = (data: IExectUserShipsPosition[]) => {
  let shipsCountFirstId = 0;
  let shipsCountSecondId = 0;

  data.forEach((el) => {
    const { id, data } = el;

    if (id === 1) {
      shipsCountFirstId += data.length;
    } else {
      shipsCountSecondId += data.length;
    }
  });

  if (shipsCountFirstId === 0) {
    clients.forEach((client: WebSocket) => {
      sendFinishGameMessage(client, 0);
    });
  } else if (shipsCountSecondId === 0) {
    clients.forEach((client: WebSocket) => {
      sendFinishGameMessage(client, 1);
    });
  }

  console.log(shipsCountFirstId, shipsCountSecondId);
};

export default finishGame;
