export type ParamsLogin = {
  email: string;
  password: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  phone: number;
  role: number;
  action?: undefined;
};

export type UserAll = {
  result: UserType[];
};

export type LoginResponse = {
  userInfo: UserType;
  token: string;
  email: string;
  statusCode: number;
  message: string;
};
