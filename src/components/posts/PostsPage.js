import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts, fetchBigPost } from '../../actions/posts-actions';

import CardBig from './CardBig';
import CardRegular from './CardRegular';

class PostsPage extends Component {
    componentDidMount() {
        this.props.fetchPosts({ limit: 8 });
    }

    getBigPost(id) {
        this.props.fetchBigPost(id);
    }

    render() {

        const bigPost = this.props.bigPost;

        if(!this.props.bigPost && this.props.posts) {
            this.getBigPost(this.props.posts[0]._id);
        }

        return (
            <article className="posts-page">
                <div className="container">
                    <h1 className="section-heading">Публікації</h1>
                    <div className="row">
                        <div className="col m-8">
                            <div className="col-inner">
                                {bigPost ?
                                    <CardBig
                                        id={bigPost._id}
                                        image={bigPost.image}
                                        title={bigPost.title}
                                        text={bigPost.text}
                                    /> : null
                                }
                            </div>
                        </div>
                        {this.props.posts ?
                            this.props.posts.map((post, index) => {
                                if(index !== 0) {
                                    return (
                                        <div key={post._id} className="col m-4">
                                            <div className="col-inner">
                                                <CardRegular
                                                    id={post._id}
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
        fetchPosts: (props) => dispatch(fetchPosts(props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
