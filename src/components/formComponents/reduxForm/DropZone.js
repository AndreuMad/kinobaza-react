import React, { Component } from 'react';
import { string, func, shape } from 'prop-types';
import Dropzone from 'react-dropzone';

class DropZoneCustom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: ''
    };
  }

  handleLoad = (files) => {
    const {
      input: {
        onChange
      },
      handleLoadStatus
    } = this.props;

    const reader = new FileReader();
    const file = files[0];

    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result
      }, () => {
        handleLoadStatus(true);
      });
    };
    reader.readAsDataURL(file);
    onChange(file);
  };

  render() {
    const {
      props: {
        input: {
          name
        },
        label,
        avatar
      },
      state: {
        imageUrl
      },
      handleLoad
    } = this;

    return (
      <div>
        <Dropzone
          name={name}
          onDrop={(filesToUpload, filesRejected) => handleLoad(filesToUpload)}
        />
        <p>{label}</p>
        {
          imageUrl || avatar ?
            <div className="image-preview">
              <img src={imageUrl || `http://localhost:8081/${avatar}`} alt="User Avatar" />
            </div> : null
        }
      </div>
    );
  }
}

DropZoneCustom.propTypes = {
  input: shape({
    name: string.isRequired,
    onChange: func.isRequired
  }),
  handleLoadStatus: func.isRequired,
  label: string,
  avatar: string
};

DropZoneCustom.defaultProps = {
  label: '',
  avatar: ''
};

export default DropZoneCustom;
