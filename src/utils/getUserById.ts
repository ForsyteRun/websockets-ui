import { fullShipsCoors } from "../db";
import { IExectUserShipsPosition } from "../types";

const getUserDataById = (index: number) => {
  return fullShipsCoors.find(
    (user: IExectUserShipsPosition) => user.id === index
  ) as IExectUserShipsPosition;
};

export default getUserDataById;
