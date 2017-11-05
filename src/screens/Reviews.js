import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReviewItem from 'Components/Reviews/ReviewItem';

import {
    fetchReviews
} from 'Actions/reviews-actions'

class ReviewsPage extends Component {
    componentDidMount() {
        this.props.fetchReviews();
    }

    render() {
        const {
            reviews
        } = this.props;

        return (
            <article
                className="reviews-page"
                ref={node => this.pageNode = node}
            >
                <div className="container">
                    <h1 className="section-heading">Рецензії</h1>
                    <div className="reviews-holder">
                        {
                            reviews.length ?
                                reviews.map(({
                                                author: {
                                                    id: authorId,
                                                    name: authorName
                                                },
                                                title: {
                                                    name: { ukr: titleNameUkr, en: titleNameEn },
                                                    image: { url: titleImageUrl },
                                                    year: titleYear
                                                },
                                                isPositive,
                                                date,
                                                text,
                                                score
                                             }) => (
                                    <ReviewItem
                                        titleNameUkr={titleNameUkr}
                                        titleNameEn={titleNameEn}
                                        titleImageUrl={titleImageUrl}
                                        titleYear={titleYear}
                                        authorId={authorId}
                                        authorName={authorName}
                                        isPositive={isPositive}
                                        date={date}
                                        text={text}
                                        score={score}
                                    />
                                )) : <span>Нічого не знайдено</span>
                        }
                    </div>
                </div>
            </article>
        );
    }
}

const mapStateToProps = ({
                            auth: { id: userId },
                            reviews: {
                                 reviewsTotalCount,
                                 reviews
                            }
}) => ({
    userId,
    reviewsTotalCount,
    reviews
});

const mapDispatchToProps = (dispatch) => ({
    fetchReviews: (params, append) => dispatch(fetchReviews(params, append))
});

ReviewsPage.propTypes = {
    userId: PropTypes.string,
    reviewsTotalCount: PropTypes.number,
    reviews: PropTypes.array,
    fetchReviews: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsPage);
