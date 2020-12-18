import React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'
import { Card } from 'antd'
import Pager from '../components/pager'
import Layout from '../components/layout'
import Articles from '../components/post-item'

const BlogArchive = ({ data, pageContext, location }) => {
  const posts = get(data, 'allMarkdownRemark.edges')
  const articles = posts.map(item => ({
    ...item.node.frontmatter,
    excerpt: item.node.excerpt,
    fields: item.node.fields,
  }))
  return (
    <Layout location={location}>
      <Card bordered={false}>
        <Articles list={articles} />
        <Pager pageContext={pageContext} />
      </Card>
    </Layout>
  )
}

export default BlogArchive

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt
          fields {
            permalink
            tags
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            description
          }
        }
      }
    }
  }
`