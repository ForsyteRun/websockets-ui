import { attackResponse, getDamageCoor } from ".";
import { IAttackRequestData, IModifyCoor } from "../types";

const setShotNearBy = (
  data: IModifyCoor[],
  attackCoor: IAttackRequestData,
  status: "miss" | "killed" | "shot",
  opositeUserIndex: number
) => {
  const damageCoor = getDamageCoor(data, attackCoor);

  if (status === "killed") {
    getSurroundingCoords(damageCoor).forEach((coors) => {
      const data = {
        gameId: 0,
        x: coors.x,
        y: coors.y,
        indexPlayer: opositeUserIndex,
      };
      attackResponse("miss", data, opositeUserIndex);
    });
  }
};
export default setShotNearBy;

function getSurroundingCoords(coords: { x: number; y: number }[]) {
  let surroundingCoords: { x: number; y: number }[] = [];

  coords.forEach((coord) => {
    for (let i = coord.x - 1; i <= coord.x + 1; i++) {
      for (let j = coord.y - 1; j <= coord.y + 1; j++) {
        if (!((i === coord.x && j === coord.y) || i < 0 || j < 0)) {
          const newCoord = { x: i, y: j };
          if (!coords.some((c) => c.x === newCoord.x && c.y === newCoord.y)) {
            surroundingCoords.push(newCoord);
          }
        }
      }
    }
  });

  return surroundingCoords;
}
