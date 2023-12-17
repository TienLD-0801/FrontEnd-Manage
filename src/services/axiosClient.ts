import axios, { AxiosError, AxiosInstance } from 'axios';
import { store } from '@/stores/index';
import { LoginResponse, ParamsLogin, UserAll } from '@/shared/types/api-type/login';
import { updateUser } from '@/stores/slices/UserSlice';
import _ from 'lodash';
import { convertQueryParams } from '@/shared/utils/common';
import { CategoriesAll } from '@/shared/types/api-type/category';
import { ProductAll } from '@/shared/types/api-type/product';

/** Setting timeout of axios */
const AXIOS_TIMEOUT: number = 10000;

/** API url */
const BASE_URL: string = import.meta.env.VITE_API_URL;

class AxiosClient {
  private axios: AxiosInstance;
  public exception: AxiosError | undefined;
  private config = {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
  };

  constructor() {
    this.axios = axios.create({
      baseURL: BASE_URL,
      timeout: AXIOS_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.axios.interceptors.request.use(
      async (config) => {
        const token = store.getState().user.token;

        if (token) {
          config.headers['X-API-TOKEN'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const { statusCode } = _.get(error, 'response.data', {});
        const serverError = _.get(error, 'response.data', {});
        if (statusCode === 401) {
          store.dispatch(
            updateUser({
              name: '',
              email: '',
              token: '',
            }),
          );
        }
        return Promise.reject(serverError);
      },
    );
  }

  // api login
  apiLogin(params: ParamsLogin) {
    return this.axios.post<LoginResponse>('api/login', params);
  }

  // api get all user
  apiGetUsers(params: Object) {
    return this.axios.get<UserAll>(
      `api/users${convertQueryParams(params)}`,
      this.config,
    );
  }

  // api create new user
  apiCreateUser(params: Object) {
    return this.axios.post('api/create-user', params);
  }

  // api update user
  apiUpdateUser(id: number, params: Object) {
    return this.axios.put(`api/update-user/${id}`, params, this.config);
  }

  // api delete user
  apiDeleteUser(id: number) {
    return this.axios.delete(`api/delete-user/${id}`, this.config);
  }

  // api get all product
  apiGetProduct(params: Object) {
    return this.axios.get<ProductAll>(
      `api/products${convertQueryParams(params)}`,
      this.config,
    );
  }

  // api get create product
  apiCreateProduct(params: Object) {
    return this.axios({
      method: 'post',
      url: 'api/create-product',
      data: params,
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // api delete product
  apiDeleteProduct(id: number) {
    return this.axios.delete(`api/delete-product/${id}`, this.config);
  }

  // api get all category
  apiGetCategory(params: Object) {
    return this.axios.get<CategoriesAll>(
      `api/categories${convertQueryParams(params)}`,
      this.config,
    );
  }

  // api update category
  apiUpdateCategory(id: number, params: Object) {
    return this.axios.put(`api/update-category/${id}`, params, this.config);
  }

  // api create category
  apiCreateCategory(params: Object) {
    return this.axios.post('api/create-category', params, this.config);
  }

  // api delete category
  apiDeleteCategory(id: number) {
    return this.axios.delete(`api/delete-category/${id}`, this.config);
  }
}

export default new AxiosClient();
