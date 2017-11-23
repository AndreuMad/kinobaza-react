import React, { Component } from 'react';

class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imageUrl: ''
        };

        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleImageChange(event) {
        event.preventDefault();

        const {
            input: {
                onChange
            }
        } = this.props;
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file,
                imageUrl: reader.result
            }, () => onChange(reader.result));
        };
        reader.readAsDataURL(file);
    }

    render() {
        const {
            handleImageChange,
            state: {
                imageUrl
            },
            props: {
                label,
                input: {
                    name
                }
            }
        } = this;

        return (
            <div className="upload-file">
                <label className="btn gradient-purple">
                    <span>{label}</span>
                    <input
                        type="file"
                        name={name}
                        onChange={handleImageChange}
                    />
                </label>
                {
                    imageUrl ?
                        <div className="image-preview">
                            <img src={imageUrl} alt="image" />
                        </div> : null
                }
            </div>
        )
    }
}

export default ImageUpload;
