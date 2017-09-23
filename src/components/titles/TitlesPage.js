import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Title from './Title';
import TitlesForm from './TitlesForm';

const TitlesPage = ({ titlesList }) => (

    <article className="titles-page">
        <div className="container">
            <h1 className="section-heading">Стрічки</h1>
            <div className="row">
                <div className="col m-8">
                    <div className="col-inner">
                        {titlesList ?
                            titlesList
                                .map((title) => {
                                const {
                                    _id,
                                    name,
                                    image,
                                    year,
                                    score,
                                    text
                                } = title;

                                return (
                                    <Title
                                        key={`title${_id}`}
                                        id={_id}
                                        titleEn={name.en}
                                        titleUkr={name.ukr}
                                        imageUrl={image.url}
                                        year={year}
                                        averageScore={score.average}
                                        imdbScore={score.imdb}
                                        text={text}
                                    />
                                );

                            }) : null}
                    </div>
                </div>
                <div className="col m-4">
                    <div className="col-inner">
                        <TitlesForm />
                    </div>
                </div>
            </div>
        </div>
    </article>
);

TitlesPage.propTypes = {
    titlesList: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
    return {
        titlesList: state.titles.titlesList
    }
};


export default connect(mapStateToProps)(TitlesPage);
