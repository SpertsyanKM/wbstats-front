import {Client} from '../client';

export type AuthResponse = {
  token: Token;
};

export type RegisterResponse = AuthResponse & {
  client: Client;
};

export type Token = {
  token: string;
  userAuth: UserAuth;
};

export type UserAuth = {
  id: number;
};
