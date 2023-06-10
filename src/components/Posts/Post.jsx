import React, { useState } from "react";
import CardLayout from "../Layouts/CardLayout";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import defaultProfilePicture from "../../defaultProfilePicture.svg";
import Comments from "./Comments";

function Post(props) {
  const { post, postPage, likePost, deletePost, user } = props;

  const [showComments, setShowComments] = useState(false);

  const getProfilePicture = (post) => {
    if (post.author._id === user._id)
      return user.profilePicture
        ? `${process.env.REACT_APP_SERVER_URL}/${user.profilePicture}`
        : defaultProfilePicture;

    return post.author.profilePicture
      ? `${process.env.REACT_APP_SERVER_URL}/${post.author.profilePicture}`
      : defaultProfilePicture;
  };

  const getFormattedDate = (date) => {
    const currentDate = new Date();
    const isSameYear = date.getFullYear() === currentDate.getFullYear();

    const options = {
      day: 'numeric',
      month: 'short',
    };

    if (!isSameYear) {
      options.year = 'numeric';
    }

    const formattedDate = date.toLocaleString('en-US', options);
    const timePeriod = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${formattedDate} at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} ${timePeriod}`;
  }

  const { description, image, numOfComments, numOfLikes, createdAt, isLiked } = post;

  return (
    <CardLayout>
      <div className="flex items-center ml-2">
        <img
          crossOrigin="anonymous"
          src={getProfilePicture(post)}
          className="h-12 w-12 rounded-full mr-2"
          alt={post.author._id === user._id ? user.username : post.author.username}
        />
        <div className="text-gray-300 grow">
          <p className="text-md">
            {post.author._id === user._id ? user.username : post.author.username}
          </p>
          <p className="text-xs font-thin">
            {getFormattedDate(new Date(createdAt))}
          </p>
        </div>
        {postPage === "profile" ? (
          <button className="text-gray-300 mr-4" onClick={() => deletePost(post)}>
            <CloseIcon fontSize="small" />
          </button>
        ) : null}
      </div>
      <div className="text-gray-300 mt-4 font-light ml-2">
        <p>{description}</p>

        {image.length > 0 ? (
          <div className="postImages">
            {image.map((img, index) => {
              return (
                <img
                  crossOrigin="anonymous"
                  src={`${process.env.REACT_APP_SERVER_URL}/${img}`}
                  alt=""
                  key={index}
                />
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="text-gray-400/80 flex mt-4 ml-2">
        <div className="flex items-center">
          <ThumbUpOutlinedIcon fontSize="small" />
          <span className="ml-1">{numOfLikes}</span>
        </div>
        <div className="flex items-center ml-4">
          <ForumOutlinedIcon fontSize="small" />
          <span className="ml-1">{numOfComments}</span>
        </div>
      </div>

      <div className="text-gray-400/80 flex mt-6 border-y-[0.5px] border-t-gray-300/70 py-1.5">
        <button
          className="w-1/2 cursor-pointer hover:bg-gray-600/60 rounded-lg py-1 flex items-center justify-center"
          onClick={() => likePost(post)}
        >
          {!isLiked ? <FavoriteBorderOutlinedIcon /> : <FavoriteIcon />}
          <span className="ml-1">Like</span>
        </button>
        <button
          className="w-1/2 cursor-pointer hover:bg-gray-600/60 rounded-lg py-1 flex items-center justify-center"
          onClick={() => setShowComments((status) => !status)}
        >
          <ChatBubbleOutlineOutlinedIcon />
          <span className="ml-1">Comment</span>
        </button>
      </div>

      <div>{showComments ? <Comments post={post} /> : null}</div>
    </CardLayout>
  );
}

export default Post;
