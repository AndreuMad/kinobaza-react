import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Title from './Title';
import TitlesForm from './TitlesForm';

import {
    fetchTitles,
    clearTitles,
    changeTitlesParams
} from '../../actions/titles-actions';

class TitlesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTitlesCount: 0
        }
    }

    componentDidMount() {
        this.fetchTitles();
    }

    componentWillUnmount() {
        this.props.clearTitles();
    }

    componentWillReceiveProps(nextProps) {
        const prevParams = this.props.titlesParams;
        const nextParams = nextProps.titlesParams;

        if(this.props.fetchTitlesStatus) {
            if(this.shouldFetchData(prevParams, nextParams)) {
                this.fetchTitles(nextParams);
            }
        }
    }

    shouldFetchData(prevParams, nextParams) {

        return (prevParams.name !== nextParams.name) ||
            (prevParams.genre.length !== nextParams.genre.length) ||
            (prevParams.year.min !== nextParams.year.min || prevParams.year.max !== nextParams.year.max) ||
            (prevParams.score.min !== nextParams.score.min || prevParams.score.max !== nextParams.score.max);
    }

    fetchTitles(titlesParams) {
        this.props.fetchTitles(titlesParams);
    }

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
    titles: PropTypes.arrayOf(PropTypes.object),
    titlesParams: PropTypes.object,
    fetchTitles: PropTypes.func.isRequired,
    clearTitles: PropTypes.func.isRequired,
    changeTitlesParams: PropTypes.func.isRequired,
    fetchTitlesStatus: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        titles: state.titles.titles,
        titlesParams: state.titles.titlesParams,
        fetchTitlesStatus: state.titles.fetchTitlesStatus
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchTitles: (props) => dispatch(fetchTitles(props)),
    clearTitles: () => dispatch(clearTitles()),
    changeTitlesParams: (params) => dispatch(changeTitlesParams(params))
});


export default connect(mapStateToProps, mapDispatchToProps)(TitlesPage);
