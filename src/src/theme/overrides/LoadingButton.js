// ----------------------------------------------------------------------

export default function LoadingButton(theme) {
  console.log(theme);
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-text': {
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0
            }
          },
          '&:hover': {
            backgroundColor: theme.palette.button.hover
          },
          backgroundColor: theme.palette.button.standard,
          color: theme.palette.button.text
        }
      }
    }
  };
}
