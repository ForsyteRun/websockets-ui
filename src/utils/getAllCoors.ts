import { IModifyCoor, IShipsCoor } from "../types";

const getAllCoors = (data: IShipsCoor[]): IModifyCoor[] => {
  return data.map((pos) => {
    const increment = pos.direction ? { x: 0, y: 1 } : { x: 1, y: 0 };
    const position = Array.from({ length: pos.length }, (_, i) => ({
      x: pos.position.x + i * increment.x,
      y: pos.position.y + i * increment.y,
    }));
    return { ...pos, position };
  });
};

export default getAllCoors;
