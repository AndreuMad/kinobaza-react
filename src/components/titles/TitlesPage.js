import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import Title from './Title';
import TitlesFilter from './TitlesFilter';

import { fetchTitles } from '../../actions/titles-actions';

class TitlesPage extends Component {
    componentDidMount() {
        this.props.fetchTitles();
    }

    filterByName(name) {

        if(this.props.titlesFilter && this.props.titlesFilter.name) {
            return name.toLowerCase().includes(this.props.titlesFilter.name);
        }

        return true;
    }

    filterByGenre(titleGenres) {
        if(this.props.titlesFilter && this.props.titlesFilter.genres && this.props.titlesFilter.genres.length) {

            for(let i = 0; i < titleGenres.length; i++) {
                if(this.props.titlesFilter.genres.indexOf(titleGenres[i]) !== -1) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }

    filterByYear(year) {
        if(this.props.titlesFilter && this.props.titlesFilter.year) {

            return year >= this.props.titlesFilter.year.min && year <= this.props.titlesFilter.year.max;
        }
    }

    render() {

        return (
            <article className="titles-page">
                <div className="container">
                    <h1>Стрічки</h1>
                    <div className="row">
                        <div className="col m-8">
                            <div className="col-inner">
                                {this.props.titlesList ?
                                    this.props.titlesList
                                        .filter((title) => { return this.filterByName(title.titleEn) })
                                        .filter((title) => { return this.filterByYear(title.year) })
                                        .filter((title) => { return this.filterByGenre(title.genre) })
                                        .map((title) => {
                                        const {
                                            id,
                                            titleEn,
                                            titleUkr,
                                            imageUrl,
                                            year,
                                            averageScore,
                                            imdbScore,
                                            text
                                        } = title;

                                        return (
                                            <Title
                                                key={`title${id}`}
                                                titleEn={titleEn}
                                                titleUkr={titleUkr}
                                                imageUrl={imageUrl}
                                                year={year}
                                                averageScore={averageScore}
                                                imdbScore={imdbScore}
                                                text={text}
                                            />
                                        );

                                    }) : null}
                            </div>
                        </div>
                        <div className="col m-4">
                            <div className="col-inner">
                                <TitlesFilter />
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
        titlesList: state.titles.titlesList,
        titlesFilter: getFormValues('titlesFilter')(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTitles: () => dispatch(fetchTitles())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TitlesPage);
