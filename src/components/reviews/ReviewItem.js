import React from 'react';
import classNames from 'classnames';

import moment from 'moment';
import 'NodeModules/moment/locale/uk';

const ReviewItem = ({
                        titleNameUkr,
                        titleNameEn,
                        titleImageUrl,
                        titleYear,
                        authorId,
                        authorName,
                        isPositive,
                        date,
                        text,
                        score
                    }) => (
    <article className={classNames(
        'review-item',
        { 'positive': isPositive === 1 },
        { 'negative': isPositive === -1 }
    )}>
        <div className="row">
            <div className="col s-2">
                <div className="col-inner">
                    <figure>
                        <img src={titleImageUrl} alt={titleNameEn}/>
                    </figure>
                </div>
            </div>
            <div className="col s-10">
                <div className="col-inner">
                    <div className="title-content flex-row">
                        <div>
                            <div className="flex-row">
                                <h2 className="title-name-primary">{titleNameUkr}</h2>
                                <span className="title-year">{titleYear}</span>
                            </div>
                            <h2 className="title-name-secondary">{titleNameEn}</h2>
                        </div>
                    </div>
                    <div className="review-content">
                        <div className="review-content-heading flex-row">
                            <p className="author-name">{authorName}</p>
                            <span className="review-date">{moment(date).locale("ua").format("LLL")}</span>
                        </div>
                        <div>
                            <p className="review-text">{text}</p>
                        </div>
                        <div>
                            <p className="review-rating">{`${score}/10`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
);

export default ReviewItem;
