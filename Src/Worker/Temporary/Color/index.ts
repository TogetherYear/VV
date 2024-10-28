import { Run, Finish } from '../index';

Run((data) => {
    setTimeout(() => {
        Finish({
            result: '#ffffff'
        });
    }, 2000);
});
