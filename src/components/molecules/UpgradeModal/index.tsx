import React, { useEffect } from "react"

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CloseIcon from '@material-ui/icons/Close'

import { getImg } from "../../../utils/Helper"

import StakeButton from "../../atoms/StakeButton"

import styles from './index.module.scss'

import UPGRADE from "../../../constants/upgrade"

import { IFurrsol } from '../../../pages/Frontend/DashboardPage/reducer'

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
    neutral: {
      color: theme.syscolor.neutral
    },
    menuItem: {
      background: 'none',
      color: theme.syscolor.neutral,
      '&*': {
        background: 'none',
      }
    },
    select: {
      background: 'none',
      color: theme.palette.text.primary
    }
  })
)

type Props = {
  children: React.ReactNode,
  className?: string,
  openUpgradeModal: boolean,
  setOpenUpgradeModal: any,
  handleUpgrade: any,
  furrsol: undefined | IFurrsol,
}

const UpgradeModal = (props: Props) => {
  const { openUpgradeModal, setOpenUpgradeModal, handleUpgrade, furrsol } = props
  const classes = useStyles()

  const handleClose = () => {
    setOpenUpgradeModal(false)
  }

  useEffect(() => {
    (async () => {

    })()
  }, [])

  return (
    <>
      {
        furrsol !== undefined ?
          <>
            <Modal
              open={openUpgradeModal}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              className={`${styles.root} ${classes.root}`}
            >
              <div className={`${styles.content} ${classes.content}`}>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item md={4}>
                    <div className={`imageWrapper`}>
                      <div className={`imageOver`}>
                        <img src={furrsol.image} alt="Right Responsive" />
                      </div>
                    </div>

                    <div className='d-flex align-items-center col-12 mt-16'>
                      <span className={`${classes.primary}`}>Attributes</span>
                    </div>

                    <div className={`col-12 mt-8`}>
                      <table className={`col-12 ${styles.infoTable}`}>
                        <tbody>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-3 ${classes.primary}`}>Hunger</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-9 ${classes.primary}`}>
                              {furrsol.MaxHunger} &nbsp;
                              <span className={`${classes.light}`}>
                                &#8594; {furrsol.Upgrades >= 6 ? 'MAX' : ((UPGRADE[furrsol.Upgrades]?.percent + 100) / 100 * furrsol.MaxHunger).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-3 ${classes.primary}`}>Sleep</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-9 ${classes.primary}`}>
                              {furrsol.MaxSleep}&nbsp;
                              <span className={`${classes.light}`}>
                                &#8594; {furrsol.Upgrades >= 6 ? 'MAX' : ((UPGRADE[furrsol.Upgrades]?.percent + 100) / 100 * furrsol.MaxSleep).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-3 ${classes.primary}`}>Hygiene</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-9 ${classes.primary}`}>
                              {furrsol.MaxHygiene}&nbsp;
                              <span className={`${classes.light}`}>
                                &#8594; {furrsol.Upgrades >= 6 ? 'MAX' : ((UPGRADE[furrsol.Upgrades]?.percent + 100) / 100 * furrsol.MaxHygiene).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-3 ${classes.primary}`}>Fun</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-9 ${classes.primary}`}>
                              {furrsol.MaxFun}&nbsp;
                              <span className={`${classes.light}`}>
                                &#8594; {furrsol.Upgrades >= 6 ? 'MAX' : ((UPGRADE[furrsol.Upgrades]?.percent + 100) / 100 * furrsol.MaxFun).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className='d-flex align-items-center col-12 mt-16'>
                      <span className={`${classes.primary}`}>Upgrades ({furrsol.Upgrades} of 6)</span>
                    </div>

                    <div className='d-flex align-items-center col-12 mt-8'>
                      {
                        [...Array(6)].map((e, i) => i < furrsol.Upgrades ?
                          <img alt="" key={i} src={getImg('images/icons/furrsol-active.png')} className={`mr-8 ${styles.upgrade}`} />
                          :
                          <img alt="" key={i} src={getImg('images/icons/furrsol-active-disabled.png')} className={`mr-8 ${styles.upgrade}`} />
                        )
                      }
                    </div>
                  </Grid>

                  <Grid item md={1}></Grid>

                  <Grid item md={6} className="d-flex align-content-center justify-content-between flex-flow-wrap text-center">
                    {
                      furrsol.Upgrades >= 6 ?
                        <>
                          <p className='col-12 white'>
                            FurrSol is Max Level!
                          </p>
                        </>
                        :
                        <>
                          {/* <p className='col-12 white'>
                            Select a FurrSol to Devour
                          </p>
                          <div className='col-12 pt-16'>
                            <FormControl fullWidth size="small" variant="outlined">
                              <Select
                                value={`315`}
                                className={`${classes.select}`}
                              >
                                <MenuItem value={`315`} className={`${classes.menuItem}`}>{furrsol.name}</MenuItem>
                              </Select>
                            </FormControl>
                          </div> */}
                          <div className='col-12'>
                            <p className={`pt-32 ${classes.neutral} ${styles.descript}`}>Attributes Increase: <span className={`${classes.light}`}>{UPGRADE[furrsol.Upgrades]?.percent}%</span> of attributes from FurrSol selected Required FLUFF: <span className={`${classes.light}`}>{UPGRADE[furrsol.Upgrades]?.fluff}</span></p>
                            {/* <p className={`pt-32 font-700 ${classes.neutral} ${styles.descript}`}>WARNING: FurrSol selected will be burned.</p> */}
                          </div>
                        </>
                    }

                    <div className={`col-12 pt-32`}>
                      <StakeButton
                        enabled={furrsol.Upgrades >= 6 ? false : true}
                        className={`font-sm line-height-1 pt-8 pr-16 pb-8 pl-16`}
                        onClick={() => { handleUpgrade() }}
                        fullWidth={false}
                      >
                        CONFIRM UPGRADE
                      </StakeButton>
                    </div>
                  </Grid>

                  <Grid item md={1}></Grid>

                </Grid>
                <div className={`mt-16 mr-16 ${styles.close}`}><CloseIcon className={`${classes.primary}`} onClick={handleClose} /></div>
              </div>
            </Modal>
          </>
          : <></>
      }
    </>
  )
}

export default UpgradeModal
