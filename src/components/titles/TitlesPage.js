import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import Title from './Title';
import TitlesFilter from './TitlesFilter';
import TitlesForm from './TitlesForm';

class TitlesPage extends Component {

    render() {

        return (
            <article className="titles-page">
                <div className="container">
                    <h1 className="section-heading">Стрічки</h1>
                    <div className="row">
                        <div className="col m-8">
                            <div className="col-inner">
                                {this.props.titlesList ?
                                    this.props.titlesList
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
    }
}

const mapStateToProps = (state) => {
    return {
        titlesList: state.titles.titlesList
    }
};


export default connect(mapStateToProps)(TitlesPage);
