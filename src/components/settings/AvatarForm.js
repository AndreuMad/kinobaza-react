import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {string, func} from 'prop-types';

import ImageUpload from 'Components/formComponents/reduxForm/ImageUpload';

class AvatarForm extends Component {
    constructor(props) {
        super(props);

        this.handleLoadStatus = this.handleLoadStatus.bind(this);

        this.state = {
            imageLoaded: false
        };
    }

    handleLoadStatus(status) {
        this.setState({
            imageLoaded: status
        });
    }

    render() {
        const {
            props: {
                handleSubmit,
                handleAvatarEdit
            },
            state: {
                imageLoaded
            },
            handleLoadStatus
        } = this;

        return (
            <form onSubmit={event => event.preventDefault()}>
                <h3>Аватарка</h3>
                <Field
                    component={ImageUpload}
                    handleLoadStatus={handleLoadStatus}
                    label={imageLoaded ? "Змінити аватарку" : "Завантажте аватарку"}
                    name="photo"
                />
                {
                    imageLoaded ? <button
                        onClick={handleSubmit(handleAvatarEdit)}
                    >Send
                    </button> : null
                }
            </form>
        );
    }
}

AvatarForm.propTypes = {
    userId: string,
    handleSubmit: func,
    handleAvatarEdit: func
};

export default reduxForm({form: 'userAvatar'})(AvatarForm);
