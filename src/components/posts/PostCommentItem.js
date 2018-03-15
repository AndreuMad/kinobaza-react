import React from 'react';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import Row from 'Components/layout/Row';

import moment from 'moment';
import 'NodeModules/moment/locale/uk';

const PostCommentItem = ({ userId, userName, date, text }) => (
  <section className="comment-item">
    <div className="comment-item-body">
      <Row>
        <div className="col s-2 m-1"></div>
        <div className="col s-10 m-11">
          <div className="col-inner">
            <h6 className="comment-item-author">
              <Link to={`/users/${userId}`}>
                {userName}
              </Link>
            </h6>
            <p className="comment-item-date">{moment(date).locale("ua").format("LLL")}</p>
            <p className="comment-item-text">{text}</p>
          </div>
        </div>
      </Row>
    </div>
  </section>
);

PostCommentItem.propTypes = {
  userId: string,
  userName: string,
  text: string,
  date: number
};

export default PostCommentItem;
