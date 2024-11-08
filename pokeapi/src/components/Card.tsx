import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

interface CardProps {
  title: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ title, text }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? 0 : '4px',
        borderRadius: isMobile ? '8px' : '16px',
        flex: 1,
        width: '100%',
        backgroundColor: '#f3f4f6',
        border: 'solid 1px',
        borderColor: '#e5e7eb',
        padding: '2px'
      }}
    >
      <Typography
        sx={{
          color: '#4b5563',
          fontSize: isMobile ? '12px' : '16px',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: isMobile ? '20px' : '32px',
          fontWeight: 'bold',
          color: '#374151',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Card;
