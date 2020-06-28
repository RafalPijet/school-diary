import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {useLocation} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        height: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.light
    },
    button: {
        width: '100%'
    },
    selected: {
        color: theme.palette.secondary.main
    }
}));

const MainMenu = props => {
    const {links} = props;
    const classes = useStyles();
    const [value, setValue] = useState('/');
    let path = useLocation().pathname;

    useEffect(() => {

        console.log(path)
    }, [value]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                            className={clsx(classes.button,classes.selected)}
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
