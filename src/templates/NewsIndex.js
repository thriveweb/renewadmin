import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import GetInTouchBlock from '../components/GetInTouchBlock'

import './News.css'

// Export Template for use in CMS preview
export const NewsTemplate = ({ title, sectionGetInTouch = {} }) => {
  return (
    <main class="blog">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="section About--TitleSection">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </section>
      <section className="section Service--Contact">
        <div className="container">
          <GetInTouchBlock content={sectionGetInTouch} />
        </div>
      </section>
    </main>
  )
}

// Export Default News for front-end
const News = ({ data }) => {
  const page = {
    ...data.page
  }
  return (
    <Layout>
      <NewsTemplate {...page} {...page.frontmatter} />
    </Layout>
  )
}

export default News

export const pageQuery = graphql`
  ## Query for News data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query News($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        sectionGetInTouch {
          title
          subtitle
          button1 {
            text
            link
          }
          button2 {
            text
            link
          }
        }
      }
    }
  }
`
