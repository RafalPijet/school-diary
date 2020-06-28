import React from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import componentStyle from "./ParentWelcomeStyle";
import ButtonImage from "../../common/ButtonImage/ButtonImage";
import FooterInfo from "../../common/FooterInfo/FooterInfo";

const useStyles = makeStyles(theme => componentStyle(theme));

const ParentWelcome = props => {
    const {buttons, description} = props;
    const classes = useStyles();

    return (
        <Paper variant='outlined' className={classes.root}>
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
            <FooterInfo description={description} delay={1000} duration={5000}/>
        </Paper>
    )
};

ParentWelcome.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        right: PropTypes.number,
        left: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    })),
    description: PropTypes.array.isRequired
};

export default ParentWelcome;
