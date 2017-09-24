import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts, fetchBigPost } from '../../actions/posts-actions';

import CardBig from './components/CardBig';
import CardRegular from './components/CardRegular';

class PostsPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchPosts({ skip: 0, limit: 8 });

        setTimeout(() => {
            this.fetchPosts({ skip: 8, limit: 3 });
        }, 3000);
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

    renderPosts() {
        const posts = this.props.posts;

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

    renderBigPost() {
        const bigPost = this.props.bigPost;

        if(bigPost) {

            return (
                <div className="col m-8">
                    <div className="col-inner">
                        <CardBig
                            key={`bigPost${bigPost._id}`}
                            id={bigPost._id}
                            image={bigPost.image}
                            title={bigPost.title}
                            text={bigPost.text}
                        />
                    </div>
                </div>
            );
        }
    }

    render() {

        return (
            <article className="posts-page">
                <div className="container">
                    <h1 className="section-heading">Публікації</h1>
                    <div className="row">
                        {this.renderBigPost()}
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
