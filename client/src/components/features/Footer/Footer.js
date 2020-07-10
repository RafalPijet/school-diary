import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import FooterInfo from "../../common/FooterInfo/FooterInfo";
import HelpIcon from '@material-ui/icons/Help';
import {Link, Paper, Typography, Fade, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {
    welcomeDescription,
    teacherDescription,
    parentDescription,
    principalDescription
} from "../../../utilities/functions";
import componentStyle from "./FooterStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const Footer = props => {
    const {isLogin, path, userStatus} = props;
    const [isContentChanging, setIsContentChanging] = useState(false);
    const [infoContent, setInfoContent] = useState(welcomeDescription.home);
    const [isShow, setIsShow] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        setIsContentChanging(true);

        if (isLogin) {

            if (userStatus === 'teacher') {
                switch (path) {
                    case '/diaries':
                        setInfoContent(teacherDescription.diaries);
                        break;
                    case '/data':
                        setInfoContent(teacherDescription.data);
                        break;
                    default:
                        setInfoContent(teacherDescription.home);
                }
            } else if (userStatus === 'parent') {
                switch (path) {
                    case '/grades':
                        setInfoContent(parentDescription.grades);
                        break;
                    case '/data':
                        setInfoContent(parentDescription.data);
                        break;
                    case '/teachers':
                        setInfoContent(parentDescription.teachers);
                        break;
                    default:
                        setInfoContent(parentDescription.home);
                }
            } else if (userStatus === 'principal') {
                switch (path) {
                    case '/classes':
                        setInfoContent(principalDescription.classes);
                        break;
                    case '/teachers':
                        setInfoContent(principalDescription.teachers);
                        break;
                    case '/students':
                        setInfoContent(principalDescription.students);
                        break;
                    case '/parents':
                        setInfoContent(principalDescription.parents);
                        break;
                    default:
                        setInfoContent(principalDescription.home);
                }
            }
        } else {
            switch (path) {
                case '/login':
                    setInfoContent(welcomeDescription.login);
                    break;
                case '/registration':
                    setInfoContent(welcomeDescription.registration);
                    break;
                default:
                    setInfoContent(welcomeDescription.home);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin, path]);

    const switchHandling = () => {
        setIsShow(!isShow);
    };

    const changeHandling = isChange => {
        setIsContentChanging(!isChange);
    };

    return (
        <Paper elevation={9} className={classes.root}>
            <div className={classes.authorBox}>
                <Typography
                    className={classes.author}
                    variant='subtitle2'>
                    2020 © <Link className={classes.author} href='mailto:rafal.pijet@gmail.com'>Rafal Pijet</Link>
                </Typography>
            </div>
            <FooterInfo
                isWorking={isShow}
                description={infoContent}
                delay={1}
                duration={8}
                isContentChanging={isContentChanging}
                changeHandling={changeHandling}
            />
            <div>
                <HelpIcon className={classes.icon}/>
                <Tooltip
                    title={isShow ? 'off Tips' : 'on Tips'}
                    placement='bottom'
                    arrow
                    TransitionComponent={Fade}
                    enterDelay={2000}
                >
                    <span>
                        <Switch
                            size='small'
                            name='changeTips'
                            checked={isShow}
                            onChange={switchHandling}
                        />
                    </span>
                </Tooltip>
            </div>
        </Paper>
    )
};

Footer.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    userStatus: PropTypes.string
};

export default Footer;
