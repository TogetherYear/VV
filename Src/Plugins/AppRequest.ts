import { TRouter } from '@/Decorators/TRouter';
import { TTool } from '@/Decorators/TTool';
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
                    config.headers['x-auth-token'] = '';
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
                if (response.data.code && response.data.code !== 0) {
                    console.error('AppRequest:', response.data);
                    if (response.data.code === AppRequest.outCode) {
                        if (!this.isOut) {
                            this.ResetAccount();
                            console.error('登录凭证过期');
                            this.isOut = true;
                        }
                        return Promise.reject(response);
                    }
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

    private ResetAccount() {}

    @TTool.Retry(10, 1000, (e) => e.data?.code === 0 || e.data?.code === 401 || e.message === 'canceled')
    public Get(url: string, config?: Omit<AxiosRequestConfig, 'signal'>) {
        const ac = new AbortController();
        const request = this.R.get(url, { ...config, signal: ac.signal });
        TRouter.requestAbort.push(ac);
        return request;
    }

    @TTool.Retry(10, 1000, (e) => e.data?.code === 0 || e.data?.code === 401 || e?.message === 'canceled')
    public Post(url: string, data?: Record<string, unknown>, config?: Omit<AxiosRequestConfig, 'signal'>) {
        const ac = new AbortController();
        const request = this.R.post(url, data, { ...config, signal: ac.signal });
        TRouter.requestAbort.push(ac);
        return request;
    }

    @TTool.Retry(10, 1000, (e) => e.data?.code === 0 || e.data?.code === 401 || e?.message === 'canceled')
    public Delete(url: string, config?: Omit<AxiosRequestConfig, 'signal'>) {
        const ac = new AbortController();
        const request = this.R.delete(url, { ...config, signal: ac.signal });
        TRouter.requestAbort.push(ac);
        return request;
    }

    @TTool.Retry(10, 1000, (e) => e.data?.code === 0 || e.data?.code === 401 || e?.message === 'canceled')
    public Put(url: string, data?: Record<string, unknown>, config?: Omit<AxiosRequestConfig, 'signal'>) {
        const ac = new AbortController();
        const request = this.R.put(url, data, { ...config, signal: ac.signal });
        TRouter.requestAbort.push(ac);
        return request;
    }
}

const AppRequestInstance = new AppRequest();

export { AppRequestInstance as AppRequest };
