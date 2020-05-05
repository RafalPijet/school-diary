import React, {useState} from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from "@material-ui/core/Typography";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import NavClassPanel from "../NavClassPanel/NavClassPanelContainer";
import {style} from "../../../styles/global";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: 'auto',
    },
    paper: {
        width: 434,
        height: 270,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    description: {
        padding: style.smallSize
    }
}));

const not = (a, b) => {
    return a.filter(value => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
    return a.filter(value => b.indexOf(value) !== -1);
};

const ClassContent = props => {
    const {classItem, allStudents, request, resetRequest, teachers, possibleTutors} = props;
    const [checked, setChecked] = useState([]);
    const [leftList, setLeftList] = useState(classItem.students);
    const [rightList, setRightList] = useState(teachers);
    const [leftDesc, setLeftDesc] = useState('students');
    const [rightDesc, setRightDesc] = useState('class teachers');
    const [isVisible, setIsVisible] = useState(false);
    const classes = useStyles();

    const leftChecked = intersection(checked, leftList);
    const rightChecked = intersection(checked, rightList);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleCheckedRight = () => {
        setRightList(rightList.concat(leftChecked));
        setLeftList(not(leftList, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeftList(leftList.concat(rightChecked));
        setRightList(not(rightList, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (items, isStudent) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value, i) => {
                    const labelId = `transfer-list-item-${value}-label`;
                    const {id, lastName, firstName, birthDate, subject} = value;
                    return (
                        <ListItem key={id} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemText
                                id={labelId}
                                primary={`${i + 1}. ${lastName} ${firstName} ${isStudent ? birthDate.substring(0, 10) : subject}`}
                            />
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>
                {customList(leftList, true)}
                <Typography className={classes.description} variant='subtitle2'>
                    {`${leftDesc}: ${leftList.length}`}
                </Typography>
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        hidden={isVisible}
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        hidden={isVisible}
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                {customList(rightList, false)}
                <Typography className={classes.description} variant='subtitle2'>
                    {`${rightDesc}: ${rightList.length}`}
                </Typography>
            </Grid>
            <NavClassPanel tutor={classItem.mainTeacher} possibleTutors={possibleTutors}/>
        </Grid>
    )
};

ClassContent.propTypes = {
    classItem: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    teachers: PropTypes.array.isRequired,
    resetRequest: PropTypes.func.isRequired,
    allStudents: PropTypes.array.isRequired,
    possibleTutors: PropTypes.array.isRequired
};

export default ClassContent
