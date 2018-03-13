import React from 'react';
import { string, number, object, shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { rgba } from 'polished';

import moment from 'moment';
import 'NodeModules/moment/locale/uk';

import PostCard from 'Components/posts/__styled__/CardCommon';
import { defaultTheme } from 'Constants/styled/styledThemes';
import sliceString from 'Utilities/sliceString';

const CardArticleStyled = PostCard.extend`
  padding: 3.2rem;
  background: linear-gradient(90deg, transparent 20%, rgba(${props => props.theme.white}, .25) 0);
  border-radius: .4rem;
  
  .title {
    margin: 0 0 1.8rem;
    color: ${props => props.theme.white};
    font-size: 2rem;
  }
  
  .date {
    margin: 1.8rem 0;
    color: ${props => props.theme.white && rgba(props.theme.white, 0.5)};
    font-size: 1.4rem;
  }
  
  .text {
    margin: 1.8rem 0 0;
    color: ${props => props.theme.white && rgba(props.theme.white, 0.75)};
    font-size: 1.6rem;
    line-height: 2.7rem;
  }
  
  .btn-group {
    margin-top: 2.4rem;
  }
  
  .link {
    border: .1rem solid ${props => props.theme.baseText};
    box-shadow: none;
    color: ${props => props.theme.baseText};
  }
`;

const CardArticle = ({ id, image: { url: imageUrl }, title, text, date }) => (
  <ThemeProvider theme={defaultTheme}>
    <CardArticleStyled>
      <div className="row">
        <div className="col xs-1">
          <div className="col-inner flex-column end-xs">
            <a href="#" className="share-block">
              <p className="share-number facebook">500</p>
            </a>
            <a href="#" className="share-block">
              <p className="share-number twitter">234</p>
            </a>
            <a href="#" className="share-block">
              <p className="share-number youtube">120</p>
            </a>
          </div>
        </div>
        <div className="col xs-5">
          <figure
            className="illustration"
            style={{
              backgroundImage: `url('${imageUrl}')`
            }}
          >
          </figure>
        </div>
        <div className="col xs-6">
          <div className="col-inner">
            <Link to={`/posts/${id}`}>
              <h2 className="title">{title}</h2>
            </Link>
            <p className="date">{moment(date).locale('ua').format('LLL')}</p>
            <p className="text">{sliceString(text, 192)}</p>
            <div className="btn-group align-right">
              <Link to={`/posts/${id}`} className="btn link">Читати</Link>
            </div>
          </div>
        </div>
      </div>
    </CardArticleStyled>
  </ThemeProvider>
);

CardArticle.propTypes = {
  id: string.isRequired,
  image: shape({
    url: string.isRequired
  }),
  title: string.isRequired,
  date: number,
  text: string.isRequired
};

export default CardArticle;
