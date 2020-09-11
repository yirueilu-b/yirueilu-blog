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
    // constructor(props) {
    //     super(props);
    // }
    // componentDidMount() {
    // }

    render() {
        // const {classes} = this.props;
        return (
            <Layout>
                <SEO
                    title="About"
                    description="I am a software engineer in Institute for
                            Information Industry ( III ) and I am responsible for developing web applications and
                            researching the latest deep learning algorithms."
                />
                <About/>
            </Layout>
        );
    }
}

export default withStyles(useStyles)(App)