import { users } from "../db";
import {
  IRequestLogin,
  IRequestLoginData,
  IResponseLogin,
  IResponseLoginData,
} from "../types";

const loginUser = (data: Buffer) => {
  const parseData: IRequestLogin = JSON.parse(data.toString());
  const parseUserData: IRequestLoginData = JSON.parse(
    parseData.data.toString()
  );

  users.push(parseUserData);

  const responseData: IResponseLoginData = {
    error: false,
    errorText: "",
    index: 0,
    name: parseUserData.name,
  };

  const user: IResponseLogin = {
    ...parseData,
    data: JSON.stringify(responseData),
  };

  return JSON.stringify(user);
};

export default loginUser;
