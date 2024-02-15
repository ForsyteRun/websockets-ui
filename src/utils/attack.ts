import { IAttack, IAttackRequestData, IAttackResponseData } from "../types";
import setDataToAllClients from "./setDataToAllClients";
import turn from "./turn";

const attack = (data: Buffer) => {
  let attackRequest: IAttack = JSON.parse(data.toString());
  let attackRequestData: IAttackRequestData = JSON.parse(
    attackRequest.data.toString()
  );

  const attackResponseData: IAttackResponseData = {
    position: {
      x: attackRequestData.x,
      y: attackRequestData.y,
    },
    currentPlayer:
      attackRequestData.indexPlayer /* id of the player in the current game */,
    status: "miss",
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
