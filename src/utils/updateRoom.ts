import { users } from "../db";
import setDataToAllClients from "./setDataToAllClients";
import { IUpdateRoom } from "../types";

const updateRoom = (data: Buffer): void => {
  const createRoomData: IUpdateRoom = JSON.parse(data.toString());

  const roomData = JSON.stringify([
    {
      roomId: createRoomData.id,
      roomUsers: [
        {
          name: users[users.length - 1].name,
          index: users.length - 1,
        },
      ],
    },
  ]);

  const responseCreateRoomData: IUpdateRoom = {
    type: "update_room",
    data: roomData,
    id: 0,
  };

  setDataToAllClients(JSON.stringify(responseCreateRoomData));
};

export default updateRoom;
