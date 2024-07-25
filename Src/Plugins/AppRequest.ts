
import { EventSystem } from "@/Libs/EventSystem";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Debug } from "./Debug";
import { Preload } from "@/Preload/Preload";

/**
 * Axios请求
 */
class AppRequest extends EventSystem {
    private request!: AxiosInstance

    public get R() { return this.request }

    private static isLogSuccess = false

    private static outCode = 401

    private isOut = false

    public Run() {
        this.CreatRequest()
    }

    private CreatRequest() {
        this.request = axios.create({
            headers: {
                'Content-Type': 'application/json',
            },
        })
        this.SetRequest()
        this.SetResponse()
    }

    private SetRequest() {
        this.R.interceptors.request.use(
            (config: any) => {
                if (config && config.headers) {
                    config.headers['x-auth-token'] = this.GetAuthToken()
                    config.baseURL = import.meta.env.VITE_APP_SERVER_PORT
                    return config
                }

            },
            error => {
                return Promise.reject(error)
            },
        )
    }

    private SetResponse() {
        this.R.interceptors.response.use(
            response => {
                if (AppRequest.isLogSuccess) {
                    Debug.Warn('URL: ' + response.config.baseURL + response.config.url, '\nData: ', response.data, '\nResponse:', response)
                }
                if (response.data.code && response.data.code !== 0) {
                    Debug.Error(response.data.message)
                    Preload.message.error(response.data.message)
                }
                return response
            },
            err => {
                if (err.response?.status == AppRequest.outCode) {
                    if (!this.isOut) {
                        Preload.dialog.destroyAll()
                        Preload.dialog.error({
                            title: 'Token过期',
                            content: '请重新登录更新Token',
                            positiveText: '确定',
                            closable: false,
                            maskClosable: false,
                            onPositiveClick: () => {
                                this.ResetAccount()
                                Preload.message.error('登录凭证过期')
                            }
                        })
                        this.isOut = true
                    }

                }
                return Promise.reject(err)
            },
        )
    }

    private ResetAccount() {
        this.SetAuthToken('')
        this.SetUserName('')
    }

    public GetAuthToken() {
        return localStorage.getItem('ORIGINTOKEN') || ''
    }

    public SetAuthToken(token: string) {
        localStorage.setItem('ORIGINTOKEN', token)
    }

    public GetUserName() {
        return localStorage.getItem('ORIGINUSERNAME') || ''
    }

    public SetUserName(name: string) {
        localStorage.setItem('ORIGINUSERNAME', name)
    }

    public SetRemember(e: boolean) {
        localStorage.setItem('ORIGINREMEMBER', e ? '1' : '0')
    }

    public GetRemember() {
        const r = localStorage.getItem('ORIGINREMEMBER')
        return !r || r == '1'
    }

    public Get(url: string, config?: AxiosRequestConfig) {
        if (this.R) {
            return this.R.get(url, config)
        }
    }

    public Post(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig) {
        if (this.R) {
            return this.R.post(url, data, config)
        }
    }
}

const AppRequestInstance = new AppRequest()

export { AppRequestInstance as AppRequest }
