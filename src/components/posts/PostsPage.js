import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts, fetchBigPost } from '../../actions/posts-actions';

import CardBig from './components/CardBig';
import CardRegular from './components/CardRegular';

class PostsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            bigPost: null
        };

        this.fetchPosts = this.fetchPosts.bind(this);
    }

    componentDidMount() {
        this.fetchPosts({ skip: 0, limit: 8 });
        setTimeout(() => {
            this.fetchPosts({ skip: 8, limit: 3 });
        }, 3000);
    }

    componentWillReceiveProps(newProps) {
        // Regular Posts
        const newPosts = newProps.posts;
        if(newPosts.length) {
            this.handlePosts(newPosts);
        }

        // Big Post
        const bigPost = newProps.bigPost;
        if(bigPost) {
            this.handleBigPost(bigPost);
        }
    }

    fetchPosts({ skip, limit }) {
        let query = {};
        if(skip) {
            query.skip = skip;
        }
        if(limit) {
            query.limit = limit;
        }

        this.props.fetchPosts(query);
    }

    handlePosts(newPosts) {
        const oldPosts = this.state.posts;

        if(!oldPosts.length) {
            const bigPost = newPosts.filter(post => post.important)[0];
            this.props.fetchBigPost(bigPost._id);
        }

        if(!oldPosts.length || oldPosts[1]._id !== newPosts[1]._id) {
            this.setState({
                posts: [
                    ...oldPosts,
                    ...newPosts
                ]
            })
        }
    }

    renderPosts() {
        const posts = this.state.posts;

        if(posts) {
            return (
                posts.map((post, index) => (
                        <div key={`post_${post._id}${Math.random()}`} className="col m-4">
                            <div className="col-inner">
                                <CardRegular
                                    id={`defaultPost${post._id}`}
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

    handleBigPost(newBigPost) {
        const posts = this.state.posts;

        if(!this.state.bigPost) {

            console.log(posts);

            this.setState({
                bigPost: newBigPost,
                posts: posts.filter(post => post._id !== newBigPost._id)
            });
        }
    }

    renderBigPost() {
        const bigPost = this.state.bigPost;

        if(bigPost) {

            return (
                <CardBig
                    key={`bigPost${bigPost._id}`}
                    id={bigPost._id}
                    image={bigPost.image}
                    title={bigPost.title}
                    text={bigPost.text}
                />
            );
        }
    }

    render() {

        return (
            <article className="posts-page">
                <div className="container">
                    <h1 className="section-heading">Публікації</h1>
                    <div className="row">
                        <div className="col m-8">
                            <div className="col-inner">
                                {this.renderBigPost()}
                            </div>
                        </div>
                        {this.renderPosts()}
                    </div>
                </div>
            </article>
        );
    }
}

PostsPage.propTypes = {
    posts: PropTypes.array,
    bigPost: PropTypes.object,
    fetchPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        bigPost: state.posts.bigPost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (props) => dispatch(fetchPosts(props)),
        fetchBigPost: (id) => dispatch(fetchBigPost(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
