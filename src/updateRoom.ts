import { users } from "./db";
import { IUpdateRoom } from "./types";

const updateRoom = (data: IUpdateRoom): IUpdateRoom => {
  const roomData = JSON.stringify([
    {
      roomId: data.id,
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

  return responseCreateRoomData;
};

export default updateRoom;
