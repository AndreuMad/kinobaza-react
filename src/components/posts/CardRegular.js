import React from 'react';
import { string, number, shape, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { rgba } from 'polished';

import moment from 'moment';
import 'NodeModules/moment/locale/uk';

import { defaultTheme } from 'Constants/styled/styledThemes';

import PostCard from 'Components/posts/__styled__/CardCommon';

const CardRegularStyled = PostCard.extend`
  &:hover {

    .share {
      opacity: 1;
      pointer-events: auto;
    }
  }
  
  .share,
  .content {
    padding: 0;
  }
  
  .share {
    opacity: 0;
    pointer-events: none;
    transition: .15s ease-out;
  }
  
  .illustration {
    margin-bottom: 1.2rem;
    padding-top: 80%;
  }
  
  .date {
    margin: 0 0 1.2rem;
    color: ${props => props.theme.white && rgba(props.theme.white, 0.75)};
    font-size: 1.4rem;
  }
  
  .title {
    margin: 1.2rem 0 0;
    color: ${props => props.theme.white};
    font-size: 1.8rem;
    font-weight: 400;
    font-style: italic;
  }
`;

const CardRegular = ({ id, image: { url: imageUrl }, title, date }) => (
  <ThemeProvider theme={defaultTheme}>
    <CardRegularStyled>
      <div className="flex-row">
        <div className="col xs-1 share">
          <div className="col-inner flex-column">
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
        <div className="col xs-11">
          <div className="col-inner content">
            <Link
              className="link"
              to={`/posts/${id}`}
            >
              <figure
                className="illustration"
                style={{
                  backgroundImage: `url('${imageUrl}')`
                }}
              >
              </figure>
            </Link>
            <p className="date">{moment(date).locale('ua').format('LLL')}</p>
            <Link className="link" to={`/posts/${id}`}>
              <h3 className="title">{title}</h3>
            </Link>
          </div>
        </div>
      </div>
    </CardRegularStyled>
  </ThemeProvider>
);

CardRegular.propTypes = {
  id: string.isRequired,
  image: shape({
    url: string.isRequired
  }),
  date: number,
  title: string.isRequired,
  important: bool
};

export default CardRegular;
