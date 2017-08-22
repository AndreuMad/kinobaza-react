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

    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {

        return (
            <article className="posts-page">
                <h1 className="posts-page-title">Публікації</h1>
                <div className="row">
                    <div className="col m-8">
                        <div className="col-inner">
                            {/*<CardBig*/}
                                {/*id=""*/}
                                {/*title=""*/}
                                {/*text=""*/}
                            {/*/>*/}
                        </div>
                    </div>
                    {this.props.posts.postsList ?
                        this.props.posts.postsList.map((post, index) => (
                        <div key={post.id} className="col m-4">
                            <div className="col-inner">
                                <CardRegular
                                    id={post.id}
                                    image="http://lol.com"
                                    title={post.title}
                                    //date={post.date}
                                />
                            </div>
                        </div>
                    )): null}
                </div>
            </article>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(postsActions.fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
