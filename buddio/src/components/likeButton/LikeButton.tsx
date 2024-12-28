import { useState } from 'react';
import starNorth from '../../assets/star-north.svg';
import starBrilliantNorth from '../../assets/starBrilliantNorth.svg';

import axios from 'axios';

export const LikeButton: React.FC<{ postId: string }> = ({ postId }) => {
  const [liked, setLiked] = useState(false);

  const token = localStorage.getItem('accessToken');
  const toggleLike = async () => {
    console.log(token);

    try {
      await axios.put(`http://localhost:5000/posts/${postId}/like`, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setLiked(!liked);
    } catch (error) {}
  };
  return (
    <span onClick={toggleLike}>
      {liked ? <img src={starBrilliantNorth} /> : <img src={starNorth} />}
    </span>
  );
};
