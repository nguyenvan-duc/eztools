import '../styles/globals.css'
import React,{useState} from 'react'
import { SWRConfig } from "swr"
import { api } from "../services/api"
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import "currency-flags/dist/currency-flags.min.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
function MyApp({ Component, pageProps }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        x
      </IconButton>
    </React.Fragment>
  );
  const [errorCount, setErrorCount] = useState(1)

  const errorCallback = () => {
    setErrorCount((count) => count + 1)

    if (errorCount === 2) {
      return(
        <div>
        <Button onClick={handleClick}>Open simple snackbar</Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        />
      </div>
      )
    }
  }
  return(
    <SWRConfig
      value={{
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 60 * 24, // API limitation: Data refreshes only everyday. Change value when you upgrade plan
      fetcher: (url) =>
        api()
          .get(url)
          .then((response) => response.data),
      errorRetryCount: 2,
      onError: errorCallback,
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>
  )
}

export default MyApp
