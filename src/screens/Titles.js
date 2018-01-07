import React, { Component } from 'react';
import { string, number, arrayOf, bool, func, object, shape } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthController from 'Components/hoc/AuthController';
import Title from 'Components/titles/Title';
import TitlesForm from 'Components/titles/TitlesForm';

import {
  callFetchTitles,
  callSetTitleRating
} from 'Actions/titles-actions';

class TitlesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldLoadTitles: true
    };
  }

  componentDidMount() {
    this.handleFetchTitles();
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
  }

  handleFetchTitles = (shouldAppend) => {
    const {
      props: {
        fetchTitlesStatus,
        fetchTitles
      }
    } = this;

    if (fetchTitlesStatus) {
      fetchTitles(shouldAppend);
    }
  };

  handleQueryChange = ({ name, value }) => {
    const {
      handleFetchTitles,
      state: { query }
    } = this;

    const nextQuery = {
      ...query,
      ...{ [name]: value }
    };

    this.setState({
      query: nextQuery
    }, () => {
      handleFetchTitles();
    });
  };

  handleTitlesLoad = () => {
    if (this.state.shouldLoadTitles) {
      if (this.pageNode.getBoundingClientRect().bottom - window.innerHeight < 100) {
        this.handleFetchTitles(true);
      }
    }
  };

  handleTitleRate = ({ titleId, rating }) => {
    this.props.setTitleRating({ titleId, rating });
  };

  render() {
    const {
      handleQueryChange,
      handleTitleRate,
      props: {
        titles,
        titlesQuery
      }
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
                        handleTitleRate={handleTitleRate}
                      />
                    )) : <span>Нічого не знайдено</span>}
              </div>
            </div>
            <div className="col m-4">
              <div className="col-inner">
                <TitlesForm
                  handleQueryChange={handleQueryChange}
                  titlesQuery={titlesQuery}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

const Loader = () => (
  <span>Перевірка даних...</span>
);

const mapStateToProps = ({
  titles: {
    titles,
    titlesTotalCount,
    titlesQuery,
    fetchTitlesStatus
  }
}) => ({
  titles,
  titlesTotalCount,
  titlesQuery,
  fetchTitlesStatus
});

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchTitles: shouldAppend => callFetchTitles(shouldAppend),
  setTitleRating: ({ userId, titleId, rating }) => (
    callSetTitleRating({ userId, titleId, rating })
  )
}, dispatch));

TitlesPage.propTypes = {
  fetchTitlesStatus: bool.isRequired,
  fetchTitles: func.isRequired,
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
  titlesTotalCount: number.isRequired
};

export default AuthController(connect(mapStateToProps, mapDispatchToProps)(TitlesPage), Loader);
