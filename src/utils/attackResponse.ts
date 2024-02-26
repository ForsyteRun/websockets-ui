import { setDataToAllClients, turn } from ".";
import { setUserTurn } from "../db";
import { IAttack, IAttackRequestData, IAttackResponseData } from "../types";

const attackResponse = (
  atackStatus: IAttackResponseData["status"],
  attackCoor: IAttackRequestData,
  index: number
) => {
  const attackResponseData: IAttackResponseData = {
    position: {
      x: attackCoor.x,
      y: attackCoor.y,
    },
    currentPlayer: attackCoor.indexPlayer,
    status: atackStatus,
  };

  const attackResponse: IAttack = {
    type: "attack",
    data: JSON.stringify(attackResponseData),
    id: 0,
  };

  setDataToAllClients(JSON.stringify(attackResponse));

  if (atackStatus !== "miss") {
    turn(attackCoor.indexPlayer);
    setUserTurn(attackCoor.indexPlayer);
  } else {
    turn(index);
    setUserTurn(index);
  }
};

export default attackResponse;
