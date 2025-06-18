import api from '../core/api';
import { withTryCatch } from '../core/withTryCatch';
import { AxiosResponse } from 'axios';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  code: string;
  name: string;
  native_name: string;
}

export interface Translation {
  key: string;
  value: string;
  language_code: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

type ApiResult<T> = Promise<[AxiosResponse<ApiResponse<T>> | null, any]>;

export const currencyService = {
  getSupportedCurrencies: (): ApiResult<Currency[]> => 
    withTryCatch(() => api.get<ApiResponse<Currency[]>>('/get-supported-currencies'))(),

  getSupportedLanguages: (): ApiResult<Language[]> => 
    withTryCatch(() => api.get<ApiResponse<Language[]>>('/supported-lang'))(),

  setUserCurrency: (currencyCode: string, user_id: number): ApiResult<void> => 
    withTryCatch(() => api.post<ApiResponse<void>>('/set-user-currency', { currency: currencyCode, user_id }))(),

  setUserLanguage: (languageCode: string, user_id: number): ApiResult<void> => 
    withTryCatch(() => api.post<ApiResponse<void>>('/set-user-default-supported-lang', { language_code: languageCode, user_id }))(),

  getTranslations: (languageCode: string): ApiResult<Translation[]> => 
    withTryCatch(() => api.get<ApiResponse<Translation[]>>('/translations', {
      params: { language_code: languageCode }
    }))()
}; 