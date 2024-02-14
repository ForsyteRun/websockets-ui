import { WebSocket } from "ws";
import { IAddShips, IRequestLoginData } from "./types";

export const clients: WebSocket[] = [];
export const users: IRequestLoginData[] = [];
export const shipsPosition: IAddShips[] = [];
