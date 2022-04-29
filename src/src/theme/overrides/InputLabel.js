// ----------------------------------------------------------------------

export default function Input(theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: theme.palette.common.black
          }
        }
      }
    }
  };
}
