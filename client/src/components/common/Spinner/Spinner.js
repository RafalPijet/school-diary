import React from 'react';
import {Spinner as SpinnerStrap} from 'reactstrap';
import './Spinner.scss';

const Spinner = ({...otherProps}) => (
    <div className='spinner-main' {...otherProps}>
        <SpinnerStrap size='sm' color='secondary'/>
        <SpinnerStrap style={{margin: '0 20px'}} size='sm' color='secondary'/>
        <SpinnerStrap size='sm' color='secondary'/>
    </div>
);

export default Spinner
