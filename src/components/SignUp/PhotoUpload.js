import React, { Component } from 'react'

export class PhotoUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: this.props.picture,
            preview: null,
        };
        this.fileInputRef = React.createRef();
    }

    //set the blob whenever user enters this page
    componentDidMount() {
        if (this.state.picture) this.generatePreview();
    }

    //remove blob from memory to avoid memory leaks
    componentWillUnmount() {
        this.removePreview();
    }

    generatePreview = () => {
        const {picture} = this.state;
        this.setState({
            preview: URL.createObjectURL(picture) //creating a blob and returning its url
        });
    }

    removePreview = () => {
        const {preview} = this.state;
        if (preview) URL.revokeObjectURL(preview); //removing the blob from memory to prevent memory leak
        this.setState({
            preview: null,
        })
    }


    onChangePicture = (e) => {
        if (e.target.files[0]) {

            console.log(e.target.files[0])
            this.removePreview();
            this.setState({
                picture:e.target.files[0],  //setting the file object in state
            }, ()=>{
                this.generatePreview();
                this.props.uploadPhoto(this.state.picture);
            });
            
        }

    }

    removePicture = () => {
        const {picture} = this.state;
        if (picture) {
            this.removePreview();
            this.fileInputRef.current.value = '';
            this.setState({
                picture:'',
            }, ()=>{
                console.log(this.state.picture)
                this.props.uploadPhoto(this.state.picture);
            });
            
        }
    }

    // submitPage = (e) => {
    //     e.preventDefault();
    //     const {picture} = this.state;
    //     this.props.goToNextPage(picture);
    // }
    
    render() {
    return (
        <div>
            <form>
                <input type="file" accept="image/*" onChange={this.onChangePicture} ref={this.fileInputRef} />
               
            </form>
            {
                this.state.preview && 
                <div>
                    <img src={this.state.preview} />
                    <button onClick={this.removePicture}>&times;</button>
                </div>
            }
        </div>
    )
  }
}

export default PhotoUpload