import {ApiErrorCode} from './apiErrorCode';
import {ApiError} from './index';
import {BrowserHistory} from 'history';
import {ROUTE_AUTH} from '../../route';

let history: BrowserHistory | undefined = undefined;

type Initializer = (history: BrowserHistory) => void;
const init: Initializer = h => {
  history = h;
};

const ApiErrorExplanation: Record<number, string> = {
  [ApiErrorCode.INTERNAL]: "Произошла внутренняя серверная ошибка",
  [ApiErrorCode.ILLEGAL_ARGUMENT]: "Что-то не так с передаваемыми данными",
  [ApiErrorCode.STORAGE_EXCEPTION]: "Произошла ошибка хранилища данных",
  [ApiErrorCode.STORAGE_FILE_NOT_FOUND]: "Файл не найден",
  [ApiErrorCode.IMAGE_ALREADY_LINKED]: "Изображение уже используется",
  [ApiErrorCode.EMAIL_IS_ALREADY_USED]: "Введённый адрес электронной почты уже используется",
  [ApiErrorCode.SHOP_NAME_IS_ALREADY_USED]: "У вас уже зарегистрирован магазин с таким именем",
  [ApiErrorCode.CLIENT_ALREADY_CREATED]: "Клиент с таким идентификатором уже зарегистрирован",
  [ApiErrorCode.USER_NOT_FOUND]: "Пользователь с указанным адресом электронной почты не найден",
  [ApiErrorCode.CLIENT_NOT_FOUND]: "Клиент с данным идентификатором не найден",
  [ApiErrorCode.ACCESS_DENIED]: "Нет доступа",
  [ApiErrorCode.UNACCEPTABLE_EMAIL]: "Недопустимый адрес электронной почты",
  [ApiErrorCode.NO_SHOP_REGISTERED]: "Отсутствует зарегистрированный магазин",
};

type ApiErrorToMessageConverter = (error: ApiError) => string;
const convertApiErrorToMessage: ApiErrorToMessageConverter = error => {
  return ApiErrorExplanation[error.code] ?? "Неизвестная ошибка";
};

type HandleApiError = (error: Error) => string;
const handleApiError: HandleApiError = error => {
  if (!(error instanceof ApiError)) {
    return "Произошла неизвестная ошибка"
  }
  if ([ApiErrorCode.TOKEN_EXPIRED, ApiErrorCode.TOKEN_NOT_FOUND].includes(error.code)) {
    history?.push(ROUTE_AUTH);
    return "";
  }

  return convertApiErrorToMessage(error);
};


export const ApiErrorHandler = {
  init,
  convertApiErrorToMessage,
  handleApiError,
};
