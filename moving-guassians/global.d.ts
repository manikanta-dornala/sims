import Params from './params';
import Simulation from './simulation';
interface Window {
    params: Params;
    simulation: Simulation;
}
declare var window: Window;
