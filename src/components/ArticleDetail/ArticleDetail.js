import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import React from "react";
import {withStyles} from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import 'highlight.js/styles/darcula.css';
import useStyles from './markdownStyle'
import md from './markdownIt'
import ScrollToTopOnMount from '../Layout/ScrollTopOnMount'


class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdownHTML: null,
        };
    }

    componentDidMount() {
        let markdownHTML = md.render(this.props.pageContext['text']);
        this.setState({markdownHTML: markdownHTML});
        // comment info
        let script = document.createElement("script");
        let anchor = document.getElementById("inject-comments-for-uterances");
        script.setAttribute("src", "https://utteranc.es/client.js");
        script.setAttribute("crossorigin", "anonymous");
        script.setAttribute("async", true);
        script.setAttribute("repo", "yirueilu-b/YirueiLuBlog");
        script.setAttribute("issue-term", this.props.pageContext['uuid']);
        script.setAttribute("theme", this.props.theme === 'dark' ? "github-dark" : "github-light");
        anchor.appendChild(script);
    }

    render() {
        const {classes} = this.props;
        return (
            <Container className={classes.root}>
                <ScrollToTopOnMount/>
                <Fade in={true} timeout={3000}>
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="flex-start"
                        justify="center">

                        <Grid container
                              item
                              xs={12}
                              md={9}
                              className={classes.article_section}
                        >
                            <div
                                className={classes.markdown_style}
                                dangerouslySetInnerHTML={{__html: this.state.markdownHTML}}>
                            </div>
                        </Grid>
                        <Grid container
                              item
                              xs={12}
                              md={9}
                              className={classes.comment_section}
                        >
                            <div className={classes.disqus} id="inject-comments-for-uterances">
                            </div>
                        </Grid>
                    </Grid>
                </Fade>
            </Container>
        );
    }
}

export default withStyles(useStyles)(Article);
