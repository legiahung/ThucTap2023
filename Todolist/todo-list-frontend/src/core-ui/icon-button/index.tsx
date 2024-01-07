import cls from 'classnames';
import React, {FC} from 'react';

import Icon from '../icon';
import {IconSizeType} from '../types';

interface IProps {
  className?: string;
  name: string;
  size?: IconSizeType;
  onClick?: () => void;
}

const IconButton: FC<IProps> = ({className, name, size = 24, onClick}) => {
  return (
    <button className={cls('icon-btn', className)} onClick={onClick} type="button">
      <Icon name={name} size={size} />
    </button>
  );
};

export default IconButton;
