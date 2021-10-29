/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {Container,Table } from 'reactstrap';


export const GET_POSTS = gql`
  query  GetPosts {
    posts {
      id
      author {
        name
      }
      body
    }
  }
`;

const rowStyles = (post, canEdit) => canEdit(post)
  ? { cursor: 'pointer', fontWeight: 'bold' }
  : {};

const PostViewer = ({ canEdit, onEdit }) => (
  <Query query={GET_POSTS}>
    {({ loading, data }) => !loading && (
        <Container>

  
        {/* <img src="https://media1.tenor.com/images/3f1d85ab9951d0db65e797c7f40e89cc/tenor.gif"></img> */}
      
      <Table>
        <thead>
          <tr>
            <th>id </th>
            <th>Body</th>
            <th>body</th>
          </tr>
        </thead>
        <tbody>
          {data.posts.map(post => (
            <tr
              key={post.id}
              style={rowStyles(post, canEdit)}
              onClick={() => canEdit(post) && onEdit(post)}
            >
                <td>{post.author.name}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>        
      </Table>
      </Container>
    )}
  </Query>
);

PostViewer.defaultProps = {
  canEdit: () => false,
  onEdit: () => null,
};

export default PostViewer;