import { USER_TURN, fullShipsCoors, setUserTurn, updateCoors } from "../db";
import {
  IAttack,
  IAttackRequestData,
  IAttackResponseData,
  IExectUserShipsPosition,
  IModifyCoor,
} from "../types";
import getUserDataById from "./getUserById";
import setDataToAllClients from "./setDataToAllClients";
import turn from "./turn";

const statusDamage: Pick<IAttackResponseData, "status"> = {
  status: "miss",
};

const attack = (data: Buffer) => {
  const attackRequest: IAttack = JSON.parse(data.toString());
  const attackRequestData: IAttackRequestData = JSON.parse(
    attackRequest.data.toString()
  );

  if (USER_TURN !== attackRequestData.indexPlayer) return;
  const opositeUserIndex = attackRequestData.indexPlayer === 1 ? 0 : 1;

  const modifiedDataArr = getUserDataById(opositeUserIndex)
    ?.data.map((ship) => {
      const modifiedPositions = ship.position.filter((pos) => {
        return +pos.x !== attackRequestData.x || +pos.y !== attackRequestData.y;
      });
      return modifiedPositions.length > 0
        ? {
            ...ship,
            position: modifiedPositions,
          }
        : null;
    })
    .filter((el) => el !== null) as IModifyCoor[];

  const dataArr = getUserDataById(opositeUserIndex)
    ?.data.map((ship) => {
      return ship.position.filter((pos) => {
        return +pos.x === attackRequestData.x && +pos.y === attackRequestData.y;
      }).length > 0
        ? ship.position
        : null;
    })
    .find((el) => el !== null) as { x: number; y: number }[];

  const modifiedDataWithId = {
    id: opositeUserIndex,
    data: modifiedDataArr,
  } as IExectUserShipsPosition;

  updateCoors(modifiedDataWithId, opositeUserIndex);

  if (!dataArr) {
    statusDamage.status = "miss";
  } else if (dataArr.length > 1) {
    statusDamage.status = "shot";
  } else if (dataArr.length === 1) {
    statusDamage.status = "killed";
  }

  const attackResponseData: IAttackResponseData = {
    position: {
      x: attackRequestData.x,
      y: attackRequestData.y,
    },
    currentPlayer: attackRequestData.indexPlayer,
    status: statusDamage.status,
  };

  const attackResponse: IAttack = {
    type: "attack",
    data: JSON.stringify(attackResponseData),
    id: 0,
  };

  setDataToAllClients(JSON.stringify(attackResponse));

  if (statusDamage.status !== "miss") {
    turn(attackRequestData.indexPlayer);
    setUserTurn(attackRequestData.indexPlayer);
  } else {
    turn(opositeUserIndex);
    setUserTurn(opositeUserIndex);
  }
};

export default attack;
