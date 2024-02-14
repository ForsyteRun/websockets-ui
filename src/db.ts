import { WebSocket } from "ws";
import { IRequestLoginData } from "./types";

export const clients: WebSocket[] = [];
export const users: IRequestLoginData[] = [];
