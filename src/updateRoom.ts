import { users } from "./db";
import { IResponseUpdateRoom } from "./types";

const updateRoom = (data: IResponseUpdateRoom): IResponseUpdateRoom => {
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

  const responseCreateRoomData: IResponseUpdateRoom = {
    type: "update_room",
    data: roomData,
    id: 0,
  };

  return responseCreateRoomData;
};

export default updateRoom;
