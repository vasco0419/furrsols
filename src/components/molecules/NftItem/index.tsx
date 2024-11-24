import React, { useEffect, useState } from "react";
import { useConnection } from '@solana/wallet-adapter-react';

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import { getCurrentChainTime, getImg } from "../../../utils/Helper";

import StakeButton from "../../atoms/StakeButton"
import CollectButton from "../../atoms/CollectButton"
import DespawnButton from "../../atoms/DespawnButton"
import ReceiveButton from "../../atoms/ReceiveButton"
import PercentBar from "../../atoms/PercentBar"

import styles from './index.module.scss';

import { IFurrsol } from '../../../pages/Frontend/DashboardPage/reducer'
import { CountUp } from 'use-count-up';
import { useResize } from './../../../utils/Helper';

const getAllCoefficients = (value: any, limit: number) => {
  let days: number;
  let hours: number;
  let minutes: number;
  let seconds: number;
  let completed: boolean;
  days = Math.floor(value / 86400);
  hours = Math.floor((value - 86400 * days) / 3600);
  minutes = Math.floor((value - days * 86400 - 3600 * hours) / 60);
  seconds = value - 86400 * days - 3600 * hours - 60 * minutes;
  completed = value === limit;
  return {
    days, hours, minutes, seconds, completed
  }
}

const renderCountUp = (currentValue: any, endTime: any) => {
  const { days, hours, minutes, seconds, completed } = getAllCoefficients(currentValue, endTime);

  if (completed) {
    return '';
  } else {
    return (
      <div className="render-count-up">
        {days < 10 ? `0${days}` : days} : {hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    );
  }
};

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
    remainTime: {
      color: theme.palette.text.primary
    },
    furr: {
      color: theme.palette.text.primary,
      background: alpha(`${theme.syscolor.dark}`, 0.85)
    },
    furrImg: {
      width: '12px !important',
      height: '12px !important'
    }
  })
)

const checkTakeCareEnable = (furrsol: any) => {
  if (furrsol.spawn === true && !(furrsol.Hunger === 0 && furrsol.Sleep === 0 && furrsol.Hygiene === 0 && furrsol.Fun === 0)) {
    return true
  } else {
    return false
  }
}

type Props = {
  children: React.ReactNode,
  className?: string,
  furrsol: IFurrsol,
  handleOpenDetailModal: any,
  handleTakecare: any,
  handleSpawn: any,
  handleDespawn: any,
  handleRevive: any,
  handleCollect: any,
}

const NftItem = (props: Props) => {
  const { handleOpenDetailModal, handleTakecare, handleSpawn, handleDespawn, handleRevive, handleCollect, furrsol } = props;
  const classes = useStyles();
  const { connection } = useConnection();
  // const clocktimer = new Date().getTime() + 3600 * 24 * 1000;
  const [showCount, setShowCount] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const { isMobile } = useResize();

  useEffect(() => {
    (async () => {
      const curTime = await getCurrentChainTime(connection);
      if (furrsol.spawn) {
        setShowCount(true);
        const spawnTime = furrsol.spawnTime;
        let start = curTime! - spawnTime;
        setStartTime(start);
        setEndTime(start + 6000); // count up end time to infinity
      }
    })();
  }, [furrsol]);

  return (
    <div className={`col-12`}>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" onClick={() => { handleOpenDetailModal(furrsol.nftAddress) }}>
        <Grid item md={5} xs={4} className={`pr-16`}>
          <div className={`imageWrapper ${styles.nft_image}`} id="nft_image">
            <div className={`imageOver`}>
              <img src={furrsol.image} alt="Right Responsive" />
              <div className={`d-flex align-items-center justify-content-center ${styles.furr} ${classes.furr}`}>
                <img src={getImg('images/icons/furrsol-active.png')} className={`${classes.furrImg}`} alt="Furr" />

                <p className="pl-4 line-height-1">{furrsol.Upgrades}</p>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item md={7} xs={8}>
          <div style={{ display: !isMobile ? `block` : `flex`, justifyContent: !isMobile ? `unset` : `space-around` }}>
            <p className={`mb-8 ${styles.title} ${classes.title}`}>{furrsol.name}</p>
            <p className={`mb-16 ${styles.fluff} ${classes.fluff}`}>FLUFF: {furrsol.FLUFF}</p>
          </div>
          <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
            <>
              <Grid item md={9} className={`mb-8 pr-8`}>
                <PercentBar percent={{ total: furrsol.MaxHunger, current: furrsol.Hunger }} attr={'FEED'} children={undefined} />
              </Grid>
              <Grid item md={3} className={`mb-8 text-right`}>
                <StakeButton
                  onClick={(e) => { e.stopPropagation(); handleTakecare(furrsol.nftAddress, 'FEED') }}
                  className={`pt-4 pr-4 pb-4 pl-4 font-700 font-sm line-height-1`}
                  enabled={checkTakeCareEnable(furrsol)}
                >
                  FEED
                </StakeButton>
              </Grid>
            </>
            <>
              <Grid item md={9} className={`mb-8 pr-8`}>
                <PercentBar percent={{ total: furrsol.MaxSleep, current: furrsol.Sleep }} attr={'REST'} children={undefined} />
              </Grid>
              <Grid item md={3} className={`mb-8 text-right`}>
                <StakeButton
                  onClick={(e) => { e.stopPropagation(); handleTakecare(furrsol.nftAddress, 'REST') }}
                  className={`pt-4 pr-4 pb-4 pl-4 font-700 font-sm line-height-1`}
                  enabled={checkTakeCareEnable(furrsol)}
                >
                  REST
                </StakeButton>
              </Grid>
            </>
            <>
              <Grid item md={9} className={`mb-8 pr-8`}>
                <PercentBar percent={{ total: furrsol.MaxHygiene, current: furrsol.Hygiene }} attr={'GROOM'} children={undefined} />
              </Grid>
              <Grid item md={3} className={`mb-8 text-right`}>
                <StakeButton
                  onClick={(e) => { e.stopPropagation(); handleTakecare(furrsol.nftAddress, 'GROOM') }}
                  className={`pt-4 pr-4 pb-4 pl-4 font-700 font-sm line-height-1`}
                  enabled={checkTakeCareEnable(furrsol)}
                >
                  GROOM
                </StakeButton>
              </Grid>
            </>
            <>
              <Grid item md={9} className={`mb-8 pr-8`}>
                <PercentBar percent={{ total: furrsol.MaxFun, current: furrsol.Fun }} attr={'PLAY'} children={undefined} />
              </Grid>
              <Grid item md={3} className={`mb-8 text-right`}>
                <StakeButton
                  onClick={(e) => { e.stopPropagation(); handleTakecare(furrsol.nftAddress, 'PLAY') }}
                  className={`pt-4 pr-4 pb-4 pl-4 font-700 font-sm line-height-1`}
                  enabled={checkTakeCareEnable(furrsol)}
                >
                  PLAY
                </StakeButton>
              </Grid>
            </>
          </Grid>
        </Grid>
      </Grid>

      <div className={`d-flex justify-content-between align-items-end mt-8`} onClick={() => { handleOpenDetailModal(furrsol.nftAddress) }}>
        <div className={`d-flex align-items-center align-items-center`}>
          {furrsol.spawn === false ?
            <>
              <CollectButton enabled={false}>
                Collect FLUFF
              </CollectButton>
              <DespawnButton onClick={(event) => { event.stopPropagation(); handleSpawn(furrsol.nftAddress) }} className={`ml-8`}>
                Spawn
              </DespawnButton>
            </>
            : furrsol.spawn === true && (furrsol.Hunger === 0 || furrsol.Sleep === 0 || furrsol.Hygiene === 0 || furrsol.Fun === 0) ?
              <>
                <ReceiveButton onClick={(event) => { event.stopPropagation(); handleRevive(furrsol.nftAddress) }}>
                  Revive for 5000 FLUFF
                </ReceiveButton>
                <DespawnButton className={`ml-8`} enabled={false}>
                  Despawn
                </DespawnButton>
              </>
              :
              furrsol.spawn === true && true ?
                <>
                  <CollectButton onClick={(event) => { event.stopPropagation(); handleCollect(furrsol.nftAddress) }}>
                    Collect FLUFF
                  </CollectButton>
                  <DespawnButton onClick={(event) => { event.stopPropagation(); handleDespawn(furrsol.nftAddress) }} className={`ml-8`}>
                    Despawn
                  </DespawnButton>
                </>
                :
                <>
                  <CollectButton enabled={false}>
                    Collect FLUFF
                  </CollectButton>
                  <DespawnButton className={`ml-8`} enabled={false}>
                    Despawn
                  </DespawnButton>
                </>
          }

        </div>
        {furrsol.spawn &&
          <div className={`d-flex align-items-center justify-content-center line-height-1 ${styles.remainTime} ${classes.remainTime}`}>
            <CountUp
              isCounting={showCount}
              start={startTime}
              end={endTime}
              duration={6000}
              easing="linear"
              updateInterval={1}
              formatter={(currentValue) => renderCountUp(currentValue, endTime)}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default NftItem;
