import { Run, Finish } from './Default';

Run((data) => {
    console.error('From:', data);
    setTimeout(() => {
        Finish({
            result: '#ffffff'
        });
    }, 2000);
});
