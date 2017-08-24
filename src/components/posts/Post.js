import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as postsActions from '../../actions/posts-actions';

class Post extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPost(this.props.params.id);
    }

    render() {

        return (
            this.props.post ?
                <article className="post-page">
                    <section className="introduction">
                        <figure className="introduction-illustration">
                            <img
                                className="introduction-image"
                                src={this.props.post.image.url}
                                alt={this.props.post.title}
                                title={this.props.post.title}
                            />
                        </figure>
                        <h1 className="introduction-title">{this.props.post.title}</h1>
                        <p className="introduction-date">{this.props.post.date}</p>
                    </section>
                    <section className="post-body">
                        <p className="post-body-text">{this.props.post.text}</p>
                    </section>
                </article> : null

        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.posts.post
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (id) => dispatch(postsActions.fetchPost(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
