import { AppRequest } from '@/Plugins/AppRequest';

const ToLogin = (data: Record<string, any>) => {
    return AppRequest.Post('/system/auth/login', data);
};

export { ToLogin };
