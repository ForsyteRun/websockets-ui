export interface IRequestLogin {
  type: "reg";
  data: IRequestLoginData | string;
  id: number;
}

export interface IResponseLogin {
  type: "reg";
  data: IResponseLoginData | string;
  id: number;
}

export interface IResponseLoginData {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface IRequestLoginData {
  name: string;
  password: string;
}

export interface IResponseUpdateRoom {
  type: "update_room";
  data: string;
  id: 0;
}

// export interface IResponseUpdateRoomData {
//   roomId: number;
//   roomUsers: string;
// }

// export interface IResponseUpdateRoomUsers {
//   name: string;
//   index: number;
// }
