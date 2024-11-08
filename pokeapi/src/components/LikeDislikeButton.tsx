import { IconButton, Stack, useMediaQuery, useTheme } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React, { useState } from 'react';

interface LikeDislikeButtonProps {
  onChoice: (choice: 'like' | 'dislike' | null) => void;
}

const LikeDislikeButton: React.FC<LikeDislikeButtonProps> = ({ onChoice }) => {
  const [choice, setChoice] = useState<'like' | 'dislike' | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        flexDirection: isMobile ? 'row' : 'column',
        boxSizing: 'border-box',
        width: isMobile ? '100%' : 1/5,
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
            height: 'auto',
            borderRadius: '8px',
            flex: 1
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
            height: 'auto',
            borderRadius: '8px',
            flex: 1
          }}
        >
          <ThumbDownIcon />
        </IconButton>
      </Stack>
  )
}

export default LikeDislikeButton;