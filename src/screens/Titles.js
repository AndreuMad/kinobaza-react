import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Title from 'Components/titles/Title';
import TitlesForm from 'Components/titles/TitlesForm';

import {
    fetchTitles,
    clearTitles,
    setTitleRating
} from 'Actions/titles-actions';

class TitlesPage extends Component {
    constructor(props) {
        super(props);

        this.handleTitlesLoad = _.debounce(this.handleTitlesLoad.bind(this));
        this.handleTitleRate = this.handleTitleRate.bind(this);

        this.state = {
            titlesCurrentCount: 0,
            shouldLoadTitles: true
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleTitlesLoad);
    }

    componentWillReceiveProps(nextProps) {
        const titlesCurrentCount = nextProps.titles.length;
        const { titlesTotalCount } = this.props;

        const titlesLoadStatus = titlesCurrentCount !== titlesTotalCount;

        this.setState({
            titlesCurrentCount,
            shouldLoadTitles: titlesLoadStatus
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleTitlesLoad);
        this.props.clearTitles();
    }

    fetchUpTitles() {
        const {
            titlesQuery,
            fetchUpTitles
        } = this.props;

        const {
            titlesCurrentCount
        } = this.state;

        fetchUpTitles({
            ...titlesQuery,
            skip: titlesCurrentCount
        });
    }

    handleTitlesLoad() {

        if(this.state.shouldLoadTitles && this.props.fetchTitlesStatus) {

            if(this.pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {

                this.fetchUpTitles();
            }
        }
    }

    handleTitleRate(titleId, newRating) {
        const { userId } = this.props;

        if(this.props.userId) {
            this.props.setTitleRating(userId, titleId, newRating);
        }
    }

    render() {
        const { titles } = this.props;

        return (
            <article
                className="titles-page"
                ref={node => this.pageNode = node}
            >
                <div className="container">
                    <h1 className="section-heading">Стрічки</h1>
                    <div className="row">
                        <div className="col m-8">
                            <div className="col-inner">
                                {titles.length ?
                                    titles
                                        .map((title) => {
                                            const {
                                                _id,
                                                name,
                                                image,
                                                year,
                                                score,
                                                text,
                                                userRating
                                            } = title;

                                            return (
                                                <Title
                                                    key={`title${_id}`}
                                                    _id={_id}
                                                    titleEn={name.en}
                                                    titleUkr={name.ukr}
                                                    imageUrl={image.url}
                                                    year={year}
                                                    averageScore={score.average}
                                                    imdbScore={score.imdb}
                                                    text={text}
                                                    userRating={userRating ? userRating.rating : null}
                                                    handleTitleRate={this.handleTitleRate}
                                                />
                                            );

                                        }) : <span>Нічого не знайдено</span>}
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
    userId: PropTypes.string,
    titles: PropTypes.arrayOf(PropTypes.object),
    titlesTotalCount: PropTypes.number.isRequired,
    titlesQuery: PropTypes.object,
    fetchTitlesStatus: PropTypes.bool.isRequired,
    fetchUpTitles: PropTypes.func.isRequired,
    clearTitles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        userId: state.auth.id,
        titles: state.titles.titles,
        titlesTotalCount: state.titles.titlesTotalCount,
        titlesQuery: state.titles.titlesQuery,
        fetchTitlesStatus: state.titles.fetchTitlesStatus
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchUpTitles: (props) => dispatch(fetchTitles(props, true)),
    clearTitles: () => dispatch(clearTitles()),
    setTitleRating: (userId, titleId, newRating) => dispatch(setTitleRating(userId, titleId, newRating))
});


export default connect(mapStateToProps, mapDispatchToProps)(TitlesPage);
