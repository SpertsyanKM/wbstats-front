import React, {useCallback} from 'react';
import {Container, MenuContainer, Row} from './headerStyles';
import NavigationButtons from '../navigationButtons';
import {setAuthToken} from '../../modules/auth';
import Button, {ButtonType} from '../common/button';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {ROUTE_AUTH, ROUTE_HOME} from '../../utils/route';
import {useIsAuthorized} from '../../modules/auth/hooks';

type Props = {};

const Header: React.FC<Props> = () => {
  const isAuthorized = useIsAuthorized();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = useCallback(() => {
    dispatch(setAuthToken(null));
    navigate(ROUTE_HOME);
  }, [dispatch, navigate]);

  const onLoginClick = useCallback(() => {
    navigate(ROUTE_AUTH);
  }, [navigate]);

  return (
    <Container root>
      <Row>
        <MenuContainer>
          <NavigationButtons />
        </MenuContainer>
        {isAuthorized ? (
          <Button buttonType={ButtonType.Tertiary} onClick={onLogoutClick} label="Выйти" />
        ) : (
          <Button buttonType={ButtonType.Tertiary} onClick={onLoginClick} label="Войти" />
        )}
      </Row>
    </Container>
  );
};

export default Header;
