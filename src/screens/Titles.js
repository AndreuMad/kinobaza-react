import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Title from 'Components/titles/Title';
import TitlesForm from 'Components/titles/TitlesForm';

import {
    fetchTitles,
    clearTitles
} from 'Actions/titles-actions';

class TitlesPage extends Component {
    constructor(props) {
        super(props);

        this.handleTitlesLoad = _.debounce(this.handleTitlesLoad.bind(this));

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

        this.props.fetchUpTitles({
            ...this.props.titlesQuery,
            skip: this.state.titlesCurrentCount
        });
    }

    handleTitlesLoad() {

        if(this.state.shouldLoadTitles && this.props.fetchTitlesStatus) {

            if(this.pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {

                this.fetchUpTitles();
            }
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
    titles: PropTypes.arrayOf(PropTypes.object),
    titlesTotalCount: PropTypes.number.isRequired,
    titlesQuery: PropTypes.object,
    fetchTitlesStatus: PropTypes.bool.isRequired,
    fetchUpTitles: PropTypes.func.isRequired,
    clearTitles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        titles: state.titles.titles,
        titlesTotalCount: state.titles.titlesTotalCount,
        titlesQuery: state.titles.titlesQuery,
        fetchTitlesStatus: state.titles.fetchTitlesStatus
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchUpTitles: (props) => dispatch(fetchTitles(props, true)),
    clearTitles: () => dispatch(clearTitles())
});


export default connect(mapStateToProps, mapDispatchToProps)(TitlesPage);
