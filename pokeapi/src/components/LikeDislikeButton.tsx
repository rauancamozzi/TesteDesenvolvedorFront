import { IconButton, Stack } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React, { useState } from 'react';

interface LikeDislikeButtonProps {
  onChoice: (choice: 'like' | 'dislike' | null) => void;
}

const LikeDislikeButton: React.FC<LikeDislikeButtonProps> = ({ onChoice }) => {
  const [choice, setChoice] = useState<'like' | 'dislike' | null>(null);

  const onClickLike = () => {
    if (choice === 'like') {
      setChoice(null);
      onChoice(null);
    } else {
      setChoice('like');
      onChoice('like');
    }
  };

  const onClickDislike = () => {
    if (choice === 'dislike') {
      setChoice(null);
      onChoice(null);
    } else {
      setChoice('dislike');
      onChoice('dislike');
    }
  }

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 1/5,
        padding: '12px',
        gap: '2px'
      }}
    >
        <IconButton
          color={choice === 'like' ? 'success' : 'default'}
          onClick={onClickLike}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            width: 'auto',
            height: 'auto',
            borderRadius: '8px',
          }}
        >
          <ThumbUpIcon />
        </IconButton>
        <IconButton
          color={choice === 'dislike' ? 'error' : 'default'}
          onClick={onClickDislike}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            width: 'auto',
            height: 'auto',
            borderRadius: '8px',
          }}
        >
          <ThumbDownIcon />
        </IconButton>
      </Stack>
  )
}

export default LikeDislikeButton;