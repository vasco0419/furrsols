import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import BrightButton from "../../atoms/BrightButton"

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    filterTitle: {
      color: theme.palette.text.primary
    },
    filterList: {

    }
  })
)

type Props = {
  children: React.ReactNode,
  className?: string,
  filterOption: { key: string, name: string, options: { key: string, name: string }[] },
  filters: any,
  enables: any,
  handleFilter: any,
}

const FilterItem = (props: Props) => {
  const { filterOption, handleFilter, filters, enables } = props;
  const classes = useStyles();
  return (
    <div className={`col-12 mb-16`}>
      <p className={`${styles.filterTitle} ${classes.filterTitle}`}>{filterOption.name}</p>
      <div className={`d-flex align-item-center mt-4 ${styles.filterList}`}>
        {filterOption.options.map((option, index) => {
          return <BrightButton
            enabled={enables[filterOption.key][option.key]}
            className={`mr-4 mb-4 ${filters[filterOption.key]['key'] === option.key ? '' : 'active'}`}
            onClick={() => handleFilter(filterOption.key, option.key)}
            key={index}
          >
            {option.name}
          </BrightButton>
        })}
      </div>
    </div>
  )
}

export default FilterItem;
