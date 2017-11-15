import React from 'react';
import ReactEmoji from 'react-emoji';
import {Link} from 'react-router-dom';

import moment from 'moment';
import 'NodeModules/moment/locale/uk';

const PostCommentItem = ({ userId, userName, date, text }) => {
    
    return (
        <section className="comment-item">
            <div className="comment-item-body">
                <div className="row">
                    <div className="col s-2 m-1"></div>
                    <div className="col s-10 m-11">
                        <div className="col-inner">
                            <h6 className="comment-item-author">
                                <Link to={`/users/${userId}`}>
                                    {userName}
                                </Link>
                            </h6>
                            <p className="comment-item-date">{moment(date).locale("ua").format("LLL")}</p>
                            <p className="comment-item-text">{ReactEmoji.emojify(text)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostCommentItem;
