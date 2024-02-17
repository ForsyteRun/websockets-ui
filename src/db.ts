import { WebSocket } from "ws";
import { IAddShips, IExectUserShipsPosition, IRequestLoginData } from "./types";

export const clients: WebSocket[] = [];
export const users: IRequestLoginData[] = [];
export const shipsPosition: IAddShips[] = [];

export let fullShipsCoors: IExectUserShipsPosition[] = [];
export const notModifyFullShipsCoors: IExectUserShipsPosition[] = [];

export let USER_TURN = 1;

export function setUserTurn(value: number) {
  USER_TURN = value;
}

export function updateCoors(value: IExectUserShipsPosition, id: number) {
  fullShipsCoors = fullShipsCoors
    .map((userData) => {
      if (userData.id === id) {
        return value;
      }
      return userData;
    })
    .flat();
}
