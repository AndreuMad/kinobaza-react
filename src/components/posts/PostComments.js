import React from 'react';
import PostCommentsForm from 'Components/posts/PostCommentsForm';
import PostCommentItem from 'Components/posts/PostCommentItem';

const PostComments = ({ userId, postId, comments, postComment }) => {
    return (
        <section className="post-comments">
            <div className="container">
                <div className="row">
                    <div className="col m-10 m-offset-1">
                        <div className="col-inner">
                            <h3 className="post-comments-title">Коментарі</h3>

                            <div className="post-comments-form">
                                <PostCommentsForm
                                    userId={userId}
                                    postId={postId}
                                    postComment={postComment}
                                />
                            </div>

                            <div className="post-comments-wrap">
                                {comments ?
                                    comments.map(({ _id, user, date, text }) => (
                                        <PostCommentItem
                                            key={`comment_${_id}`}
                                            user={user}
                                            date={date}
                                            text={text}
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
