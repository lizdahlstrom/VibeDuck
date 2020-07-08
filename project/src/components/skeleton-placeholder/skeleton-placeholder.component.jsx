import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonPlaceholder = (props) => {
  return (
    <Skeleton variant={props.type} width={props.width} height={props.height} />
  );
};

export default SkeletonPlaceholder;
