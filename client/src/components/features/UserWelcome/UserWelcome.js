import React from "react";
import PropTypes from 'prop-types';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import componentStyle from "./UserWelcomeStyle";
import ButtonImage from "../../common/ButtonImage/ButtonImageContainer";
import FooterInfo from "../../common/FooterInfo/FooterInfo";

const useStyles = makeStyles(theme => componentStyle(theme));

const UserWelcome = props => {
    const {buttons, description, userType, delay, duration} = props;
    const classes = useStyles();

    const setBackground = user => {
        switch (user) {
            case 'parent':
                return classes.parent;
            case 'teacher':
                return classes.teacher;
            case 'principal':
                return classes.principal;
            default:
                return ''
        }
    };

    return (
        <Paper variant='outlined' className={clsx(classes.root, setBackground(userType))}>
            <div className={classes.content}>
                {buttons.map((item, i) => {
                    return <ButtonImage
                        key={i}
                        image={item.image}
                        title={item.title}
                        top={item.top}
                        bottom={item.bottom}
                        left={item.left}
                        right={item.right}
                        width={item.width}
                        height={item.height}
                        path={item.path}
                    />
                })}
            </div>
            <FooterInfo description={description} delay={delay} duration={duration}/>
        </Paper>
    )
};

UserWelcome.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        right: PropTypes.number,
        left: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    })).isRequired,
    description: PropTypes.array.isRequired,
    userType: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
};

export default UserWelcome;
