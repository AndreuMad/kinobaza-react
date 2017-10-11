import React from 'react';
import PostCommentItem from 'Components/posts/components/PostCommentItem';

const PostComments = ({ comments }) => {
    return (
        <section className="post-comments">
            <div className="container">
                <div className="row">
                    <div className="col m-10 m-offset-1">
                        <div className="col-inner">
                            <h3 className="post-comments-title">Коментарі</h3>

                            {comments.map((comment) => {
                                const { author, date, text, response } = comment;

                                return (
                                    <PostCommentItem
                                        key={`${author}/${date}`}
                                        author={author}
                                        date={date}
                                        text={text}
                                        response={response}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostComments;
