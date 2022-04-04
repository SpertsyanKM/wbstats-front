import {useSelector} from 'react-redux';
import {selectAuthToken} from './selectors';

export const useIsAuthorized = () => {
  const token = useSelector(selectAuthToken);
  return token != null;
};
