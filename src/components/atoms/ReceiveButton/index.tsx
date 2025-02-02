import * as React from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import styles from './index.module.scss';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: '#0D3C46',
      borderColor: theme.syscolor.light,
      borderStyle: 'solid',
      borderWidth: '1px',
      color: theme.syscolor.light,
      '&:hover': {
        background: theme.syscolor.light,
        color: theme.syscolor.dark,
        borderColor: theme.syscolor.dark
      },
      '&:disabled': {
        color: alpha(`${theme.syscolor.light}`, 0.1),
        borderColor: alpha(`${theme.syscolor.light}`, 0.1)
      }
    }
  })
)

type Props = {
  children: React.ReactNode,
  enabled?: boolean,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const DespawnButton = (props: Props) => {
  const { children, enabled, className, onClick } = props;
  const classes = useStyles();
  return <Button
    variant="contained"
    className={`${className} ${styles.root} ${classes.root}`}
    disabled={enabled === undefined ? false : !enabled}
    onClick={onClick}
  >
    {children}
  </Button>
}

export default DespawnButton;
