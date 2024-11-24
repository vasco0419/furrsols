import React, { useEffect, useState } from "react"

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'

import CloseIcon from '@material-ui/icons/Close'

import StakeButton from "../../atoms/StakeButton"

import styles from './index.module.scss'
import { useResize } from './../../../utils/Helper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    content: {
      background: '#0E1B1A',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: alpha(`${theme.syscolor.light}`, 0.1)
    },
    remainTime: {
      color: theme.palette.text.primary,
    },
    title: {
      color: theme.palette.text.primary
    },
    infoTable: {

    },
    light: {
      color: theme.syscolor.light
    },
    primary: {
      color: theme.palette.text.primary
    },
    textField: {
      background: 'rgba(0, 66, 53, 0.1)',
      borderColor: alpha(`${theme.syscolor.light}`, 0.5),
      borderWidth: '2px',
      '& input': {
        borderColor: alpha(`${theme.syscolor.light}`, 0.5)
      }
    },
  })
)

type Props = {
  children: React.ReactNode,
  className?: string,
  wallet: any,
  openDepositModal: any,
  setOpenDepositModal: any,
  handleDeposit: any
}

const DepositModal = (props: Props) => {
  const { setOpenDepositModal, openDepositModal, handleDeposit, wallet } = props
  const classes = useStyles()

  const [amount, setAmount] = useState(0)
  const { isMobile } = useResize()

  useEffect(() => {
    setAmount(0)
    return (() => {
      setAmount(0)
    })()
  }, [openDepositModal])
  const handleSetAmount = (event: any) => {
    setAmount(event.target.value === '' ? 0 : parseInt(event.target.value))
  }

  const handleClose = () => {
    setAmount(0)
    setOpenDepositModal(false)
  }

  return (
    <Modal
      open={openDepositModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={`${styles.root} ${classes.root}`}
    >
      <div className={`${styles.content} ${classes.content}`}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item md={4} xs={6}>
            <div className={`imageWrapper`}>
              <div className={`imageOver`}>
                <img src='/assets/marts/ball.png' alt="Right Responsive" />
              </div>
            </div>
          </Grid>

          <Grid item md={8} xs={6} container direction="row" justifyContent="space-between" className={!isMobile ? `pl-32` : `pl-16`}>
            <div className={`d-flex align-items-center col-12`}>
              <span className={`${styles.title} ${classes.title}`}>{!isMobile ? `FLUFF` : ``} Collected: {wallet.fluff}</span>
            </div>
            <div className={`col-8 mt-16`}>
              <TextField fullWidth value={amount} onChange={(event) => handleSetAmount(event)} variant="outlined" size='small' defaultValue={5} placeholder="Amount" className={`font-12 ${classes.textField} ${styles.textField}`} />
            </div>
            <div className={`${!isMobile ? `col-4 mt-16` : `col-12 mt-16`}`}>
              <StakeButton
                className={`font-sm line-height-1 pt-8 pr-16 pb-8 pl-16 font-700`}
                onClick={() => handleDeposit(amount)}
                fullWidth={false}
              >
                Deposit {!isMobile ? `FLUFF` : ``}
              </StakeButton>
            </div>
          </Grid>
        </Grid>

        <div className={`mt-16 mr-16 ${styles.close}`}><CloseIcon className={`${classes.primary}`} onClick={handleClose} /></div>
      </div>
    </Modal>
  )
}

export default DepositModal
