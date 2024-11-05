import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface CommentProps {
  onSubmit: (comment: string) => void;
}

const Comment: React.FC<CommentProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  }
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
    >
      <TextField 
        label="Escreva um comentário"
        variant="outlined"
        multiline
        rows={4}
        value={comment}
        onChange={handleChange}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!comment.trim()}
      >
        Enviar
      </Button>
    </Box>
  )
}

export default Comment;