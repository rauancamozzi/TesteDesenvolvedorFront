import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IconButton, Stack } from '@mui/material';

const LikeDislikeButton = () => {
  const [like, setLike] = useState<boolean>(false);
  const [dislike, setDislike] = useState<boolean>(false);
  const [userChoice, setUserChoice] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    if (userChoice === 'like') {
      setLike(false);
      setUserChoice(null);
    } else {
      setLike(true);
      if (userChoice === 'dislike') setDislike(false);
      setUserChoice('like');
    }
  };

  const handleDislike = () => {
    if (userChoice === 'dislike') {
      setDislike(false);
      setUserChoice(null);
    } else {
      setDislike(true);
      if (userChoice === 'like') setLike(false);
      setUserChoice('dislike');
    }
  }

  return (
    <Stack direction="row">
      <IconButton color={userChoice === 'like' ? 'success' : 'default'} onClick={handleLike}>
        <ThumbUpIcon />
      </IconButton>
      <IconButton color={userChoice === 'dislike' ? 'error' : 'default'} onClick={handleDislike}>
        <ThumbDownIcon />
      </IconButton>
    </Stack>
  )
}

export default LikeDislikeButton;