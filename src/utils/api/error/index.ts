import {ApiErrorCode} from './apiErrorCode';

export const STATUS_CODE = {
  // 1xx: Informational
  Informational: 'Informational',
  // 2xx: Success
  Success: 'Success',
  // 3xx: Redirection
  Redirection: 'Redirection',
  // 4xx: Client Error
  ClientError: 'ClientError',
  // 5xx: Server Error
  ServerError: 'ServerError',
};

export type Status = typeof STATUS_CODE[keyof typeof STATUS_CODE];

export function parseResponseStatus(status: number): Status {
  if (status >= 100 && status < 200) {
    return STATUS_CODE.Informational;
  } else if (status >= 200 && status < 300) {
    return STATUS_CODE.Success;
  } else if (status >= 300 && status < 400) {
    return STATUS_CODE.Redirection;
  } else if (status >= 400 && status < 500) {
    return STATUS_CODE.ClientError;
  }
  return STATUS_CODE.ServerError;
}

export class ApiError extends Error {
  status: string;
  code: ApiErrorCode;

  constructor(status: string, message: string, errorCode: ApiErrorCode) {
    super(message);
    this.status = status;
    this.code = errorCode
    Object.defineProperty(this, 'name', {
      enumerable: false,
      value: this.constructor.name,
    });
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }
}

export type ApiErrorResponse = {
  errorCode: ApiErrorCode,
  message: string,
};
