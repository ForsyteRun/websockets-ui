import { notModifyFullShipsCoors } from "../db";
import { IExectUserShipsPosition } from "../types";

const getUserByIdNotModify = (index: number) => {
  return notModifyFullShipsCoors.find(
    (user: IExectUserShipsPosition) => user.id === index
  ) as IExectUserShipsPosition;
};

export default getUserByIdNotModify;
