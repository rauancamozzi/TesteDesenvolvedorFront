

const formatPokemonName = (name: string): string => {
  if (name.includes('-m')) {
    return name.replace('-m', ' (macho)');
  }

  if (name.includes('-f')) {
    return name.replace('-f', ' (fêmea)');
  }
  
  return name;
}

export default formatPokemonName;