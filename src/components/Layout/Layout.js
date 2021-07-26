import React from "react"
import {MuiThemeProvider} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import {unstable_createMuiStrictModeTheme} from '@material-ui/core/styles';
import Footer from './Footer'
import Navbar from "./Navbar"
import './index.css';

const fontFamily = [
    // '微軟正黑體',
    // 'Consolas',
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
].join(',');

let myTheme = unstable_createMuiStrictModeTheme({
    palette: {
        type: 'dark'
    },
    typography: {
        fontFamily: fontFamily,
    },
});

const useStyles = {
    root: {
        flexGrow: 1,
        maxWidth: '100vw',
        minHeight: '100vh',
        padding: 0,
        textAlign: 'center',
    },
};

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: myTheme,
        };
        this.toggleDarkTheme = this.toggleDarkTheme.bind(this)
    }

    toggleDarkTheme = (event) => {
        let newPaletteType = this.state.theme.palette.type === "light" ? "dark" : "light";
        myTheme = unstable_createMuiStrictModeTheme({
            palette: {
                type: newPaletteType
            },
            typography: {
                fontFamily: fontFamily,
            },
        });
        this.setState({theme: myTheme});

        const message = {
            type: 'set-theme',
            theme: this.state.theme.palette.type === 'light' ? "github-dark" : "github-light"
        };
        let utterances = document.querySelector('iframe');
        if (utterances) {
            utterances.contentWindow.postMessage(message, 'https://utteranc.es');
        }
    };

    render() {
        const children = this.props.children;
        const {classes} = this.props;
        const childrenWithProps = React.Children.map(children, (child) =>
            React.cloneElement(child, {theme: this.state.theme})
        );
        return (
            <MuiThemeProvider theme={this.state.theme}>
                <CssBaseline/>
                <Container className={classes.root}>
                    <Navbar theme={this.state.theme} onToggleDark={this.toggleDarkTheme}/>
                    {childrenWithProps}
                    <Footer/>
                </Container>
            </MuiThemeProvider>
        )
    }
}


export default withStyles(useStyles)(Layout);


