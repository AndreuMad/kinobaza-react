import React from 'react';
import PostCommentsForm from 'Components/posts/PostCommentsForm';
import PostCommentItem from 'Components/posts/PostCommentItem';

const PostComments = ({ comments }) => {
    return (
        <section className="post-comments">
            <div className="container">
                <div className="row">
                    <div className="col m-10 m-offset-1">
                        <div className="col-inner">
                            <h3 className="post-comments-title">Коментарі</h3>

                            <div className="post-comments-form">
                                <PostCommentsForm />
                            </div>

                            <div className="post-comments-wrap">
                                {comments ?
                                    comments.map(({ author, date, text, response } ) => (
                                        <PostCommentItem
                                            key={`${author}/${date}`}
                                            author={author}
                                            date={date}
                                            text={text}
                                            response={response}
                                        />
                                    )) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PostComments;
