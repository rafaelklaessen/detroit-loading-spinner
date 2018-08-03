import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Spinner from '../../src'
import './demo.css';

const Demo = () => (
  <Fragment>
    <section className="demo-panel dark-demo">
      <div className="wrapper">
        <Spinner size={300} color="#2196F3" />
      </div>
    </section>
    <section className="demo-panel light-demo">
      <div className="wrapper">
        <Spinner size={300} />
      </div>
    </section>
  </Fragment>
);

ReactDOM.render(<Demo />, document.querySelector('#demo'))
