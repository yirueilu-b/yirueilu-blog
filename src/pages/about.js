import About from '../components/About'
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Layout from "../components/Layout/Layout";


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
                <About/>
            </Layout>
        );
    }
}

export default withStyles(useStyles)(App)