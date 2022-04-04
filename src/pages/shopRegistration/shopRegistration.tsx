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
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateClick = useCallback(() => {
    if (!name.length) {
      setErrorMessage("Укажите название магазина");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    ShopService.requestShopRegistration(name)
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
  }, [name, navigate, setErrorMessage, setIsLoading, dispatch]);

  const onNameChange = useCallback(newName => {
    setErrorMessage("");
    setName(newName);
  }, [setErrorMessage, setName]);

  return (
    <Container>
      <Content>
        <StyledInput value={name} onChange={onNameChange} placeholder="Название магазина" />
        {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button isLoading={isLoading} onClick={onCreateClick} label="Создать" />
      </Content>
    </Container>
  );
};

export default ShopRegistration;
