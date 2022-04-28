// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none'
          },
          color: theme.palette.button.standard
        },
        sizeLarge: {
          height: 48
        },
        // contained
        containedInherit: {
          boxShadow: theme.customShadows.z8,
          color: theme.palette.button.text,
          '&:hover': {
            backgroundColor: theme.palette.button.hover
          },
          backgroundColor: theme.palette.button.standard
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
          color: theme.palette.button.text,
          '&:hover': {
            backgroundColor: theme.palette.button.hover
          },
          backgroundColor: theme.palette.button.standard
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary
        },
        containedInfo: {
          boxShadow: theme.customShadows.info
        },
        containedSuccess: {
          boxShadow: theme.customShadows.success
        },
        containedWarning: {
          boxShadow: theme.customShadows.warning
        },
        containedError: {
          boxShadow: theme.customShadows.error
        },
        // outlined
        outlinedPrimary: {
          border: `1px solid ${theme.palette.common.black}`,
          color: theme.palette.common.black,
          '&:hover': {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  };
}
