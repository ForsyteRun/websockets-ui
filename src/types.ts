export interface IRequestLogin {
  type: "reg";
  data: IRequestLoginData | string;
  id: number;
}

export interface IResponseLogin {
  type: "reg";
  data: IResponseLoginData | string;
  id: number;
}

export interface IResponseLoginData {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

export interface IRequestLoginData {
  name: string;
  password: string;
}
