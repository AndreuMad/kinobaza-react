import React, { Component } from 'react';
import { string, number, bool, func, shape } from 'prop-types';
import { connect } from 'react-redux';

import { callFetchPost } from 'Actions/posts-actions';
import { postComment } from 'Actions/comments-actions';

import PostComments from 'Components/posts/PostComments';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.callFetchPost(this.props.match.params.id);
  }

  render() {
    const {
      post,
      comments,
      userId,
      postComment
    } = this.props;

    return (
      post ?
        <article className="post-page">
          <section
            className="introduction"
          >
            <div className="container">
              <div className="row">
                <div className="col m-10 m-offset-1">
                  <div className="col-inner">
                    <figure
                      className="introduction-illustration"
                      style={{
                        backgroundImage: `url('${post.image.url}'`
                      }}
                    >
                    </figure>
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
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="post-body">
            <div className="container">
              <div className="row">
                <div className="col m-10 m-offset-1">
                  <div className="col-inner">
                    <div className="row">
                      <div className="col s-10 m-11">
                        <div className="col-inner">
                          <p className="post-body-text"
                             dangerouslySetInnerHTML={{ __html: post.textArticle }}/>
                        </div>
                      </div>
                      <div className="col m-1">
                        <div className="col-inner flex-column">
                          <a href="#" className="share-block l">
                            <p className="share-number facebook">500</p>
                          </a>
                          <a href="#" className="share-block l">
                            <p className="share-number twitter">234</p>
                          </a>
                          <a href="#" className="share-block l">
                            <p className="share-number youtube">120</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <PostComments
            postId={post._id}
            userId={userId}
            comments={comments}
            postComment={postComment}
          />
        </article> : null

    )
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
  callFetchPost: func.isRequired,
  postComment: func
};

const mapStateToProps = ({
                           posts: { post, comments },
                           auth: { user: { _id: userId } }
                         }) => ({
  post,
  comments,
  userId
});

const mapDispatchToProps = dispatch => ({
  callFetchPost: id => dispatch(callFetchPost(id)),
  postComment: params => dispatch(postComment(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
