import React, {useCallback, useState} from 'react';
import {Container, Content, ErrorMessage, StyledInput} from './shopRegistrationStyles';
import Button from '../../components/common/button';
import {useNavigate} from 'react-router';
import {ROUTE_HOME} from '../../utils/route';
import {ApiErrorHandler} from '../../utils/api/error/errorHandler';
import {useDispatch} from 'react-redux';
import {setShop, ShopService} from '../../modules/shop';

type Props = {};

const ShopRegistration: React.FC<Props> = () => {
  const [name, setName] = useState("");
  const [wbApiKeyV1, setWbApiKeyV1] = useState("");
  const [wbApiKeyV2, setWbApiKeyV2] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateClick = useCallback(() => {
    if (!name.length) {
      setErrorMessage("Укажите название магазина");
      return;
    }
    if (!wbApiKeyV1.length) {
      setErrorMessage("Укажите ключ доступа API v1 для Wildberries");
      return;
    }
    if (!wbApiKeyV2.length) {
      setErrorMessage("Укажите ключ доступа API v2 для Wildberries");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    ShopService.requestShopRegistration(name, wbApiKeyV1, wbApiKeyV2)
      .then(shop => {
        dispatch(setShop(shop));
        setIsLoading(false);
        navigate(ROUTE_HOME);
      })
      .catch(e => {
        const errorMessage = ApiErrorHandler.handleApiError(e);
        setErrorMessage(errorMessage)
        setIsLoading(false);
      })
  }, [name, wbApiKeyV1, wbApiKeyV2, navigate, setErrorMessage, setIsLoading, dispatch]);

  const onNameChange = useCallback(newName => {
    setErrorMessage("");
    setName(newName);
  }, [setErrorMessage, setName]);

  const onWbApiKeyV1Change = useCallback(newKey => {
    setErrorMessage("");
    setWbApiKeyV1(newKey);
  }, [setErrorMessage, setWbApiKeyV1]);

  const onWbApiKeyV2Change = useCallback(newKey => {
    setErrorMessage("");
    setWbApiKeyV2(newKey);
  }, [setErrorMessage, setWbApiKeyV2]);

  return (
    <Container>
      <Content>
        <StyledInput value={name} onChange={onNameChange} placeholder="Название магазина" />
        <StyledInput value={wbApiKeyV1} onChange={onWbApiKeyV1Change} placeholder="Ключ доступа к API v1 для Wildberries" />
        <StyledInput value={wbApiKeyV2} onChange={onWbApiKeyV2Change} placeholder="Ключ доступа к API v2 для Wildberries" />
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button isLoading={isLoading} onClick={onCreateClick} label="Создать" />
      </Content>
    </Container>
  );
};

export default ShopRegistration;
