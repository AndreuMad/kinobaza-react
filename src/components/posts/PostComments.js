import React from 'react';
import {string, arrayOf, number, shape, func} from 'prop-types';

import PostCommentsForm from 'Components/posts/PostCommentsForm';
import PostCommentItem from 'Components/posts/PostCommentItem';

const PostComments = ({userId, postId, comments, postComment}) => (
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
                            {comments.length ?
                                comments.map(({_id, user: {_id: userId, name: userName}, date, text}) => (
                                    <PostCommentItem
                                        key={`comment_${_id}`}
                                        userId={userId}
                                        userName={userName}
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

PostComments.propTypes = {
    userId: string,
    postId: string,
    comments: arrayOf(shape({
        _id: string,
        date: number,
        text: string,
        user: shape({
            _id: string,
            name: string
        })
    })),
    postComment: func
};

export default PostComments;
