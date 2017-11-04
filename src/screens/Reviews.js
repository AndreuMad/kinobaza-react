import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class ReviewsPage extends Component {

    render() {
        return (
            <article
                className="reviews-page"
                ref={node => this.pageNode = node}
            >
                <div className="container">
                    <h1 className="section-heading">Рецензії</h1>
                    <div className="reviews-holder">

                    </div>
                </div>
            </article>
        );
    }
}

export default connect(null, null)(ReviewsPage);
