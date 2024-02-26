import { IAttackRequestData, IModifyCoor } from "../types";

const getDamageCoor = (data: IModifyCoor[], attackCoor: IAttackRequestData) => {
  return data
    .map((ship) => {
      return ship.position.filter((pos) => {
        return +pos.x === attackCoor.x && +pos.y === attackCoor.y;
      }).length > 0
        ? ship.position
        : null;
    })
    .find((el) => el !== null) as { x: number; y: number }[];
};

export default getDamageCoor;
