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

export interface IUpdateRoom {
  type: "update_room";
  data: string;
  id: number;
}

export interface IAddUsersToRoom {
  type: "add_user_to_room";
  data: {
    indexRoom: number;
  };
  id: number;
}

export interface ICreateGame {
  type: "create_game";
  data: string;
  id: number;
}
