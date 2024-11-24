import * as React from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import styles from './index.module.scss';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.syscolor.light,
      borderColor: theme.syscolor.light,
      borderStyle: 'solid',
      borderWidth: '1px',
      padding: '4px 12px',
      color: theme.syscolor.dark,
      '&.active': {
        background: 'none',
        color: theme.syscolor.light,
        '&:hover': {
          background: theme.syscolor.light,
          color: theme.syscolor.dark
        },
      },
      '&:hover': {
        background: 'none',
        color: theme.syscolor.light,
      },
      '&:disabled': {
        borderColor: alpha(`${theme.syscolor.light}`, 0.5),
        background: alpha(`${theme.syscolor.light}`, 0.5),
        color: alpha(`${theme.syscolor.dark}`, 0.5)
      }
    }
  })
)

type Props = {
  children: React.ReactNode,
  enabled?: boolean,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  fullWidth?: boolean
}

const StakeButton = (props: Props) => {
  const { children, enabled, className, onClick, fullWidth } = props;
  const classes = useStyles();
  return <Button
    variant="contained"
    fullWidth={fullWidth === undefined ? true : fullWidth}
    className={`${className} ${styles.root} ${classes.root}`}
    disabled={enabled === undefined ? false : !enabled}
    onClick={onClick}
  >
    {children}
  </Button>
}

export default StakeButton;
