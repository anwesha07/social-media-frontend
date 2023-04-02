import React from 'react'

function Profile() {
  return (
    <div>
      <div className='profile header'>
        <div className='coverPicture' >
          coverPicture
          <button>Edit cover picture</button>
        </div>
        <div className='profileDetails'>
          profile picture
          username
          <button>followers</button>
          <button>following</button>
          <button>Edit profile</button>
        </div>
      </div>
      <div className='lowerProfileContent'>
        <div className='posts'>posts</div>
      </div>
    </div>
  )
}

export default Profile