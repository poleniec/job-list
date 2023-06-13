import { Box, Button, TextField } from '@mui/material';

function ApplyPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Imię"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Wiadomość"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button variant="outlined" href="#outlined-buttons">
  SEND
</Button>
      </form>
    </Box>
  );
}

export default ApplyPage;
