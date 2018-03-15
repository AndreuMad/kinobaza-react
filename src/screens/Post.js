import React, { Component } from 'react';
import { string, number, bool, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  callFetchPost,
  callCreateComment
} from 'Ducks/posts';

import { Container, Row, Col } from 'Components/layout';
import PostComments from 'Components/posts/PostComments';

class Post extends Component {
  componentDidMount() {
    const {
      fetchPost,
      match: {
        params: {
          id: postId
        }
      }
    } = this.props;

    fetchPost(postId);
  }

  handleCommentCreate = (comment) => {
    const {
      match: {
        params: {
          id: postId
        }
      },
      createComment
    } = this.props;

    createComment({ postId, ...comment });
  };

  render() {
    const {
      props: {
        post,
        comments
      },
      handleCommentCreate
    } = this;

    return (
      post && (
        <article className="post-page">
          <section
            className="introduction"
          >
            <Container>
              <Row>
                <Col xs={12} md={{ size: 10, offset: 1 }}>
                  <figure
                    className="introduction-illustration"
                    style={{
                      backgroundImage: `url('${post.image.url}'`
                    }}
                  />
                  <h1 className="introduction-title">{post.title}</h1>
                  <p className="introduction-date">{post.date}</p>
                  <div className="introduction-info">
                    <div className="info-block views">
                      <p className="info-block-number">500</p>
                    </div>
                    <div className="info-block likes">
                      <p className="info-block-number">234</p>
                    </div>
                    <div className="info-block comments">
                      <p className="info-block-number">120</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="post-body">
            <Container>
              <Row>
                <Col xs={12} m={{ size: 10, offset: 1 }}>
                  <Row>
                    <Col xs={12} s={10} m={11}>
                      <p
                        className="post-body-text"
                        dangerouslySetInnerHTML={{ __html: post.textArticle }}
                      />
                    </Col>
                    <Col xs={12} m={1} flex="column">
                      <a href="#" className="share-block l">
                        <p className="share-number facebook">500</p>
                      </a>
                      <a href="#" className="share-block l">
                        <p className="share-number twitter">234</p>
                      </a>
                      <a href="#" className="share-block l">
                        <p className="share-number youtube">120</p>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <PostComments
            comments={comments}
            createComment={handleCommentCreate}
          />
        </article>));
  }
}

Post.propTypes = {
  post: shape({
    _id: string,
    date: number,
    image: shape({
      url: string
    }),
    important: bool,
    text: string,
    textArticle: string,
    title: string
  }),
  userId: string,
  fetchPost: func.isRequired,
  createComment: func
};

const mapStateToProps = ({
  posts: { post, comments }
}) => ({
  post,
  comments
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPost: id => callFetchPost(id),
  createComment: comment => callCreateComment(comment)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Post);
