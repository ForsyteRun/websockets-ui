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
export interface IAddShips {
  type: "add_ships";
  data: string;
  id: number;
}
export interface IShipsData {
  gameId: number;
  ships: IShipsCoor[];
  indexPlayer: number;
}

export interface IShipsCoor {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
}

export interface IModifyCoor extends Omit<IShipsCoor, "position"> {
  position: { x: number; y: number }[];
}
export interface IExectUserShipsPosition {
  data: IModifyCoor[];
  id: number;
}

export interface IStartGame {
  type: "start_game";
  data: string;
  id: number;
}
export interface IAttack {
  type: "attack";
  data: string;
  id: number;
}

export interface IAttackRequestData {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
}
export interface IAttackResponseData {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: number /* id of the player in the current game */;
  status: "miss" | "killed" | "shot";
}
export interface ITurn {
  type: "turn";
  data: string;
  id: 0;
}

export interface IFinishGame {
  type: "finish";
  data: string;
  id: 0;
}
