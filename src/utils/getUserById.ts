import { fullShipsCoors } from "../db";
import { IExectUserShipsPosition } from "../types";

const getUserById = (index: number) => {
  return fullShipsCoors.find(
    (user: IExectUserShipsPosition) => user.id === index
  ) as IExectUserShipsPosition;
};

export default getUserById;
