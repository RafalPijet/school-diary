import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
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
        backgroundColor: theme.palette.secondary.light,
    },
    button: {
        width: '100%',
        '&$selected': {
            color: theme.palette.secondary.main
        }
    },
    selected: {
        color: theme.palette.secondary.main
    }
}));

const MainMenu = props => {
    const {links, setPath, path} = props;
    const classes = useStyles();
    const [value, setValue] = useState('/');

    useEffect(() => {

        if (path !== value) {
            setValue(path);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    const handleChange = (event, newValue) => {
        setPath(newValue);
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
                            classes={{selected: classes.selected}}
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
    })),
    path: PropTypes.string.isRequired,
    setPath: PropTypes.func.isRequired
};

export default MainMenu;
