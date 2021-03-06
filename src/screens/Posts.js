import React, { Component } from 'react';
import { number, bool, func, array } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { Container, Row, Col } from 'Components/layout';
import CardRegular from 'Components/posts/CardRegular';
import CardArticle from 'Components/posts/CardArticle';

import { callFetchPosts } from 'Ducks/posts';

class PostsPage extends Component {
  constructor(props) {
    super(props);

    this.handlePostsLoad = _.debounce(this.handlePostsLoad, 200);

    this.state = {
      allPostsLoaded: false,
      shouldLoadPosts: false
    };
  }

  componentDidMount() {
    this.props.fetchPostsDispatch({ skip: 0, limit: 8 });
  }

  componentWillReceiveProps({ posts: nextPosts }) {
    const {
      props: {
        posts,
        postsTotalCount
      }
    } = this;

    if (posts.length !== nextPosts.length) {
      if (postsTotalCount === nextPosts.length + 1) {
        this.setState({ allPostsLoaded: true });
        window.removeEventListener('scroll', this.handlePostsLoad);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlePostsLoad);
  }

  handleLoadButton = () => {
    this.setState({
      shouldLoadPosts: true
    }, () => {
      window.addEventListener('scroll', this.handlePostsLoad);
      this.handlePostsLoad();
    });
  };

  handlePostsLoad = () => {
    const {
      props: {
        fetchPostsStatus,
        fetchPostsDispatch
      },
      state: {
        shouldLoadPosts
      },
      pageNode
    } = this;

    if (shouldLoadPosts && fetchPostsStatus) {
      if (pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {
        fetchPostsDispatch({ limit: 3 }, true);
      }
    }
  };

  render() {
    const {
      props: {
        posts
      },
      state: {
        allPostsLoaded,
        shouldLoadPosts
      },
      handleLoadButton
    } = this;

    return (
      <article
        className="posts-page"
        ref={(node) => {
          this.pageNode = node;
        }}
      >
        <Container>
          <h1 className="section-heading">Публікації</h1>
          <Row>
            {
              posts.length &&
              (posts.map(({
                  _id,
                  image,
                  title,
                  date,
                  text,
                  articlePost
                }) => (
                articlePost ? (
                  <Col
                    key={`articlePost${_id}`}
                    xs={{ size: 12, order: 'first' }}
                    md={8}
                  >
                    <div className="col-inner">
                      <CardArticle
                        id={_id}
                        image={image}
                        title={title}
                        text={text}
                        date={date}
                      />
                    </div>
                  </Col>
                ) : (
                  <Col
                    key={`post_${_id}`}
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <div className="col-inner">
                      <CardRegular
                        id={_id}
                        image={image}
                        title={title}
                        date={date}
                      />
                    </div>
                  </Col>
                ))))
            }
          </Row>
          <div className="load-more-section">
            <div className="btn-group align-center">
              {
                !shouldLoadPosts && !allPostsLoaded && (
                  <button
                    className="btn gradient-purple"
                    onClick={handleLoadButton}
                  >
                    Load more
                  </button>
                )
              }
            </div>
          </div>
        </Container>
      </article>
    );
  }
}

PostsPage.propTypes = {
  posts: array.isRequired,
  postsTotalCount: number.isRequired,
  fetchPostsStatus: bool.isRequired,
  fetchPostsDispatch: func.isRequired
};

const mapStateToProps = ({ posts }) => ({
  posts: posts.posts,
  postsTotalCount: posts.postsTotalCount,
  fetchPostsStatus: posts.fetchPostsStatus
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPostsDispatch: callFetchPosts
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
