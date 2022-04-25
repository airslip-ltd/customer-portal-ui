import PropTypes from 'prop-types';
// material
import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, Box, Stack, Link } from '@mui/material';
import ProviderImage from './ProviderImage';
import { HelpDialogue } from '../_common';

ManualInstall.propTypes = {
  provider: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function ManualInstall({ onClose, open, provider }) {
  const handleCancel = () => {
    onClose();
  };

  if (!provider) return <></>;

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>
        <Stack spacing={1} direction="row">
          <ProviderImage
            width={30}
            height={30}
            provider={provider.id}
            integrationType={provider.integrationType}
            fileType="icon"
          />
          <Box>Let's connect {provider.friendlyName}</Box>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <DialogContentText>
            For us to complete a connection to {provider.friendlyName} we need carry out some manual steps. Our team of
            experts will be happy to take you through the steps required.
          </DialogContentText>

          <Button
            component={Link}
            href="https://support.airslip.com/hc/en-us/requests/new"
            target="_blank"
            variant="contained"
          >
            Create a Support Ticket
          </Button>

          <HelpDialogue title="Need some help?">
            If you're stuck and need some help, please have a look at this&nbsp;
            <Link href="https://support.airslip.com/hc/en-us/articles/5674844360081" target="_blank">
              knowledge article
            </Link>
          </HelpDialogue>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleCancel}>
              Done
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
