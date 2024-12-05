import { Manager } from '../Libs/Manager';
import { T } from '@/Instructions/T';

class LocalStore extends Manager {
    public SetLocal(key: keyof T.LocalStore.LocalStoreKey, value: string) {
        localStorage.setItem(`VV_${key}`, value);
    }

    public GetLocal(key: keyof T.LocalStore.LocalStoreKey) {
        return localStorage.getItem(`VV_${key}`) || '';
    }
}

const LocalStoreInstance = new LocalStore();

export { LocalStoreInstance as LocalStore };
