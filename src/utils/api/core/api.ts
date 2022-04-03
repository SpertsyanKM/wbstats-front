import type {URIFile} from '../../types/commonTypes';
import type {Status} from '../error';
import {GET_BASE, POST_BASE, POST_MULTIFORM_BASE} from './request';
import {parseResponseStatus, STATUS_CODE, ApiError} from '../error';
import type {ApiErrorResponse} from '../error';
import {AuthService} from '../../../modules/auth';

export async function POST<T>(
  path: string,
  body: {},
  headers?: {},
): Promise<T> {
  const postQuery = await POST_BASE(path, body, {
    ...defaultHeaders(),
    ...headers,
  });
  return await preprocessQuery(postQuery);
}

export async function GET<T>(path: string, headers?: {}): Promise<T> {
  const getQuery = await GET_BASE(path, {
    ...defaultHeaders(),
    ...headers,
  });

  return await preprocessQuery(getQuery);
}

export async function POST_MULTIFORM<T>(
  path: string,
  file: URIFile,
  headers?: {},
): Promise<T> {
  const postQuery = await POST_MULTIFORM_BASE(path, file, {
    ...defaultHeaders(),
    ...headers,
  });
  return await preprocessQuery(postQuery);
}

function defaultHeaders() {
  const token = AuthService.getToken();
  return token ? {
    Authorization: token,
  } : {};
}

async function preprocessQuery(postQuery: any) {
  const status: Status = parseResponseStatus(postQuery.status);
  if (status === STATUS_CODE.Success) {
    return await postQuery.json();
  }
  const errorResponse: ApiErrorResponse = await postQuery.json();
  throw new ApiError(postQuery.status, errorResponse.message, errorResponse.errorCode);
}
