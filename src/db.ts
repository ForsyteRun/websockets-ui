import { WebSocket } from "ws";
import {
  IAddShips,
  IExectUserShipsPosition,
  IModifyCoor,
  IRequestLoginData,
} from "./types";

export const clients: WebSocket[] = [];
export const users: IRequestLoginData[] = [];
export const shipsPosition: IAddShips[] = [];

export let fullShipsCoors: IExectUserShipsPosition[] = [];

export let USER_TURN = 1;

export function setUserTurn(value: number) {
  USER_TURN = value;
}

export function updateCoors(value: IExectUserShipsPosition, id: number) {
  // const userData = fullShipsCoors.filter((el) => el.id !== id);
  // userData.push(...value);
  // fullShipsCoors = userData;

  fullShipsCoors = fullShipsCoors
    .map((userData) => {
      if (userData.id === id) {
        return value;
      }
      return userData;
    })
    .flat();

  console.log("lkj");
}
