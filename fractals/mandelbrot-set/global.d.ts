import Params from './params';

declare global {
    interface Window {
        params: Params;
    }
}
