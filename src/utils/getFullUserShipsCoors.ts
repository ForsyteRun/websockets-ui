import { IAttackRequestData, IModifyCoor } from "../types";

const getFullUserShipsCoors = (
  data: IModifyCoor[],
  attackCoor: IAttackRequestData
) => {
  return data
    .map((ship) => {
      const modifiedPositions = ship.position.filter((pos) => {
        return +pos.x !== attackCoor.x || +pos.y !== attackCoor.y;
      });
      return modifiedPositions.length > 0
        ? {
            ...ship,
            position: modifiedPositions,
          }
        : null;
    })
    .filter((el) => el !== null) as IModifyCoor[];
};

export default getFullUserShipsCoors;
