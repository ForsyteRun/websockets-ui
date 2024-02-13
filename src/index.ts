import { httpServer } from "./http_server/index";
import { WebSocketServer } from "ws";
import {
  IRequestLogin,
  IRequestLoginData,
  IResponseLogin,
  IResponseLoginData,
} from "./types";
import db from "./db";

const HTTP_PORT = 8181;

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data: Buffer) {
    try {
      const parseData: IRequestLogin = JSON.parse(data.toString());
      const parseUserData: IRequestLoginData = JSON.parse(
        parseData.data.toString()
      );

      db.push(parseUserData);

      const responseData: IResponseLoginData = {
        error: false,
        errorText: "",
        index: 0,
        name: parseUserData.name,
      };

      const user: IResponseLogin = {
        ...parseData,
        data: JSON.stringify(responseData),
      };

      ws.send(JSON.stringify(user));
    } catch {
      const error = new Error();
      error.message = "error during request";
      error.name = "error";

      const responseError: IResponseLoginData = {
        error: true,
        errorText: error.message,
        index: 0,
        name: error.name,
      };

      ws.send(JSON.stringify(responseError));
    }
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
