import React from "react";
import GatsbyLink from "gatsby-link";
import Helmet from "react-helmet";

import Link from "../components/Link";
import Card from "../components/card";

export default function Index({ data }) {
    const { edges: posts } = data.allMarkdownRemark;
    return (
        <div className="blog-posts">
            {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => {
                    return (
                        <Card href={post.frontmatter.path} kicker="kicker" title={post.frontmatter.title} description={post.frontmatter.description} key={post.id} />
                    );
                })}
        </div>
    );
}

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        description
                        date(formatString: "MMMM DD, YYYY")
                        path
                        group
                    }
                }
            }
        }
    }
`;
