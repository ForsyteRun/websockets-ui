import { USER_TURN, setUserTurn, updateCoors } from "../db";
import {
  IAttack,
  IAttackRequestData,
  IAttackResponseData,
  IExectUserShipsPosition,
} from "../types";
import {
  getAttackStatus,
  getDamageCoor,
  getFullUserShipsCoors,
  setDataToAllClients,
  getUserById,
} from "./index";

import turn from "./turn";

const attack = (data: Buffer) => {
  const attackRequest: IAttack = JSON.parse(data.toString());
  const attackRequestData: IAttackRequestData = JSON.parse(
    attackRequest.data.toString()
  );

  if (USER_TURN !== attackRequestData.indexPlayer) return;

  const opositeUserIndex = attackRequestData.indexPlayer === 1 ? 0 : 1;

  const userData = getUserById(opositeUserIndex);

  const fullUserShipsCoors = getFullUserShipsCoors(
    userData.data,
    attackRequestData
  );

  const damageCoor = getDamageCoor(userData.data, attackRequestData);

  const modifiedDataWithId = {
    id: opositeUserIndex,
    data: fullUserShipsCoors,
  } as IExectUserShipsPosition;

  updateCoors(modifiedDataWithId, opositeUserIndex);

  const atackStatus = getAttackStatus(damageCoor);

  const attackResponseData: IAttackResponseData = {
    position: {
      x: attackRequestData.x,
      y: attackRequestData.y,
    },
    currentPlayer: attackRequestData.indexPlayer,
    status: atackStatus,
  };

  const attackResponse: IAttack = {
    type: "attack",
    data: JSON.stringify(attackResponseData),
    id: 0,
  };

  setDataToAllClients(JSON.stringify(attackResponse));

  if (atackStatus !== "miss") {
    turn(attackRequestData.indexPlayer);
    setUserTurn(attackRequestData.indexPlayer);
  } else {
    turn(opositeUserIndex);
    setUserTurn(opositeUserIndex);
  }
};

export default attack;
