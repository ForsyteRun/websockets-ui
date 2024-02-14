import { shipsPosition } from "../db";
import { IStartGame } from "../types";
import setDataToAllClients from "./setDataToAllClients";

const startGame = () => {
  const startGameRequest: IStartGame = {
    type: "start_game",
    data: shipsPosition[0].data,
    id: 0,
  };

  setDataToAllClients(JSON.stringify(startGameRequest));
};

export default startGame;
