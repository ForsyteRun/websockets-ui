import { shipsPosition } from "../db";
import {
  IAttack,
  IAttackRequestData,
  IAttackResponseData,
  IShipsData,
} from "../types";
import getAllCoors from "./getAllCoors";
import setDataToAllClients from "./setDataToAllClients";
import turn from "./turn";

const attack = (data: Buffer) => {
  let attackRequest: IAttack = JSON.parse(data.toString());
  let attackRequestData: IAttackRequestData = JSON.parse(
    attackRequest.data.toString()
  );

  const userIndex = attackRequestData.indexPlayer === 1 ? 0 : 1;

  const shipsCoorDB: IShipsData = JSON.parse(shipsPosition[userIndex].data);

  const coors = getAllCoors(shipsCoorDB.ships);

  const isDamage = coors.some(
    (coor) => +coor.x === attackRequestData.x && +coor.y === attackRequestData.y
  );

  console.log(isDamage);

  const attackResponseData: IAttackResponseData = {
    position: {
      x: attackRequestData.x,
      y: attackRequestData.y,
    },
    currentPlayer: attackRequestData.indexPlayer,
    status: isDamage ? "killed" : "miss",
  };

  const attackResponse: IAttack = {
    type: "attack",
    data: JSON.stringify(attackResponseData),
    id: 0,
  };

  setDataToAllClients(JSON.stringify(attackResponse));
  turn(attackRequestData.indexPlayer);
};

export default attack;
