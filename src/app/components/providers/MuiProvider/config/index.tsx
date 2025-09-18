import palette from "./theme/palette";
import typography from "./theme/typography";
import { createTheme } from "@mui/material";
import componentsTheme from "./theme/components";
const theme = createTheme({
  palette: { ...palette },
  typography: { ...typography },
  components: {
    ...componentsTheme
  }
})

export default theme