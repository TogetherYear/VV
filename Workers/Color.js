import { Run, Finish } from './Default.js';

Run((data) => {
    console.error('From:', data);
    Finish({
        result: '#ffffff'
    });
});
