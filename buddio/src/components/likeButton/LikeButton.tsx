import * as motion from 'motion/react-client';

interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
  likesCount: number;
  onLikeToggle: (postId: string, isLiked: boolean) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  isLiked,
  likesCount,
  onLikeToggle,
}) => {
  const handleClick = () => {
    onLikeToggle(postId, !isLiked);
  };

  const heartStyle = {
    width: 24,
    height: 24,
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <span
      onClick={handleClick}
      className="w-full flex items-center justify-start focus:outline-none"
    >
      <motion.svg
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={heartStyle}
       
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={isLiked ? '#FF0000' : '#aaa'}
        />
      </motion.svg>
    </span>
  );
};
