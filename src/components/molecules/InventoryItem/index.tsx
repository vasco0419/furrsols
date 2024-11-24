import React, { useEffect } from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { getImg } from "../../../utils/Helper";

import StakeButton from "../../atoms/StakeButton"

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    title: {

    },
    smallFont: {

    },
    neutral: {

    },
    textField: {

    }
  })
)

type Props = {
  children: React.ReactNode,
  className?: string,
  info: {
    image: string,
    title: string,
    fluff: number,
    piece: number,
    amount: number,
    descript: string[]
  }
}

const NftItem = (props: Props) => {
  const { info } = props;
  const classes = useStyles();

  useEffect(() => {
    (async () => {

    })();
  }, []);

  return (
    <div className={`col-12`}>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
        <Grid item md={6} className={`pr-8`}>
          <div className={`imageWrapper`}>
            <div className={`imageOver`}>
              <img src={getImg(info.image)} alt="Right Responsive image" />
            </div>
          </div>
        </Grid>

        <Grid item md={6} container direction="row" justifyContent="space-between" alignItems="center" className={`pl-8`}>
          <Grid item md={12} className={`mb-8`}>
            <p className={`${styles.title} ${classes.title}`}>{info.title}</p>
          </Grid>
          <Grid item md={6} className={`mb-4 pr-4`}>
            <p className={`font-12 ${styles.title} ${classes.title}`}>{info.piece} piece</p>
          </Grid>
          <Grid item md={6} className={`mb-4 pl-4`}>
            <StakeButton
              fullWidth={true}
              className={`pt-0 pr-4 pb-0 pl-4 font-700 ${classes.smallFont}`}
            >
              12FLUFF
            </StakeButton>
          </Grid>
          <Grid item md={6} className={`mb-4 pr-4`}>
            <TextField fullWidth variant="outlined" size='small' defaultValue={`${info.amount}`} onChange={() => { }} placeholder="Amount" className={`font-12 ${classes.textField} ${styles.textField}`} />
          </Grid>
          <Grid item md={6} className={`mb-4 pl-4`}>
            <StakeButton
              fullWidth={true}
              className={`pt-0 pr-4 pb-0 pl-4 font-700 ${classes.smallFont}`}
            >
              BUY
            </StakeButton>
          </Grid>
          {info.descript.map((_sentence, _index) => {
            return (
              <Grid item md={12}>
                <p className={`${styles.descript} ${classes.neutral}`}>{_sentence}</p>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </div>
  )
}

export default NftItem;
