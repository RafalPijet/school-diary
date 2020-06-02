import React from 'react';
import {Spinner as SpinnerStrap} from 'reactstrap';
import './Spinner.scss';

const Spinner = ({...otherProps}) => (
    <div className='spinner-main' {...otherProps}>
        <SpinnerStrap size='sm' color='info'/>
        <SpinnerStrap style={{margin: '0 20px'}} size='sm' color='info'/>
        <SpinnerStrap size='sm' color='info'/>
    </div>
);

export default Spinner
