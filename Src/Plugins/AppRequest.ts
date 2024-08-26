import { Manager } from '@/Libs/Manager';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Axios请求
 */
class AppRequest extends Manager {
    constructor() {
        super();
        this.CreatRequest();
    }
    private request!: AxiosInstance;

    public get R() {
        return this.request;
    }

    private static isLogSuccess = false;

    private static outCode = 401;

    private isOut = false;

    private CreatRequest() {
        this.request = axios.create({
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.SetRequest();
        this.SetResponse();
    }

    private SetRequest() {
        this.R.interceptors.request.use(
            (config: any) => {
                if (config && config.headers) {
                    config.headers['x-auth-token'] = this.GetAuthToken();
                    config.baseURL = import.meta.env.VITE_APP_SERVER_PORT;
                    return config;
                }
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    private SetResponse() {
        this.R.interceptors.response.use(
            (response) => {
                if (AppRequest.isLogSuccess) {
                    console.warn('URL: ' + response.config.baseURL + response.config.url, '\nData: ', response.data, '\nResponse:', response);
                }
                if (response.data.code && response.data.code !== 0) {
                    console.error(response.data.message);
                }
                return response;
            },
            (err) => {
                if (err.response?.status === AppRequest.outCode) {
                    if (!this.isOut) {
                        this.ResetAccount();
                        console.error('登录凭证过期');
                        this.isOut = true;
                    }
                }
                return Promise.reject(err);
            }
        );
    }

    private ResetAccount() {
        this.SetAuthToken('');
        this.SetUserName('');
    }

    public GetAuthToken() {
        return localStorage.getItem('ORIGINTOKEN') || '';
    }

    public SetAuthToken(token: string) {
        localStorage.setItem('ORIGINTOKEN', token);
    }

    public GetUserName() {
        return localStorage.getItem('ORIGINUSERNAME') || '';
    }

    public SetUserName(name: string) {
        localStorage.setItem('ORIGINUSERNAME', name);
    }

    public SetRemember(e: boolean) {
        localStorage.setItem('ORIGINREMEMBER', e ? '1' : '0');
    }

    public GetRemember() {
        const r = localStorage.getItem('ORIGINREMEMBER');
        return !r || r === '1';
    }

    public Get(url: string, config?: AxiosRequestConfig) {
        if (this.R) {
            return this.R.get(url, config);
        }
    }

    public Post(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig) {
        if (this.R) {
            return this.R.post(url, data, config);
        }
    }
}

const AppRequestInstance = new AppRequest();

export { AppRequestInstance as AppRequest };
