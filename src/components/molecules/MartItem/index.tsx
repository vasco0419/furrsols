import React, { useEffect, useState } from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import StakeButton from "../../atoms/StakeButton"

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    title: {
      color: theme.palette.text.primary
    },
    fluff: {
      color: theme.syscolor.light
    },
    textField: {
      background: 'rgba(0, 66, 53, 0.1)',
      borderColor: alpha(`${theme.syscolor.light}`, 0.5),
      borderWidth: '2px',
      '& input': {
        borderColor: alpha(`${theme.syscolor.light}`, 0.5)
      }
    },
    neutral: {
      color: theme.syscolor.neutral
    },
    smallFont: {
      fontSize: '0.7rem !important'
    }
  })
)

type Props = {
  children: React.ReactNode,
  className?: string,
  handleBuyMart: any,
  info: {
    image: string,
    title: string,
    fluff: number,
  }
}

const NftItem = (props: Props) => {
  const { info, handleBuyMart } = props;
  const classes = useStyles();

  const [amount, setAmount] = useState<Number>(5);

  const handleChangeAmount = (event: any) => {
    setAmount(parseInt(event.target.value))
  }

  useEffect(() => {
    (async () => {

    })();
  }, []);

  return (
    <div className={`col-12`}>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Grid item md={6} xs={6} className={`pr-8`}>
          <div className={`imageWrapper`}>
            <div className={`imageOver`}>
              <img src={info.image} alt="Right Responsive" />
            </div>
          </div>
        </Grid>

        <Grid item md={6} xs={6} container direction="row" justifyContent="space-between" alignItems="center" className={`pl-8`}>
          <Grid item md={12} xs={12} className={`mb-8`}>
            <p className={`${styles.title} ${classes.title}`}>{info.title}</p>
          </Grid>
          <Grid item md={6} xs={6} className={`mb-4 pr-4`}>
            <p className={`font-12 ${styles.title} ${classes.title}`}>1 piece</p>
          </Grid>
          <Grid item md={6} xs={6} className={`mb-4 pl-4`}>
            <StakeButton
              fullWidth={true}
              className={`pt-0 pr-4 pb-0 pl-4 font-700 ${classes.smallFont}`}
            >
              {info.fluff}FLUFF
            </StakeButton>
          </Grid>
          <Grid item md={6} xs={6} className={`mb-4 pr-4`}>
            <TextField fullWidth value={amount} variant="outlined" size='small' defaultValue={5} onChange={(event) => handleChangeAmount(event)} placeholder="Amount" className={`font-12 ${classes.textField} ${styles.textField}`} />
          </Grid>
          <Grid item md={6} xs={6} className={`mb-4 pl-4`}>
            <StakeButton
              onClick={() => handleBuyMart(info.title, amount)}
              fullWidth={true}
              className={`pt-0 pr-4 pb-0 pl-4 font-700 ${classes.smallFont}`}
            >
              BUY
            </StakeButton>
          </Grid>
          <Grid item md={12} xs={12}>
            <p className={`${styles.descript} ${classes.neutral}`}>Minimum of 5 pieces</p>
            <p className={`${styles.descript} ${classes.neutral}`}>Conversion: 500 Pearls ~ 25000 FLUFF</p>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default NftItem;
