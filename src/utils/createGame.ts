import { WebSocket } from "ws";
import { clients } from "../db";
import { IAddUsersToRoom, ICreateGame } from "../types";

const createGame = (data: Buffer) => {
  const addUserToRoom: IAddUsersToRoom = JSON.parse(data.toString());

  clients.forEach((client: WebSocket, index) => {
    const createGame: ICreateGame = {
      type: "create_game",
      data: JSON.stringify({
        idGame: addUserToRoom.id,
        idPlayer: index,
      }),
      id: 0,
    };

    client.send(JSON.stringify(createGame));
  });
};

export default createGame;
