import _ from 'lodash';

/**
 * Func convert query params
 * @param {Object} params
 * @returns {string}
 */
export const convertQueryParams = (params: Object): string => {
  const queryParams =
    '?' +
    _.map(
      params,
      (value, key: string) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`,
    ).join('&');
  return queryParams;
};
