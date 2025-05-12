import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Lottie from 'lottie-react';
import alertAnimation from '../animations/alert_animation.json';

export function AlertDialog({
  alertOpen,
  handleCloseAlert,
  alertText,
  confirmText = 'OK',
  cancelText = 'Cancel',
  title,
}: {
  alertOpen: boolean;
  handleCloseAlert: () => void;
  alertText: string;
  confirmText?: string;
  cancelText?: string;
  title?: string;
}) {
  return (
    <Dialog
      open={alertOpen}
      onClose={handleCloseAlert}
      aria-labelledby="alert-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
        <Lottie
          animationData={alertAnimation}
          loop={true}
          style={{
            width: '100%',
            maxWidth: '100px',
            maxHeight: '100px',
          }}
        />
        <Typography variant="h6" fontWeight="bold" color="var(--text-title)" ml={2}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>{alertText}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseAlert}
          autoFocus
          sx={{
            bgcolor: 'var(--highlight)',
            color: 'white',
            '&:hover': { bgcolor: '#F57C00' },
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
