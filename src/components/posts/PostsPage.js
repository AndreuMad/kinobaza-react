import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts, fetchBigPost } from '../../actions/posts-actions';

import CardBig from './CardBig';
import CardRegular from './CardRegular';

class PostsPage extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    getBigPost() {
        this.props.fetchBigPost(this.props.posts[0].id);
    }

    render() {

        const bigPost = this.props.bigPost;

        if(!this.props.bigPost && this.props.posts) {
            this.getBigPost();
        }

        return (
            <article className="posts-page">
                <div className="container">
                    <h1 className="posts-page-title">Публікації</h1>
                    <div className="row">
                        <div className="col m-8">
                            <div className="col-inner">
                                {bigPost ?
                                    <CardBig
                                        id={bigPost.id}
                                        image={bigPost.image}
                                        title={bigPost.title}
                                        text={bigPost.text}
                                    /> : null
                                }
                            </div>
                        </div>
                        {this.props.posts ?
                            this.props.posts.map((post, index) => {
                                if(index !== 0 && index < 8) {
                                    return (
                                        <div key={post.id} className="col m-4">
                                            <div className="col-inner">
                                                <CardRegular
                                                    id={post.id}
                                                    image={post.image}
                                                    title={post.title}
                                                    date={post.date}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                            }): null}
                    </div>
                </div>
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        bigPost: state.posts.bigPost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBigPost: (id) => dispatch(fetchBigPost(id)),
        fetchPosts: () => dispatch(fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
