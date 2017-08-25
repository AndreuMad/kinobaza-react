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
                    <section
                        className="introduction"
                        style={Object.assign(
                            {},
                            this.props.post.backgroundColor ? { background: `#${this.props.post.backgroundColor}` } : null
                        )}
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
                                        <div className="col s-10 m-11">
                                            <div className="col-inner">
                                                <p className="post-body-text">{this.props.post.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
