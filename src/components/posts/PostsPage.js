import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as postsActions from '../../actions/posts-actions';

import CardBig from './CardBig';
import CardRegular from './CardRegular';

class PostsPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    getBigPost() {
        this.props.fetchPost(this.props.posts.postsList[0].id);
    }

    render() {

        const bigPost = this.props.posts.post;

        if(!this.props.posts.post && this.props.posts.postsList) {
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
                        {this.props.posts.postsList ?
                            this.props.posts.postsList.map((post, index) => {
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
        post: state.post,
        posts: state.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (id) => dispatch(postsActions.fetchPost(id)),
        fetchPosts: () => dispatch(postsActions.fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
