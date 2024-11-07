import { IconButton, Stack } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import React, { useState } from 'react';

interface LikeDislikeButtonProps {
  onChoice: (choice: 'like' | 'dislike' | null) => void;
}

const LikeDislikeButton: React.FC<LikeDislikeButtonProps> = ({ onChoice }) => {
  const [choice, setChoice] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    if (choice === 'like') {
      setChoice(null);
      onChoice(null);
    } else {
      setChoice('like');
      onChoice('like');
    }
  };

  const handleDislike = () => {
    if (choice === 'dislike') {
      setChoice(null);
      onChoice(null);
    } else {
      setChoice('dislike');
      onChoice('dislike');
    }
  }

  return (
    <Stack direction="row">
        <IconButton
          color={choice === "like" ? "success" : "default"}
          onClick={handleLike}
        >
          <ThumbUpIcon />
        </IconButton>
        <IconButton
          color={choice === "dislike" ? "error" : "default"}
          onClick={handleDislike}
        >
          <ThumbDownIcon />
        </IconButton>
      </Stack>
  )
}

export default LikeDislikeButton;