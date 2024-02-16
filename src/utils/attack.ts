import { USER_TURN, updateCoors } from "../db";
import { IAttack, IAttackRequestData, IExectUserShipsPosition } from "../types";
import {
  attackResponse,
  getAttackStatus,
  getDamageCoor,
  getFullUserShipsCoors,
  getUserById,
} from "./index";

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

  attackResponse(atackStatus, attackRequestData, opositeUserIndex);
};

export default attack;
