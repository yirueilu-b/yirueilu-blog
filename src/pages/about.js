import About from '../components/About'
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Layout from "../components/Layout/Layout";
import SEO from "../components/SEO"


const useStyles = {
    root: {
        flexGrow: 1,
        maxWidth: '100vw',
        minHeight: '100vh',
        padding: 0,
        textAlign: 'center',
    },
};

class App extends React.Component {
    render() {
        return (
            <Layout>
                <SEO
                    title="About"
                    description="Hi! I am Yi-Ruei, Lu, A software engineer in Institute for Information Industry ( III ). I am interested in building Web Apps and the topics about Machine Learning. Welcome to my blog and hope you find my posts useful"
                />
                <About/>
            </Layout>
        );
    }
}

export default withStyles(useStyles)(App)