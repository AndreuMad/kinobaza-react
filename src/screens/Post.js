import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchPost} from 'Actions/posts-actions';
import {postComment} from 'Actions/comments-actions';

import PostComments from 'Components/posts/PostComments';

class Post extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    render() {
        const { post } = this.props;

        return (
            post ?
                <article className="post-page">
                    <section
                        className="introduction"
                        // style={Object.assign(
                        //     {},
                        //     this.props.post.backgroundColor ? { background: `#${this.props.post.backgroundColor}` } : null
                        // )}
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col m-10 m-offset-1">
                                    <div className="col-inner">
                                        <figure
                                            className="introduction-illustration"
                                            style={{
                                                backgroundImage: `url('${this.props.post.image.url}'`
                                            }}
                                        >
                                        </figure>
                                        <h1 className="introduction-title">{this.props.post.title}</h1>
                                        <p className="introduction-date">{this.props.post.date}</p>
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
                                                       dangerouslySetInnerHTML={{__html: this.props.post.textArticle}}/>
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
                        postId={this.props.post._id}
                        userId={this.props.userId}
                        comments={this.props.comments}
                        postComment={this.props.postComment}
                    />
                </article> : null

        )
    }
}

Post.propTypes = {
    post: PropTypes.object,
    fetchPost: PropTypes.func.isRequired
};

const mapStateToProps = ({
                             posts: {post},
                             posts: {comments},
                             auth: {id: userId}
                         }) => {
    return {
        post,
        comments,
        userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (id) => dispatch(fetchPost(id)),
        postComment: (params) => dispatch(postComment(params))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
