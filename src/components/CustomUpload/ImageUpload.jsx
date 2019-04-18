import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";
// core components
import Button from "./../../components/CustomButtons/Button.jsx";

//import defaultImage from "./../../assets/img/image_placeholder.jpg";
import avatar from '../../assets/img/faces/avatar.png';
//import defaultAvatar from "./../../assets/img/placeholder.jpg"; 
//"assets/img/placeholder.jpg";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: (props.basic) ? this.props.foto : avatar
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.foto !== this.props.foto) { 
        this.setState({
          imagePreviewUrl: nextProps.foto
        });
    }
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if(file) {
      reader.onloadend = () => {
        this.setState({
          file: null,
          imagePreviewUrl: reader.result
        });
                
        this.props.change(reader.result);
      };
      reader.readAsDataURL(file);
     // reader.readAsBinaryString(file);

      this.refs.fileInput.value = null;
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    //console.log(this.state.file);
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: avatar
    });
    this.refs.fileInput.value = null;
  }
  render() {
    var {
      basic,
      addButtonProps,
      changeButtonProps,
      removeButtonProps,
      css
    } = this.props;

    const { imagePreviewUrl, file } = this.state;
  
    return (
      <div className="fileinput text-center">
        <input type="file" onChange={this.handleImageChange} ref="fileInput" />
        <div className={"thumbnail" + (basic ? " img-circle" : "")}>       
          <img src={imagePreviewUrl} alt="..." className={css} />
        </div>
        <div>
          {imagePreviewUrl === avatar ? (
            <Button {...addButtonProps} onClick={() => this.handleClick()}  size="sm">
              {basic ? "Adicionar" : "Selecionar"}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => this.handleClick()}  size="sm">
                Alterar
              </Button>
              {basic ? <br /> : null}
              <Button
                {...removeButtonProps}
                onClick={() => this.handleRemove()}
                size="sm"
              >
                <i className="fas fa-times" /> Remover
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  basic: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default ImageUpload;



// WEBPACK FOOTER //
// ./src/components/CustomUpload/ImageUpload.jsx