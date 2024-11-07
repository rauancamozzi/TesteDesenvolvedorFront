import React, { useState } from "react";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
interface CommentProps {
  onSubmit: (comment: string) => Promise<void>;
}

const Comment: React.FC<CommentProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submitComment = async () => {
    if (comment.trim()) {
      try {
        await onSubmit(comment);
        setSnackbarMessage('Avaliação enviada com sucesso!');
        setSnackbarSeverity('success');
      } catch (error) {
        setSnackbarMessage('Erro ao enviar a avaliação: ' + error);
        setSnackbarSeverity('error');
      }
      setComment("");
      setOpenSnackbar(true);
    }
  };

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%" boxSizing="border-box" padding="12px">
      <TextField
        label="Escreva um comentário"
        variant="outlined"
        multiline
        rows={2}
        value={comment}
        onChange={updateComment}
        fullWidth
        sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#d1d5db',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1f2937',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#9ca3af', 
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#1f2937',
        },
        }}
      />
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button
          variant="contained"
          onClick={submitComment}
          disabled={!comment.trim()}
          sx={{
            width:'25%',
            backgroundColor: '#374151',
            color: '#f9fafb',
            fontWeight: 'bold',
            borderRadius: '8px',
          }}
        >
          Enviar
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          position: 'absolute', 
          bottom: 20, 
          left: '50%', 
          transform: 'translateX(-50%)',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Adiciona sombra
        }}
      >
        <Alert onClose={closeSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Comment;
