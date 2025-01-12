import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { api } from '../../services/api';

interface FollowButtonProps {
  folllowingUserId: string;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  folllowingUserId,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [userFollowerId, setUserFollowerId] = useState<string>('');

  useEffect(() => {
    const checkifFollowing = async () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        const decodedToken = jwtDecode<{ id: string }>(token);
        setUserFollowerId(decodedToken.id);
      }

      try {
        const response = await api.get(`/isFollowing/${folllowingUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('Erro ao verificar status de follow: ', error);
      }
    };

    checkifFollowing();
  }, [folllowingUserId]);

  const handleFollowToggle = async () => {
    const token = localStorage.getItem('accessToken');

    const url = isFollowing
      ? `${api}/unfollow/${folllowingUserId}`
      : `${api}/follow/${folllowingUserId}`;

    try {
      const response = await axios({
        method: isFollowing ? 'DELETE' : 'POST',
        url,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          userFollowerId,
        },
      });
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.log('Erro ao seguir usuário: ', error);
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      className={`${
        isFollowing ? 'bg-black text-white' : ' bg-white text-black '
      } border-black text-xs px-3 py-1 uppercase h-10 rounded-none outline-none`}
    >
      {isFollowing ? 'Seguindo' : 'Seguir'}
    </button>
  );
};
