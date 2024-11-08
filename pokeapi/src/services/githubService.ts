import axios from 'axios';

export const getGitHubId = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);

    return response.data.id;
  } catch (error) {
    console.log('Erro ao buscar o GitHub ID do usuário: ', error);
    throw error;
  }
};