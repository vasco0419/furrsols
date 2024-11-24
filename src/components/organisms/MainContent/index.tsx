
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Grid from '@material-ui/core/Grid'

import styles from './index.module.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: 'none',
    },

    filter: {
      background: 'rgba(0,0,0,0.1)'
    },

    mainContent: {
      background: 'rgba(0,0,0,0.2)'
    }
  })
)

type Props = {
  children: any,
  className?: string
}

const HeaderPart = (props: Props) => {
  const { children } = props
  const classes = useStyles()

  return (
    <main>
      <Grid container direction="row" justifyContent="space-between" alignItems="stretch" className={`${styles.root} ${classes.root}`}>
        <Grid item md={3} sm={12} className={`global-padding pt-24 pb-24 ${styles.filter} ${classes.filter}`}>
          {children[0]}
        </Grid>

        <Grid item md={9} sm={12} className={`global-padding pt-24 pb-24 ${styles.mainContent} ${classes.mainContent}`}>
          {children[1]}
        </Grid>
      </Grid>
    </main>
  )
}

export default HeaderPart
