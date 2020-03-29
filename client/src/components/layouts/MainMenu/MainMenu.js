import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import './MainMenu.scss';

// const MainMenu = ({links, location}) => (
//     <ul className='main-menu'>
//         {links.map((link, index) => (
//             <li key={index}>
//                 <Link className={(location.pathname === link.path && 'active') || ''} to={link.path}>{link.title}</Link>
//             </li>
//         ))}
//     </ul>
// );

const useStyles = makeStyles({
    root: {
        width: 700,
        height: 100,
        display: 'flex',
        justifyContent: 'flex-end'
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

// export default withRouter(props =>  <MainMenu {...props}/>);
export default MainMenu;
