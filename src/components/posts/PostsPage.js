import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

import { fetchPosts, fetchBigPost } from '../../actions/posts-actions';

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

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        this.props.fetchPosts({
            skip: (this.state.activePage - 1) * this.state.postsPerPage,
            limit: 8
        });
    }

    handlePagination(pageToRender) {
        console.log(`The active page is ${pageToRender}`);
        this.setState({
            activePage: pageToRender
        });

        this.fetchPosts();
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
                    <div className="pagination">
                        {
                            this.props.posts ? <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.props.posts.length}
                                totalItemsCount={10}
                                pageRangeDisplayed={2}
                                onChange={this.handlePagination}
                            /> : null
                        }
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
