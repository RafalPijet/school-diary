import React from 'react';
import {Animated} from "react-animated-css";
import PropTypes from 'prop-types';
import {FaMeh, FaGrinAlt, FaGrimace, FaFlushed, FaInfoCircle} from "react-icons/fa";
import {IconContext} from "react-icons";
import './Alert.scss';

const Alert = ({variant = '', children, isVisible, ...otherProps}) => {

    const icon = () => {
        switch (variant) {
            case 'info':
                return <FaInfoCircle/>
            case 'success':
                return <FaGrinAlt/>
            case 'error':
                return <FaGrimace/>
            case 'warning':
                return <FaFlushed/>
            default:
                return <FaMeh/>
        }
    };

    return (
        <Animated className='alert-container' animationIn='bounceIn' animationOut='fadeOut' isVisible={isVisible}>
            <div className={`alert-main alert-main--${variant}`} {...otherProps}>
                <IconContext.Provider value={{size: '2em'}}>
                    <div>
                        {icon()}
                    </div>
                </IconContext.Provider>
                <span>{children}</span>
            </div>
        </Animated>
    )
};

Alert.propTypes = {
    variant: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
};

export default Alert;
