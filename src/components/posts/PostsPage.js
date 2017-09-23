import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

import { fetchPosts } from '../../actions/posts-actions';

import CardBig from './components/CardBig';
import CardRegular from './components/CardRegular';

class PostsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            postsPerPage: 8
        };

        this.handlePagination = this.handlePagination.bind(this);
    }


    fetchPosts() {
        this.props.fetchPosts({
            skip: (this.state.activePage - 1) * this.state.postsPerPage,
            limit: 8
        });
    }

    renderPosts() {
        const posts = this.props.posts;

        if(posts) {
            return (
                posts.map((post, index) => {
                    if(index !== 0) {
                        return (
                            <div key={`post_${post._id}`} className="col m-4">
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
                })
            )
        } else {
            this.fetchPosts();
        }
    }

    renderBigPost() {
        const bigPost = this.props.bigPost;

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

    renderPagination() {
        if(this.props.posts) {
            return (
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.props.posts.length}
                    totalItemsCount={10}
                    pageRangeDisplayed={2}
                    onChange={this.handlePagination}
                />
            )
        }
        return null;
    }

    handlePagination(pageToRender) {
        this.setState({
            activePage: pageToRender
        });

        this.fetchPosts();
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
                    <div className="pagination">{this.renderPagination()}</div>
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
        fetchPosts: (props) => dispatch(fetchPosts(props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
