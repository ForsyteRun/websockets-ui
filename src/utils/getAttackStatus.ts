import { IAttackResponseData } from "../types";

const getAttackStatus = (data: { x: number; y: number }[]) => {
  const statusDamage: Pick<IAttackResponseData, "status"> = {
    status: "miss",
  };

  if (!data) {
    statusDamage.status = "miss";
  } else if (data.length > 1) {
    statusDamage.status = "shot";
  } else if (data.length === 1) {
    statusDamage.status = "killed";
  }

  return statusDamage.status;
};

export default getAttackStatus;
