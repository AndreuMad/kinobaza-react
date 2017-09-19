import React from 'react';

const PostCommentItem = ({ author, date, text, response }) => {
    
    return (
        <section className="comment-item">
            <div className="row">
                <div className="col s-2 m-1"></div>
                <div className="col s-10 m-11">
                    <div className="col-inner">
                        <div className="comment-item-body">
                            <h6 className="comment-item-author">{author}</h6>
                            <p className="comment-item-date">{date}</p>
                            <p className="comment-item-text">{text}</p>
                        </div>
                        {response ?
                            response.map((item) => (
                                <PostCommentItem
                                    key={`${author}/${date}`}
                                    author={item.author}
                                    date={item.date}
                                    text={item.text}
                                    response={item.response}
                                />
                            )) : null}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostCommentItem;
