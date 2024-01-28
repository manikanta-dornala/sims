import * as NumericInput from 'react-numeric-input';
import { createRoot } from 'react-dom/client';

import Select from 'react-select';
import Simulation from './simulation';
import P5 from 'p5';
import { Component } from 'react';
import { sketch } from './sktech';
import React from 'react';

class P5Component extends React.Component<{ simulation: Simulation }> {
    sketch: any;
    ref: any;
    p5ref;
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.sketch = sketch(props.simulation);
    }

    componentDidMount() {
        this.p5ref = new P5(this.sketch, this.ref.current);
    }
    render() {
        return <div ref={this.ref}></div>;
    }
}

class AppComponent extends React.Component<{}, {}> {
    simulation: Simulation;
    Sketch: any;
    minPathStr: any;
    constructor(props) {
        super(props);
        this.simulation = new Simulation(props);
        this.simulation.setAlgorithm('');
        this.Sketch = sketch(this.simulation);
    }
    render(): React.ReactNode {
        return (
            <div className="container-fluid">
                <br />
                <div className="row">
                    <div className="col-md-4">
                        <Select
                            defaultValue={this.simulation.algorithmOptions[0]}
                            options={this.simulation.algorithmOptions}
                            onChange={(x) => {
                                this.simulation.setAlgorithm(x.value);
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <button
                            className="btn btn-primary"
                            onClick={(x) => {
                                this.simulation.randomize();
                            }}
                        >
                            randomize
                        </button>
                    </div>
                    <div className="col-md-2">
                        <button
                            className="btn btn-success"
                            onClick={(x) => {
                                this.simulation.isActive =
                                    !this.simulation.isActive;
                            }}
                            disabled={this.simulation.isActive}
                        >
                            start/stop
                        </button>
                    </div>
                </div>
                <div className="row"></div>
                <div className="row">
                    <div className="col-md-12">
                        <P5Component simulation={this.simulation} />
                    </div>
                </div>
            </div>
        );
    }
}
createRoot(document.getElementById('app')).render(<AppComponent />);
