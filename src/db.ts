import { WebSocket } from "ws";
import { IAddShips, IRequestLoginData } from "./types";

export const clients: WebSocket[] = [];
export const users: IRequestLoginData[] = [];
export const shipsPosition: IAddShips[] = [];

export let USER_TURN = 1;

export function setUserTurn(value: number) {
  USER_TURN = value;
}
