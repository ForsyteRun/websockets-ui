import { IShipsCoor } from "../types";

const getAllCoors = (data: IShipsCoor[]) => {
  const fullShipsCoors: { x: number; y: number }[] = [];

  data.forEach((pos) => {
    if (pos.direction) {
      for (let i = 0; i <= pos.length - 1; i++) {
        fullShipsCoors.push({ x: pos.position.x, y: pos.position.y + i });
      }
    } else {
      for (let i = 0; i <= pos.length - 1; i++) {
        fullShipsCoors.push({ x: pos.position.x + i, y: pos.position.y });
      }
    }
  });

  return fullShipsCoors;
};

export default getAllCoors;
