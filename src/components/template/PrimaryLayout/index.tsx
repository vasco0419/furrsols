import * as React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { PRIMARY_LOGO } from "./../../config";

import HeaderPart from "./../../organisms/HeaderPart";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default
    },
  })
)

type Props = {
  children: React.ReactNode
  className?: string
}

const menues = [
  {
    node: "GAME GUIDE",
    url: "/guide",
  },
  {
    node: "MARKETPLACE",
    url: "/dashboard",
  },
];

const PrimaryLayout = (props: Props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <section
      className={`root ${classes.root}`}
    >
      <HeaderPart
        menu={menues}
        logo={PRIMARY_LOGO}
      >

      </HeaderPart>

      <>
        {children}
      </>
    </section>
  )
}

export default PrimaryLayout;
