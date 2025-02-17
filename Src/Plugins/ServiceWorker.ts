import { Manager } from '@/Libs/Manager';
import { TEvent } from '@/Decorators/TEvent';

class ServiceWorker extends Manager {
    constructor() {
        super();
    }

    private worker!: ServiceWorkerRegistration;

    @TEvent.Listen(window, 'load')
    private CreateServiceWorker() {
        navigator.serviceWorker
            .register('./ServiceWorker.js')
            .then((registration) => {
                this.worker = registration;
                console.log('Service Worker registered with scope:', registration.scope);
                fetch('https://www.proxyfox.xyz/test/get', { method: 'GET' });
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    }
}

const ServiceWorkerInstance = new ServiceWorker();

export { ServiceWorkerInstance as ServiceWorker };
