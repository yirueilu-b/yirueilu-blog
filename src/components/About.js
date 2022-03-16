import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import ScrollToTopOnMount from './Layout/ScrollTopOnMount'
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import ProjectImage1 from "../images/catSegmentation.png"
import Button from '@material-ui/core/Button';
import {Link} from "gatsby";

import darkBg from "../images/dark_bg.jpg"
import lightBg from "../images/light_bg.jpeg"

import LINELogo from "../images/LINE.png"
import IIILogo from "../images/III.png"
import sinicaLogo from "../images/sinica.png"

import NTUTLogo from "../images/NTUTLogo.png"
import NCTULogo from "../images/NCTULogo.png"

const section_padding_small = '5vh 10vw';
const section_padding = '26vw';
const section_divider = '1px';
const useStyles = theme => ({
    root: {
        display: 'flex',
        padding: 0,
        maxWidth: '100vw',
    },
    content: {
        // [theme.breakpoints.up('sm')]: {
        //     paddingLeft: '10vw',
        //     paddingRight: '10vw',
        // },
    },
    profile: {
        padding: section_padding_small,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: section_padding,
            paddingRight: section_padding,
        },
        // borderBottom: `${section_divider} solid ${theme.palette.divider}`,
        backgroundImage: theme.palette.type === 'dark' ?
            `url(${darkBg})`:
            `url(${lightBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    experience: {
        padding: section_padding_small,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: section_padding,
            paddingRight: section_padding,
        },
        // borderBottom: `${section_divider} solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper
    },
    project: {
        padding: section_padding_small,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: section_padding,
            paddingRight: section_padding,
        },
    }
});

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }


    render() {
        const {classes} = this.props;

        return (
            <Container className={classes.root}>
                <ScrollToTopOnMount/>
                <Grid
                    className={classes.content}
                    container
                    spacing={0}
                    direction="row"
                    alignItems="flex-start"
                    justify="center"
                >
                    <Grid className={classes.profile} container item xs={12} justify="flex-start">
                        <Profile/>
                    </Grid>
                    <Grid className={classes.experience} container item xs={12} justify="flex-start">
                        <Experience/>
                    </Grid>
                    <Grid className={classes.project} container item xs={12} justify="flex-start">
                        <Project/>
                    </Grid>
                </Grid>

            </Container>
        );
    }
}

const profileStyle = makeStyles((theme) => ({
    root: {
        // marginTop: 24,
        marginBottom: 48,
        '& * h5': {
            fontWeight: 500,
        }
    },
    left: {
        // height: '100%',
        textAlign: 'center',
    },
    right: {
        // height: '100%',
        textAlign: 'left',
    },
    right1: {},
    right2: {
        marginTop: 24,
    },
    avatar: {
        margin: theme.spacing(5),
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));

function Profile(props) {
    const classes = profileStyle();

    return (
        <Fade in={true} timeout={3000}>
            <Grid
                className={classes.root}
                container
                spacing={0}
                alignItems="center"
                justify="center"
            >
                <Grid className={classes.left} container item xs={12} md={4} justify="center" alignItems="center">
                    {/*<Avatar className={classes.avatar} alt="Yi-Ruei, Lu" src={process.env.PUBLIC_URL + '/code.ico'}/>*/}
                    <Avatar className={classes.avatar}/>
                </Grid>
                <Grid className={classes.right} container item xs={12} md={8} justify="flex-start">
                    <Grid container item xs={12} justify="flex-start" alignItems="flex-start">
                        <Typography gutterBottom variant='h5'>About Me</Typography>
                        <Typography gutterBottom variant='subtitle1'>Software engineer with 3 years of experience in implementing and applying deep learning models in real-world environment. Interested in learning new technologies especially about AI and Web. Passionate about creating fun and useful things and solving problems.</Typography>
                        <Button component={Link}
                                size="small"
                                variant="outlined"
                                to={"https://www.cakeresume.com/ray-lu-1f08fc"}
                                target="_blank"
                                style={{padding: '12px 15px', marginTop: '10px', textTransform: 'none'}}
                                >
                            <Typography gutterBottom variant='subtitle1'>Checkout my resume</Typography>
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </Fade>
    );
}

const experienceStyles = makeStyles((theme) => ({
    root: {
        // wordBreak: 'break-word',
        marginBottom: 48,
        '& * h4, & * h5': {
            fontWeight: 500,
        }
    },
    title: {
        borderBottom: `${section_divider} solid ${theme.palette.divider}`,
        marginTop: 48,
        textAlign: 'left',
    },
    detail: {
        marginTop: 24,
        textAlign: 'left',
        '& * h4, & * h5': {
            fontWeight: 500,
        }
    },
    logo: {
        marginTop: 24,
    },
    avatarLogo: {
        backgroundColor: theme.palette.type === 'dark' ?
            'rgba(250, 250, 250, 0.87)' :
            'rgba(187, 187, 187,0.87)',
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginTop: 24,
    }
}));

function Experience() {
    const classes = experienceStyles();

    return (
        <Fade in={true} timeout={3000}>
            <Grid
                className={classes.root}
                container
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
            >
                <Grid className={classes.title} container item xs={12} justify="flex-start"
                      alignItems="flex-start">
                    <Typography gutterBottom variant='h4'>Work Experience</Typography>
                </Grid>

                <Grid container item xs={12} justify="flex-start" alignItems="flex-start">

                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Grid className={classes.logo} container item xs={12} md={3} justify="center">
                            <Avatar className={classes.avatarLogo}
                                    alt="Institute of Information Science, Academia Sinica"
                                    src={LINELogo}/>
                        </Grid>
                        <Grid className={classes.detail} item xs={12} md={9}>
                            <Typography display='block' gutterBottom variant='h5'>
                                LINE
                            </Typography>
                            <Typography gutterBottom variant='subtitle1'>
                                Software Engineer, 10/2021 - PRESENT
                            </Typography>
                            <Typography display='block' gutterBottom variant='body1'>
                                Integrate LINE AI product (CLOVA) with LINE services.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Grid className={classes.logo} container item xs={12} md={3} justify="center">
                            <Avatar className={classes.avatarLogo}
                                    alt="Institute for Information Industry"
                                    src={IIILogo}/>
                        </Grid>
                        <Grid className={classes.detail} item xs={12} md={9}>
                            <Typography gutterBottom variant='h5'>
                                Institute for Information Industry
                            </Typography>
                            <Typography gutterBottom variant='subtitle1'>
                                Software Engineer, 09/2018 - 10/2021
                            </Typography>
                            <Typography gutterBottom variant='body1'>
                                As a software engineer in Institute for Information Industry,
                                my job is to research and implement the latest and the state of the art Machine Learning
                                algorithms
                                and optimize them to make them possible applying in real world environment.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Grid className={classes.logo} container item xs={12} md={3} justify="center">
                            <Avatar className={classes.avatarLogo}
                                    alt="Institute of Information Science, Academia Sinica"
                                    src={sinicaLogo}/>
                        </Grid>
                        <Grid className={classes.detail} item xs={12} md={9}>
                            <Typography display='block' gutterBottom variant='h5'>
                                Institute of Information Science, Academia Sinica
                            </Typography>
                            <Typography gutterBottom variant='subtitle1'>
                                Intern, 06/2016 - 09/2016
                            </Typography>
                            <Typography display='block' gutterBottom variant='body1'>
                                During the internship, I studied the research papers about Air Quality Index ( AQI )
                                inference system,
                                tried to increase performance of the regression model and visualize the result using
                                javascript.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid className={classes.title} container item xs={12} md={12} justify="flex-start"
                      alignItems="flex-start">
                    {/*<Avatar className={classes.avatar} alt="Yi-Ruei, Lu" src={process.env.PUBLIC_URL + '/code.ico'}/>*/}
                    <Typography gutterBottom variant='h4'>Education</Typography>
                </Grid>

                <Grid container item xs={12} md={12} justify="flex-start">
                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Grid className={classes.logo} container item xs={12} md={3} justify="center">
                            <Avatar className={classes.avatarLogo}
                                    alt="NCTU"
                                    src={NCTULogo}/>
                        </Grid>
                        <Grid className={classes.detail} item xs={12} md={9}>
                            <Typography gutterBottom variant='h5'>
                                National Chiao Tung University
                            </Typography>
                            <Typography gutterBottom variant='subtitle1'>
                                MS, Computer Science, 09/2015 - 06/2018
                            </Typography>
                            <Typography gutterBottom variant='body1'>
                                Focused on Machine Learning, research the stock price prediction using Deep Learning.
                                My thesis is Stock Price Prediction Using Deep Learning and Sentiment Analysis.
                                This paper studied the correlation between posts on forum and the prediction result
                                using LSTM.
                                The result shows that the plenty text information on the internet
                                could increase the accuracy of stock price prediction.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Grid className={classes.logo} container item xs={12} md={3} justify="center">
                            <Avatar className={classes.avatarLogo}
                                    alt="NTUT"
                                    src={NTUTLogo}/>
                        </Grid>
                        <Grid className={classes.detail} item xs={12} md={9}>
                            <Typography gutterBottom variant='h5'>
                                National Taipei University of Technology
                            </Typography>
                            <Typography gutterBottom variant='subtitle1'>
                                BS, Electrical Engineering, 04/2011 - 07/2015
                            </Typography>
                            <Typography gutterBottom variant='body1'>
                                Project about human face recognition.
                                Use computer vision algorithms to process face image and find key points of face
                                then convert the key points into vectors for comparing among different users.
                                The Project is a comprehensive access control system, which integrates with RFID tag and
                                embedded hardware.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Fade>
    );
}

const projectStyle = makeStyles((theme) => ({
    root: {
        // wordBreak: 'break-word',
        marginBottom: 48,
        '& * h4, & * h5': {
            fontWeight: 500,
        }
    },
    card_root: {
        // wordBreak: 'break-word',
        marginTop: 48,
        // backgroundColor: 'rgba(180, 180, 180, 0.87)'
    },
    title: {
        borderBottom: `${section_divider} solid ${theme.palette.divider}`,
        marginTop: 48,
        textAlign: 'left',
    },
    card_content: {
        height: '100%',
    },
    detail: {
        padding: '24px 0 0 0',
        [theme.breakpoints.up('md')]: {
            padding: '0 0 0 48px'
        },
        textAlign: 'left',
        '& * h4, & * h5': {
            fontWeight: 500,
        }
    },
}));

const projects_info = [
    {
        image: 'https://i.imgur.com/AeXxSiX.gif',
        title: 'Real-time Hand Gesture Recognition System',
        description: 'Train detection model and classification model to detect hands and classify the gesture ' +
            'then use the result to create an interface which could control cursor with hands directly',
    },
    {
        image: ProjectImage1,
        title: 'Cat Segmentation',
        description: 'Use different segmentation models such as U-net and LinkNet and Oxford-IIIT Pet Dataset to train a cat segmentation model',
    },
    {
        image: 'https://tvblog-static.tradingview.com/uploads/2018/03/Poloniex_logo_2-1024x512.png',
        title: 'BTC Auto Trading Bot',
        description: 'Build a auto trading bot using Poloniex API and trading with simple moving average strategy',
    },
];

function Project(props) {
    const classes = projectStyle();
    let ProjectCards = [];
    for (let i = 0; i < projects_info.length; i++) {
        ProjectCards.push(
            <Grid className={classes.card_root} key={i} container item xs={12} justify="flex-start"
                  alignItems="flex-start">
                <Grid container item xs={12} justify="center" alignItems="center">
                    <Grid className={classes.logo} container item xs={12} md={3} justify="center">
                        <Card raised={true}>
                            <CardActionArea className={classes.card_content}>
                                <CardMedia
                                    component="img"
                                    alt={projects_info[i].title}
                                    height="168"
                                    image={projects_info[i].image}
                                    title={projects_info[i].title}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid className={classes.detail} item xs={12} md={9}>
                        <Typography gutterBottom variant='h5'>
                            {projects_info[i].title}
                        </Typography>
                        <Typography gutterBottom variant='body1'>
                            {projects_info[i].description}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
    return (
        <Fade in={true} timeout={3000}>
            <Grid
                className={classes.root}
                container
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
            >
                <Grid className={classes.title} container item xs={12} justify="flex-start"
                      alignItems="flex-start">
                    <Typography gutterBottom variant='h4'>Recent Projects</Typography>
                </Grid>
                {ProjectCards}
            </Grid>
        </Fade>
    );
}

export default withStyles(useStyles)(About);
