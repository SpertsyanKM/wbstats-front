import React, {useCallback} from 'react';
import Button, {ButtonSize, ButtonType} from '../common/button';
import {useNavigate} from 'react-router';
import {ROUTE_FINANCES, ROUTE_GOODS, ROUTE_HOME} from '../../utils/route';

const NavigationButtons: React.FC = () => {
  const navigate = useNavigate();
  
  const navigateTo = useCallback((link: string) => {
    navigate(link);
  }, [navigate]);

  return (
    <>
      <Button buttonType={ButtonType.Tertiary} size={ButtonSize.L} label="Главная" onClick={() => navigateTo(ROUTE_HOME)} />
      <Button buttonType={ButtonType.Tertiary} size={ButtonSize.L} label="Товары" onClick={() => navigateTo(ROUTE_GOODS)} />
      <Button buttonType={ButtonType.Tertiary} size={ButtonSize.L} label="Финансы" onClick={() => navigateTo(ROUTE_FINANCES)} />
    </>
  );
}

export default NavigationButtons;
