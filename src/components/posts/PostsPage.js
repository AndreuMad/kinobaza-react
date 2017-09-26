import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
    fetchPosts,
    clearPosts
} from '../../actions/posts-actions';

import CardRegular from './components/CardRegular';
import CardArticle from './components/CardArticle';

class PostsPage extends Component {
    constructor(props) {
        super(props);

        this.handlePostsLoad = _.debounce(this.handlePostsLoad.bind(this), 200);
        this.handleLoadButton = this.handleLoadButton.bind(this);

        this.state = {
            currentPostsCount: 0,
            shouldLoadPosts: false
        };
    }

    componentDidMount() {
        this.fetchPosts({ skip: 0, limit: 8 }, true);

        window.addEventListener('scroll', this.handlePostsLoad);
    }

    componentWillReceiveProps(nextProps) {
        const previousPostsCount = this.state.currentPostsCount;
        const currentPostsCount = nextProps.posts.length + 1;

        if(previousPostsCount < currentPostsCount) {
            this.setState({
                currentPostsCount: currentPostsCount
            });
        }
    }

    shouldComponentUpdate(nextProps) {
        return !(this.props.posts.length === nextProps.posts.length && this.props.articlePost);
    }

    componentWillUnmount() {
        this.props.clearPosts();
        window.removeEventListener('scroll', this.handlePostsLoad);
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
        const { currentPostsCount } = this.state;
        const { totalPostsCount } = this.props;

        if(currentPostsCount === totalPostsCount) {
            this.setState({
                shouldLoadPosts: false
            });
        }

        if(this.state.shouldLoadPosts && this.props.fetchPostsStatus) {

            if(this.pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {

                this.fetchPosts({ skip: this.state.currentPostsCount, limit: 3 });
            }
        }
    }

    renderLoadSection() {
        return !this.state.shouldLoadPosts ? <button className="btn blue" onClick={this.handleLoadButton}>Load more</button> : null;
    }

    renderPosts() {
        const posts = this.props.posts;

        if(posts) {

            return (
                posts.map((post, index) => (
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
                )
            )
        }
    }

    renderArticlePost() {
        const articlePost = this.props.articlePost;

        if(articlePost) {

            return (
                <div className="col m-8">
                    <div className="col-inner">
                        <CardArticle
                            key={`articlePost${articlePost._id}`}
                            id={articlePost._id}
                            image={articlePost.image}
                            title={articlePost.title}
                            text={articlePost.text}
                        />
                    </div>
                </div>
            );
        }
    }

    render() {

        return (
            <article
                className="posts-page"
                ref={node => this.pageNode = node}
            >
                <div className="container">
                    <h1 className="section-heading">Публікації</h1>
                    <div className="row">
                        {this.renderArticlePost()}
                        {this.renderPosts()}
                    </div>
                    <div className="load-more-section">
                        <div className="btn-group align-center" style={{marginBottom: '3.6rem'}}>
                            {this.renderLoadSection()}
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

PostsPage.propTypes = {
    posts: PropTypes.array,
    totalPostsCount: PropTypes.number,
    articlePost: PropTypes.object,
    fetchPostsStatus: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    clearPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        totalPostsCount: state.posts.totalPostsCount,
        articlePost: state.posts.articlePost,
        fetchPostsStatus: state.posts.fetchPostsStatus
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (props, fetchArticlePost) => dispatch(fetchPosts(props, fetchArticlePost)),
        clearPosts: () => dispatch(clearPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
