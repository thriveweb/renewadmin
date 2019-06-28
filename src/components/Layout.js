import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize/modern-normalize.css'

import './globalStyles.css'
import Meta from './Meta'
import Nav from './Nav'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default ({ children, meta }) => {
  return (
    <StaticQuery
      query={graphql`
        query IndexLayoutQuery {
          settingsYaml {
            siteTitle
            siteDescription
            headerScripts
            socialMediaCard {
              image
            }
          }
        }
      `}
      render={data => {
        const { siteTitle, siteUrl, socialMediaCard, headerScripts } =
          data.settingsYaml || {}
        return (
          <ScrollToTop>
            <Helmet
              defaultTitle={siteTitle}
              titleTemplate={`%s | ${siteTitle}`}
            >
              <html lang="en" />
              <link
                href="https://fonts.googleapis.com/css?family=Montserrat:200,400,500,700|Open+Sans:400,400i,600,700"
                rel="stylesheet"
              />
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-123975389-29"
              />

              <script>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-123975389-29');
                `}
              </script>

              <meta
                name="msvalidate.01"
                content="B0112812CA622A13C327AF572E2BA5B5"
              />

              <meta
                name="google-site-verification"
                content="VBJq1UsJ2Rw5F17d62S9Vjcn2J7VLRY57bHCFRu_h5o"
              />
            </Helmet>

            <Meta
              headerScripts={headerScripts}
              absoluteImageUrl={
                socialMediaCard &&
                socialMediaCard.image &&
                siteUrl + socialMediaCard.image
              }
              {...meta}
            />

            <Nav />

            <Fragment>{children}</Fragment>

            <Footer />
          </ScrollToTop>
        )
      }}
    />
  )
}
