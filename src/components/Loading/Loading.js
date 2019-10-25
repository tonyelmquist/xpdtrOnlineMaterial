import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  aligner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  progress: {
    maxWidth: '50%',
  }
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.aligner}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}