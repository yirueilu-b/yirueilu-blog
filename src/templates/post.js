import ArticleDetail from '../components/ArticleDetail/ArticleDetail'
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
                    title={this.props.pageContext['title']}
                    description={this.props.pageContext['description']}
                    image_url={this.props.pageContext['image']}
                />
                <ArticleDetail pageContext={this.props.pageContext}/>
            </Layout>
        );
    }
}

export default withStyles(useStyles)(App)