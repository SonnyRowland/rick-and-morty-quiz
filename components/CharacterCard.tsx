import { Image } from "react-native";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";

import { styles } from "@/styles/CharacterCard.styles";

type CharacterCardProps = {
  name: string;
  image: string;
};

export const CharacterCard = (props: CharacterCardProps) => {
  const { name, image } = { ...props };

  return (
    <Box style={styles.box}>
      <Heading size="xl">{name}</Heading>
      <Image source={{ uri: image }} style={styles.image} />
    </Box>
  );
};
