import {Client} from './types';
import {GET} from '../../utils/api/core/api';

type MeFetcher = () => Promise<Client>;
const fetchMe: MeFetcher = async () => {
  return await GET<Client>('client/me');
};

export const ClientService = {
  fetchMe,
};
