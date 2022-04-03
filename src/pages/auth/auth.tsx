import React, {useCallback, useState} from 'react';
import {Container, Content, ErrorMessage, StyledInput, SwitchButton} from './authStyles';
import Button from '../../components/common/button';
import {AuthService, setAuthToken} from '../../modules/auth';
import {useNavigate} from 'react-router';
import {ROUTE_HOME} from '../../utils/route';
import {calculatePasswordHash} from '../../modules/auth/utils';
import {ApiErrorHandler} from '../../utils/api/error/errorHandler';

type Props = {
  isRegistration?: boolean;
};

const Auth: React.FC<Props> = ({isRegistration: isRegistrationInitial = false}) => {

  const [isRegistration, setIsRegistration] = useState(isRegistrationInitial);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onAuthClick = useCallback(() => {
    if (!email.length || !password.length) {
      setErrorMessage("Заполните все поля");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    const passwordHash = calculatePasswordHash(password);
    AuthService.requestAuth(email, passwordHash)
      .then(authResponse => {
        setAuthToken(authResponse.token);
        navigate(ROUTE_HOME);
      })
      .catch(e => {
        const errorMessage = ApiErrorHandler.handleApiError(e);
        setErrorMessage(errorMessage)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [email, navigate, password, setErrorMessage, setIsLoading]);

  const onRegisterClick = useCallback(() => {
    if (!email.length || !password.length || !passwordConfirmation.length) {
      setErrorMessage("Заполните все поля");
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("Пароли не совпадают");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    const passwordHash = calculatePasswordHash(password);
    AuthService.requestRegister(email, passwordHash)
      .then(authResponse => {
        setAuthToken(authResponse.token);
        navigate(ROUTE_HOME);
      })
      .catch(e => {
        const errorMessage = ApiErrorHandler.handleApiError(e);
        setErrorMessage(errorMessage)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [email, navigate, password, passwordConfirmation, setErrorMessage, setIsLoading]);

  const onEmailChange = useCallback(newEmail => {
    setErrorMessage("");
    setEmail(newEmail);
  }, [setErrorMessage, setEmail]);

  const onPasswordChange = useCallback(password => {
    setErrorMessage("");
    setPassword(password);
  }, [setErrorMessage, setPassword]);

  const onPasswordConfirmationChange = useCallback(passwordConfirmation => {
    setErrorMessage("");
    setPasswordConfirmation(passwordConfirmation)
  }, [setErrorMessage, setPasswordConfirmation]);

  const onSwitchRegistration = useCallback(() => {
    setIsRegistration(!isRegistration);
  }, [isRegistration, setIsRegistration]);

  const onActionButtonClick = isRegistration ? onRegisterClick : onAuthClick;
  const actionButtonLabel = isRegistration ? "Зарегистрироваться" : "Войти";
  const switchButtonLabel = isRegistration ? "Уже зарегистрированы? Войти" : "Нет аккаунта? Зарегистрироваться";

  return (
    <Container>
      <Content>
        <StyledInput value={email} onChange={onEmailChange} placeholder="Адрес электронной почты" />
        <StyledInput value={password} onChange={onPasswordChange} type="password" placeholder="Пароль" />
        {isRegistration && (
          <StyledInput
            value={passwordConfirmation}
            onChange={onPasswordConfirmationChange}
            placeholder="Подтверждение пароля"
            type="password"
          />
        )}
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button isLoading={isLoading} onClick={onActionButtonClick} label={actionButtonLabel} />
        <SwitchButton enabled={!isLoading} onClick={onSwitchRegistration} label={switchButtonLabel} />
      </Content>
    </Container>
  );
};

export default Auth;