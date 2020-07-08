import React, { useEffect, useState } from 'react';
import { Chip, Avatar, Tooltip } from '@material-ui/core';
import useStyles from './search-chip.styles';
import { getSeedTitle } from '../../utils/seed-helper';
import ImgPlaceholder from '../../img/avatar-placeholder-dark.png';

const ChipText = (props) => {
  const classes = useStyles();
  return <div className={classes.chipText}>{props.children}</div>;
};

const SearchChip = ({ data, handleDelete, seedType }) => {
  const classes = useStyles();
  const [imgURL, setImgURL] = useState();

  useEffect(() => {
    try {
      if (data.album && data.album.images) {
        setImgURL(data.album.images[0].url);
      } else if (data.images) {
        setImgURL(data.images[0].url);
      }
    } catch (err) {
      setImgURL(ImgPlaceholder);
    }
  }, []);

  return (
    <div>
      {seedType && data ? (
        <Tooltip title={getSeedTitle(seedType, data)}>
          <Chip
            avatar={imgURL ? <Avatar alt={data.name} src={imgURL} /> : null}
            label={<ChipText>{getSeedTitle(seedType, data)}</ChipText>}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        </Tooltip>
      ) : (
        ''
      )}
    </div>
  );
};

export default SearchChip;
