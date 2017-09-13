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

    filterByName(names) {

        if(this.props.titlesFilter && this.props.titlesFilter.name) {
            return names.some((name) => {
                return name.toLowerCase().includes(this.props.titlesFilter.name);
            })
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
            const yearFilter = this.props.titlesFilter.year;

            return year >= yearFilter.min && year <= yearFilter.max;
        }
    }

    filterByRating(rating) {
        if(this.props.titlesFilter && this.props.titlesFilter.rating) {
            const ratingFilter = this.props.titlesFilter.rating;

            return rating >= ratingFilter.min && rating <= ratingFilter.max;
        }
    }

    render() {
        console.log(this.props.titlesList);

        return (
            <article className="titles-page">
                <div className="container">
                    <h1 className="section-heading">Стрічки</h1>
                    <div className="row">
                        <div className="col m-8">
                            <div className="col-inner">
                                {this.props.titlesList ?
                                    this.props.titlesList
                                        .filter((title) => { return this.filterByName([title.name.en, title.name.ukr]) })
                                        .filter((title) => { return this.filterByYear(title.year) })
                                        .filter((title) => { return this.filterByGenre(title.genre) })
                                        .filter((title) => { return this.filterByRating(title.score.imdb) })
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
