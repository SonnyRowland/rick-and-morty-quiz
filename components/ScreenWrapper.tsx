import { Box } from "@/components/ui/box";
import { ReactNode } from "react";

import { styles } from "@/styles/ScreenWrapper.styles";

export const ScreenWrapper = ({ children }: { children: ReactNode }) => {
  return <Box style={styles.container}>{children}</Box>;
};
