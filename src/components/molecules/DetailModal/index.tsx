import React, { useEffect, useState } from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';

import { getImg } from "../../../utils/Helper";

import StakeButton from "../../atoms/StakeButton";

import styles from './index.module.scss';

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
    }
  })
)

type Props = {
  children: React.ReactNode,
  className?: string,
  furrsol: undefined | IFurrsol,
  openNFTModal: any,
  setOpenNFTModal: any,
  setOpenUpgradeModal: any,

}

const DetailModal = (props: Props) => {
  const { setOpenNFTModal, furrsol } = props;
  const classes = useStyles();

  const [showCount, setShowCount] = useState(false);

  const handleClose = () => {
    setOpenNFTModal(false)
  }

  useEffect(() => {
    (async () => {
      const now = new Date().getTime();

      if ((Date.now() - now) > 0) {
        setShowCount(true)
      }
    })();
  }, []);

  return (
    <>
      {
        furrsol !== undefined ?
          <>
            <Modal
              open={props.openNFTModal}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              className={`${styles.root} ${classes.root}`}
            >
              <div className={`${styles.content} ${classes.content}`}>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item md={4} xs={5}>
                    <div className={`imageWrapper ${styles.detail_image}`}>
                      <div className={`imageOver`}>
                        <img src={furrsol.image} alt="Right Responsive" />
                      </div>
                    </div>
                  </Grid>

                  <Grid item md={8} xs={7} container direction="row" justifyContent="space-between" className="pl-8">
                    <div className={`d-flex align-items-center col-12`}>
                      <span className={`${styles.title} ${classes.title}`}>{furrsol.name}</span>

                      {showCount &&
                        <div className={`d-flex ml-8 align-items-center justify-content-center line-height-1 ${styles.remainTime} ${classes.remainTime}`}>
                        </div>
                      }
                    </div>

                    <div className={`col-12 mt-16`}>
                      <table className={`col-12 ${styles.infoTable}`}>
                        <tbody>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Class</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>☀ {furrsol.Class}</td>
                          </tr>
                          {/* <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Breed Count</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>0 out of 3</td>
                          </tr> */}
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Owner</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>{furrsol.walletAddress.substring(0, 4)}...{furrsol.walletAddress.substring(furrsol.walletAddress.length - 4, furrsol.walletAddress.length)}</td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.light}`}>FLUFF</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.light}`}>{furrsol.FLUFF}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className={`col-12 mt-16`}>
                      <StakeButton
                        enabled={(furrsol.Upgrades >= 6 || furrsol.spawn === false) ? false : true}
                        className={`font-sm line-height-1 pt-8 pr-16 pb-8 pl-16 font-700`}
                        onClick={() => props.setOpenUpgradeModal(true)}
                        fullWidth={false}
                      >
                        UPGRADE FURRSOL
                      </StakeButton>
                    </div>
                  </Grid>
                </Grid>

                <Grid container direction="row" justifyContent={'space-between'} className="mt-24">
                  <Grid item md={4} className={styles.attribute_table}>
                    <div className='d-flex align-items-center col-12'>
                      <span className={`${classes.primary}`}>Attributes</span>
                    </div>

                    <div className={`col-12 mt-8`}>
                      <table className={`col-12 ${styles.infoTable}`}>
                        <tbody>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Hunger</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>{furrsol.Hunger}</td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Sleep</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>{furrsol.Sleep}</td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Hygiene</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>{furrsol.Hygiene}</td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Fun</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>{furrsol.Fun}</td>
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

                  <Grid item md={8} className={`pl-8 ${styles.traits_part}`}>
                    <div className='d-flex align-items-center col-12'>
                      <span className={`${classes.primary}`}>Traits</span>
                    </div>

                    <div className={`col-12 mt-8`}>
                      <table className={`col-12 ${styles.infoTable} ${styles.traitTable}`}>
                        <tbody>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Background</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>{furrsol.Background}</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}></td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Fur</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>{furrsol.Fur}</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}></td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Eyes</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>{furrsol.Eyes}</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}></td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Mouth</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>{furrsol.Mouth}</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}></td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Headgear</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>{furrsol.Headgear}</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}></td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Accessory</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>{furrsol.Accessory}</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}></td>
                          </tr>
                          <tr>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Toy</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>{furrsol.Toy}</td>
                            <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Grid>
                </Grid>
                <div className={`mt-16 mr-16 ${styles.close}`}><CloseIcon className={`${classes.primary}`} onClick={handleClose} /></div>
              </div>
            </Modal>
          </> : <></>
      }
    </>


  )
}

export default DetailModal;
