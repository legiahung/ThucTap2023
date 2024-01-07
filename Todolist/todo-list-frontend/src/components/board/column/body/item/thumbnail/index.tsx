import Image from 'next/image';
import React, {FC, memo} from 'react';

import style from './style.module.scss';

interface IKanbanTaskThumbnail {
  url: string;
}

const KanbanTaskThumbnail: FC<IKanbanTaskThumbnail> = ({url}) => {
  return (
    <div className={style['task-thumbnail']}>
      <Image src={url} alt={url} objectFit="cover" layout="fill" />
    </div>
  );
};

export default memo(KanbanTaskThumbnail);
