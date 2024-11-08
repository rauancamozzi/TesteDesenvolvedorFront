const formatPokemonAbilityName = (name: string): string => {
  if (!name.includes("-")) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  } else {
    const [firstWord, secondWord] = name.split("-");
    const formattedFirstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    const formattedSecondWord = secondWord.charAt(0).toUpperCase() + secondWord.slice(1);
    
    return `${formattedFirstWord} ${formattedSecondWord}`;
  }
}

export default formatPokemonAbilityName;