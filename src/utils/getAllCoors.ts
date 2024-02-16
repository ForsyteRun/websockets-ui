import { fullShipsCoors } from "../db";
import { IModifyCoor, IShipsCoor } from "../types";

const getAllCoors = (data: IShipsCoor[]) => {
  const fullShipsCoor = data.map((pos) => {
    const modifyObj: IModifyCoor = {
      ...pos,
      ["position"]: [],
    };
    if (pos.direction) {
      for (let i = 0; i <= pos.length - 1; i++) {
        modifyObj.position.push({ x: pos.position.x, y: pos.position.y + i });
      }
    } else {
      for (let i = 0; i <= pos.length - 1; i++) {
        modifyObj.position.push({ x: pos.position.x + i, y: pos.position.y });
      }
    }

    // fullShipsCoors.push(modifyObj);

    return modifyObj;
  });

  return fullShipsCoor;
};

export default getAllCoors;
