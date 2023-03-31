import React, { Component } from 'react'
import PhotoUpload from './PhotoUpload';

export class Page3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coverPicture: this.props.inputs.coverPicture,
        }
    }
    uploadPhoto = (picture) => {
        this.setState({
            coverPicture: picture,
        })
    }
    goToNextPage = () => {
        const {coverPicture} = this.state;
        this.props.goToNextPage({coverPicture});
    }


    render() {
    return (
        <div>
            <h1>Set your Cover picture</h1>
            <PhotoUpload picture={this.state.coverPicture} uploadPhoto={this.uploadPhoto}/>
            <button onClick={this.goToNextPage}>Next</button>
        </div>
    )
  }
}

export default Page3