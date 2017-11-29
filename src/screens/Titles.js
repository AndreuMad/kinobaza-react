import React, {Component} from 'react';
import {string, number, arrayOf, bool, func, object, shape} from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

import AuthController from 'Components/hoc/AuthController';
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

        this.handleFetchTitles = this.handleFetchTitles.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleFetchUpTitles = this.handleFetchUpTitles.bind(this);
        this.handleTitlesLoad = _.debounce(this.handleTitlesLoad.bind(this), 15);
        this.handleTitleRate = this.handleTitleRate.bind(this);

        this.state = {
            titlesCurrentCount: 0,
            query: {
                name: '',
                genre: [],
                year: {
                    min: 1878,
                    max: 2018
                },
                score: {
                    min: 1,
                    max: 10
                },
                sort: 'year',
                userId: this.props.userId
            },
            shouldLoadTitles: true
        }
    }

    componentDidMount() {
        this.handleFetchTitles();
        window.addEventListener('scroll', this.handleTitlesLoad);
    }

    componentWillReceiveProps(nextProps) {
        const titlesCurrentCount = nextProps.titles.length;
        const {titlesTotalCount} = this.props;

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

    handleFetchTitles() {
        const {
            props: {
                fetchTitlesStatus,
                fetchTitles
            },
            state: {
                query
            }
        } = this;

        if (fetchTitlesStatus) {
            fetchTitles(query);
        }
    }

    handleQueryChange(param, value) {
        const {
            handleFetchTitles,
            state: {query}
        } = this;

        const nextQuery = {
            ...query,
            ...{[param]: value}
        };

        this.setState({
            query: nextQuery
        }, () => {
            handleFetchTitles();
        });
    }

    handleFetchUpTitles() {
        const {
            props: {
                fetchTitlesStatus,
                fetchUpTitles
            },
            state: {
                query,
                titlesCurrentCount
            }
        } = this;

        if (fetchTitlesStatus) {
            fetchUpTitles({
                ...query,
                skip: titlesCurrentCount
            });
        }
    }

    handleTitlesLoad() {
        if (this.state.shouldLoadTitles) {

            if (this.pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {

                this.handleFetchUpTitles();
            }
        }
    }

    handleTitleRate(titleId, newRating) {
        const {
            userId,
            setTitleRating
        } = this.props;

        if (userId) {
            setTitleRating(userId, titleId, newRating);
        }
    }

    render() {
        const {
            handleQueryChange,
            props: {titles},
            state: {query}
        } = this;

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
                                        .map(({
                                                  _id,
                                                  name,
                                                  image,
                                                  year,
                                                  score,
                                                  text,
                                                  userRating
                                              }) => (
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
                                            )
                                        ) : <span>Нічого не знайдено</span>}
                            </div>
                        </div>
                        <div className="col m-4">
                            <div className="col-inner">
                                <TitlesForm
                                    handleQueryChange={handleQueryChange}
                                    query={query}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}

const Loader = () => (
    <span>Перевірка даних...</span>
);

const mapStateToProps = ({
                             auth: {id: userId},
                             titles: {titles, titlesTotalCount, titlesQuery, fetchTitlesStatus}
                         }) => ({
    userId,
    titles,
    titlesTotalCount,
    titlesQuery,
    fetchTitlesStatus
});

const mapDispatchToProps = (dispatch) => ({
    fetchTitles: (query) => dispatch(fetchTitles(query)),
    fetchUpTitles: (props) => dispatch(fetchTitles(props, true)),
    clearTitles: () => dispatch(clearTitles()),
    setTitleRating: (userId, titleId, newRating) => dispatch(setTitleRating(userId, titleId, newRating))
});

TitlesPage.propTypes = {
    clearTitles: func.isRequired,
    fetchTitlesStatus: bool.isRequired,
    fetchTitles: func.isRequired,
    fetchUpTitles: func.isRequired,
    setTitleRating: func.isRequired,
    titles: arrayOf(shape({
        _id: string,
        actors: arrayOf(shape({
            image: shape({
                url: string
            }),
            name: shape({
                en: string,
                ukr: string
            })
        })),
        genre: arrayOf(string),
        image: shape({
            url: string
        }),
        name: shape({
            en: string,
            ukr: string
        }),
        score: shape({
            average: number,
            imdb: number
        }),
        text: string,
        userRating: shape({
            _id: string,
            rating: number,
            title: string,
            user: string
        }),
        year: number
    })),
    titlesQuery: object,
    titlesTotalCount: number.isRequired,
    userId: string
};

export default AuthController(connect(mapStateToProps, mapDispatchToProps)(TitlesPage), Loader);
