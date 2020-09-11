import React from "react"
import PropTypes from "prop-types"
import {Helmet} from "react-helmet"

// import {useStaticQuery, graphql} from "gatsby"

function SEO({description, lang, meta, title, image_url}) {
    // const {site} = useStaticQuery(
    //     graphql`
    //   query {
    //     site {
    //       siteMetadata {
    //         title
    //         description
    //         author
    //       }
    //     }
    //   }
    // `
    // );
    const meta_image = image_url || "https://i.imgur.com/LFQNo7Sm.jpg";
    const metaDescription = description || "Some notes about web applications, machine learning and coding";

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            // titleTemplate={`%s | ${site.siteMetadata.title}`}
            titleTemplate={`%s - YirueiLu's Blog`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: metaDescription,
                },
                {
                    name: `twitter:creator`,
                    content: `Yi-Ruei, Lu`,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: "og:image",
                    property: "og:image",
                    content: meta_image
                },
                {
                    name: "google-site-verification",
                    content: "SGXnzuORnB-DzWUfhuCO1sKhEcv0JJ1ITsn0e-UUnMQ"
                }
            ].concat(meta)}
        />
    )
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
};

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
};

export default SEO