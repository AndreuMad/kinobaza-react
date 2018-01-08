import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  callFetchPosts
} from 'Actions/posts-actions';

import CardRegular from 'Components/posts/CardRegular';
import CardArticle from 'Components/posts/CardArticle';

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
    this.props.callFetchPosts({ skip: 0, limit: 8 }, false, true);
  }

  componentWillReceiveProps({ posts: nextPosts }) {
    const { postsTotalCount } = this.props;
    const postsCurrentCount = nextPosts.length + 1;
    const shouldLoad = postsCurrentCount < postsTotalCount;

    if (!shouldLoad) {
      this.setState({
        allPostsLoaded: true,
        shouldLoadPosts: false
      });

      window.removeEventListener('scroll', this.handlePostsLoad);
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
        callFetchPosts
      },
      state: {
        shouldLoadPosts
      },
      pageNode
    } = this;

    if (shouldLoadPosts && fetchPostsStatus) {
      if (pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {
        callFetchPosts({ limit: 3 }, true);
      }
    }
  };

  render() {
    const {
      props: {
        posts,
        articlePost
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
        ref={node => this.pageNode = node}
      >
        <div className="container">
          <h1 className="section-heading">Публікації</h1>
          <div className="row">
            {
              articlePost ?
                <div className="col m-8">
                  <div className="col-inner">
                    <CardArticle
                      key={`articlePost${articlePost._id}`}
                      id={articlePost._id}
                      image={articlePost.image}
                      title={articlePost.title}
                      text={articlePost.text}
                      date={articlePost.date}
                    />
                  </div>
                </div> : null
            }
            {
              posts.length ?
                posts.map(({ _id, image, title, date }, index) => (
                    <div key={`post_${_id}`} className="col m-4">
                      <div className="col-inner">
                        <CardRegular
                          id={_id}
                          image={image}
                          title={title}
                          date={date}
                        />
                      </div>
                    </div>
                  )
                ) : null
            }
          </div>
          <div className="load-more-section">
            <div className="btn-group align-center">
              {
                !shouldLoadPosts && !allPostsLoaded ?
                  <button
                    className="btn gradient-purple"
                    onClick={handleLoadButton}
                  >
                    Load more
                  </button> : null
              }
            </div>
          </div>
        </div>
      </article>
    );
  }
}

PostsPage.propTypes = {
  posts: PropTypes.array,
  postsTotalCount: PropTypes.number,
  articlePost: PropTypes.object,
  fetchPostsStatus: PropTypes.bool.isRequired,
  callFetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = ({ posts }) => ({
  posts: posts.posts,
  postsTotalCount: posts.postsTotalCount,
  articlePost: posts.articlePost,
  fetchPostsStatus: posts.fetchPostsStatus
});

const mapDispatchToProps = dispatch => ({
  callFetchPosts: (props, shouldAppend, shouldFetchArticle) => dispatch(callFetchPosts(props, shouldAppend, shouldFetchArticle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
