import Simulation from './simulation';
import { sketch } from './sktech';
import P5 from 'p5';

const simulation = new Simulation();
new P5(sketch(simulation));
