import React, {FC, memo} from 'react';

import style from './style.module.scss';

interface IKanbanTaskNameProps {
  name: string;
}

const KanbanTaskName: FC<IKanbanTaskNameProps> = ({name}) => {
  return (
    <div className={style['kanban-task-name']}>
      <p className="task-name">{name}</p>
    </div>
  );
};
export default memo(KanbanTaskName);
