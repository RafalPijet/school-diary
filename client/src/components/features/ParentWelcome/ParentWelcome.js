import React from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import componentStyle from "./ParentWelcomeStyle";
import ratings from '../../../images/ratings.jpg';
import parent from '../../../images/parent.png';
import teachers from '../../../images/teachers.png';
import ButtonImage from "../../common/ButtonImage/ButtonImage";

const useStyles = makeStyles(theme => componentStyle(theme));

const ParentWelcome = props => {
    const classes = useStyles();
    return (
        <Paper variant='outlined' className={classes.root}>
            <ButtonImage
                image={ratings}
                title='Ratings'
                bottom={200}
                width={400}
                height={280}
            />
            <ButtonImage
                image={parent}
                title='Parent Data'
                left={140}
                top={20}
                width={350}
                height={230}
            />
            <ButtonImage
                image={teachers}
                title='Teachers'
                right={180}
                bottom={30}
                width={320}
                height={200}
            />
        </Paper>
    )
};

export default ParentWelcome;
