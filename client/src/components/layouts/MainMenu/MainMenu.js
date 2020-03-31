import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Redirect} from 'react-router-dom';
import './MainMenu.scss';

const useStyles = makeStyles({
    root: {
        height: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '100%'
    }
});

const MainMenu = props => {
    const {links} = props;
    const classes = useStyles();
    const [value, setValue] = useState('/');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    };

    return (
        <>
            <BottomNavigation
                value={value}
                onChange={handleChange}
                showLabels
                className={classes.root}
            >
                {
                    links.map((item, i) => {
                        return <BottomNavigationAction
                            key={i}
                            label={item.title}
                            value={item.path}
                            icon={item.icon}
                            className={classes.button}
                        />
                    })
                }
            </BottomNavigation>
            <Redirect to={value}/>
        </>
    )
};

MainMenu.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string,
        title: PropTypes.string,
        icon: PropTypes.node
    }))
};

export default MainMenu;
