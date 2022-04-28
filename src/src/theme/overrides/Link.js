// ----------------------------------------------------------------------

export default function Link(theme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      },

      styleOverrides: {
        root: {
          '&:hover': {
            color: theme.palette.button.hover
          },
          color: theme.palette.common.black
        }
      }
    }
  };
}
