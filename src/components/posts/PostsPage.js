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

        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            posts: [],
            postsNumber: 0
        };
    }

    componentDidMount() {
        this.fetchPosts({ skip: 0, limit: 8 }, true);

        window.addEventListener('scroll', _.debounce(this.handleScroll), 200);
    }

    componentWillReceiveProps(newProps) {
        const oldPosts = this.props.posts;
        const newPosts = newProps.posts;

        console.log(oldPosts);
        console.log(newPosts);

        if(!oldPosts.length || oldPosts[oldPosts.length - 1] !== newPosts[newPosts.length - 1]) {
            this.setState({
                posts: newPosts
            });
        }
    }

    componentWillUnmount() {
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

    handleScroll() {
        // if(this.pageNode.getBoundingClientRect().bottom - window.innerHeight < 200) {
        //     this.fetchPosts({ skip: 8, limit: 3 });
        // }
        const skip = this.state.posts.length;

        return this.fetchPosts({ skip, limit: 3 });
    }

    renderPosts() {
        const posts = this.state.posts;

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
                </div>
            </article>
        );
    }
}

PostsPage.propTypes = {
    posts: PropTypes.array,
    articlePost: PropTypes.object,
    fetchPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        articlePost: state.posts.articlePost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (props, fetchArticlePost) => dispatch(fetchPosts(props, fetchArticlePost)),
        clearPosts: () => dispatch(clearPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
