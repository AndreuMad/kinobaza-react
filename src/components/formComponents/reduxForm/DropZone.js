import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class DropZoneCustom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      imageUrl: ''
    };

    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad(files) {
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
        file,
        imageUrl: reader.result
      }, () => {
        handleLoadStatus(true);
        onChange(file);
      });
    };
    reader.readAsDataURL(file);
  }

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
              <img src={imageUrl || `http://localhost:8081/${avatar}`} alt="image" />
            </div> : null
        }
      </div>
    );
  }
}

export default DropZoneCustom;
