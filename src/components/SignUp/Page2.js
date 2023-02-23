import React, { Component } from 'react'
import PhotoUpload from './PhotoUpload';

export class Page2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: this.props.inputs.profilePicture,
            description: this.props.inputs.description,
        }
    }

    uploadPhoto = (picture) => {
        this.setState({
            profilePicture: picture,
        })
    }

    goToNextPage = () => {
        const {profilePicture, description} = this.state;
        this.props.goToNextPage({profilePicture, description});
    }
    setDescription = (event) => {
        this.setState({
            description: event.target.value,
        })
    }


    render() {
    return (
        <div>
            <h1>Set your Profile picture</h1>
            <PhotoUpload picture={this.state.profilePicture} uploadPhoto={this.uploadPhoto}/>
            {/* goToNextPage={(profilePicture) => this.props.goToNextPage({profilePicture})} */}
            <h2>Enter a description:</h2>
            <textarea id="description" name="description" rows="4" cols="50" value={this.state.description} onChange={this.setDescription}/>
            <button onClick={this.goToNextPage}>Next</button>
        </div>
    )
  }
}

export default Page2