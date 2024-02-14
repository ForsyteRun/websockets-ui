import setDataToAllClients from "./setDataToAllClients";
import { IAddUsersToRoom, ICreateGame } from "../types";

const createGame = (data: Buffer) => {
  const addUserToRoom: IAddUsersToRoom = JSON.parse(data.toString());

  const createGame: ICreateGame = {
    type: "create_game",
    data: JSON.stringify({
      idGame: addUserToRoom.id,
      idPlayer: addUserToRoom.id,
    }),
    id: addUserToRoom.id,
  };

  setDataToAllClients(JSON.stringify(createGame));
};

export default createGame;
