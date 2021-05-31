import * as React from 'react';
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

// Realizamos una query
// Para components es "const query = ..."
// Para pages es "export const query = ..."

const query = graphql`
    query Seo {
        site { 
            siteMetadata {
                title
                titleTemplate
                description
                url
                image
                author
            }
        }
    }
`

const Seo = ({
    title: defaultTitle = "Home",
    description: defaultDescription,
    ...props
}) => {
    const { pathname } = useLocation();
    const { site } = useStaticQuery(query);

    console.log(site);

    const {
        title,
        titleTemplate,
        description,
        url,
        image,
        author
    } = site.siteMetadata

    const seo = {
        title: defaultTitle || title,
        description: defaultDescription || description,
        image: props.image ? props.image : `${url}${image}`,
        url: `${url}${pathname}`
    }

    console.log(seo)
    
    return (
        <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta name="description" content={seo.description}/>
            <meta name="image" content={seo.image}/>
            {seo.url && <meta property="og:url" content={seo.url}/>}

            {(props.article ? true : null) && (
                <meta property="og:type" content="article" />
            )}
            {seo.title && <meta property="og:title" content={seo.title} />}

            {seo.description && (
                <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}

            <meta name="twitter:card" content="summary_large_image" />
            {author && <meta name="twitter:creator" content={author} />}

            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
                <meta name="twitter:description" content={seo.description} />
            )}

            {seo.image && <meta name="twitter:image" content={seo.image} />}
        </Helmet>
    )
}

// Le damos el tipado a las variables
Seo.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    article: PropTypes.bool
}

// Le ponemos los valores por default
Seo.defaultProps = {
    title: '',
    description: null,
    image: null,
    article: false
}

export default Seo