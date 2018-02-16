import React, { Component } from 'react';
import { string, number, arrayOf, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReviewItem from 'Components/Reviews/ReviewItem';

import {
  callFetchReviews
} from 'Ducks/reviews'

class ReviewsPage extends Component {
  componentDidMount() {
    this.props.fetchReviews();
  }

  render() {
    const { reviews } = this.props;
    console.log(reviews);

    return (
      <article
        className="reviews-page"
        ref={(node) => {
          this.pageNode = node;
        }}
      >
        <div className="container">
          <h1 className="section-heading">Рецензії</h1>
          <div className="reviews-holder">
            {
              reviews.length ?
                reviews.map(({
                    _id,
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
                      key={`review${_id}`}
                      authorName={authorName}
                      authorId={authorId}
                      titleNameUkr={titleNameUkr}
                      titleNameEn={titleNameEn}
                      titleImageUrl={titleImageUrl}
                      titleYear={titleYear}
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

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchReviews: shouldAppend => callFetchReviews(shouldAppend)
}, dispatch);

ReviewsPage.propTypes = {
  userId: string,
  reviewsTotalCount: number,
  reviews: arrayOf(shape({
    _id: string,
    author: shape({
      _id: string,
      name: string
    }),
    date: number,
    isPositive: number,
    likes: shape({
      negative: number,
      positive: number
    }),
    score: number,
    text: string,
    title: shape({
      _id: string,
      image: shape({
        url: string
      }),
      name: shape({
        en: string,
        ukr: string
      }),
      year: number
    })
  })),
  fetchReviews: func
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsPage);
