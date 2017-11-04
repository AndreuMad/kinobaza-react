import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
    fetchPosts,
    clearPosts
} from 'Actions/posts-actions';

import CardRegular from 'Components/posts/CardRegular';
import CardArticle from 'Components/posts/CardArticle';

class PostsPage extends Component {
    constructor(props) {
        super(props);

        this.handlePostsLoad = _.debounce(this.handlePostsLoad.bind(this), 200);
        this.handleLoadButton = this.handleLoadButton.bind(this);

        this.state = {
            postsCurrentCount: 0,
            shouldLoadPosts: false
        };
    }

    componentDidMount() {
        this.fetchPosts({ skip: 0, limit: 8 }, true);

        window.addEventListener('scroll', this.handlePostsLoad);
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            postsCurrentCount: nextProps.posts.length + 1
        });
    }

    shouldComponentUpdate(nextProps) {
        return !(this.props.posts.length === nextProps.posts.length && this.props.articlePost);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handlePostsLoad);
        this.props.clearPosts();
    }

    fetchPosts({ skip, limit }, shouldFetchArticle) {
        let query = {};

        if(skip) {
            query.skip = skip;
        }
        if(limit) {
            query.limit = limit;
        }

        this.props.fetchPosts(query, shouldFetchArticle);
    }

    handleLoadButton() {
        this.setState({
            shouldLoadPosts: true
        }, () => {
            this.handlePostsLoad();
        });
    }

    handlePostsLoad() {
        const { postsCurrentCount } = this.state;
        const { postsTotalCount } = this.props;

        if(postsCurrentCount === postsTotalCount) {
            this.setState({
                shouldLoadPosts: false
            });
        }

        if(this.state.shouldLoadPosts && this.props.fetchPostsStatus) {

            if(this.pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {

                this.fetchPosts({ skip: this.state.postsCurrentCount, limit: 3 });
            }
        }
    }

    render() {
        const posts = this.props.posts;
        const articlePost = this.props.articlePost;

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
                            posts ? posts.map((post, index) => (
                                    <div key={`post_${post._id}`} className="col m-4">
                                        <div className="col-inner">
                                            <CardRegular
                                                id={`${post._id}`}
                                                image={post.image}
                                                title={post.title}
                                                date={post.date}
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
                                !this.state.shouldLoadPosts ? <button className="btn gradient-purple" onClick={this.handleLoadButton}>Load more</button> : null
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
    fetchPosts: PropTypes.func.isRequired,
    clearPosts: PropTypes.func.isRequired
};

const mapStateToProps = ({ posts }) => {
    return {
        posts: posts.posts,
        postsTotalCount: posts.postsTotalCount,
        articlePost: posts.articlePost,
        fetchPostsStatus: posts.fetchPostsStatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (props, fetchArticlePost) => dispatch(fetchPosts(props, fetchArticlePost)),
        clearPosts: () => dispatch(clearPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
