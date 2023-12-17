export type ParamsLogin = {
  email: string;
  password: string;
};

export type UserItem = {
  id?: string;
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  card_id: string;
  phone: string;
  role: number;
  action?: undefined;
};

export type UserType = {
  items: UserItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    nextPage: number;
    previousPage: number;
  };
};

export type UserAll = {
  result: UserType;
};

export type LoginResponse = {
  userInfo: UserItem;
  token: string;
  email: string;
  statusCode: number;
  message: string;
};
