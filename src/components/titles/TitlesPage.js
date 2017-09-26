import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Title from './Title';
import TitlesForm from './TitlesForm';

class TitlesPage extends Component {

    render() {
        const { titles } = this.props;

        return (
            <article className="titles-page">
                <div className="container">
                    <h1 className="section-heading">Стрічки</h1>
                    <div className="row">
                        <div className="col m-8">
                            <div className="col-inner">
                                {titles ?
                                    titles
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
        )
    }
}

TitlesPage.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
    return {
        titles: state.titles.titles
    }
};


export default connect(mapStateToProps)(TitlesPage);
