import {SERVER_URL} from './serverConstants';

export async function POST_BASE(
  path: string,
  body: {},
  headers?: {},
): Promise<Response> {
  return fetch(SERVER_URL + '/' + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

export async function GET_BASE(path: string, headers?: {}): Promise<Response> {
  return fetch(SERVER_URL + '/' + path, {
    method: 'GET',
    headers: {
      ...headers,
    },
  });
}

export async function POST_MULTIFORM_BASE(
  path: string,
  file: File,
  headers?: {},
): Promise<Response> {
  const formData = new FormData();
  // @ts-ignore
  formData.append('file', file);
  return fetch(SERVER_URL + '/' + path, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      ...headers,
    },
    body: formData,
  });
}
