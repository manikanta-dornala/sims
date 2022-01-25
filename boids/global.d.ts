import Params from './params';
import Simulation from './simulation';

declare global {
    interface Window {
        params: Params;
        simulation: Simulation;
    }
}
