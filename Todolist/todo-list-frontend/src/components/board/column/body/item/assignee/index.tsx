import React, {FC, memo} from 'react';

import TaskAssignee from '@/components/common/task-assignee';
import {IAssigneeResponse} from '@/data/api/types/task.type';
import {IMember} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import useBoards from '@/states/board/use-boards';

import style from './style.module.scss';

interface IKanbanTaskAssignee {
  id: string;
  assignees: IAssigneeResponse[];
  assigneeList?: IMember[];
}

const KanbanTaskAssignee: FC<IKanbanTaskAssignee> = ({id, assignees, assigneeList}) => {
  const {write, getBoard, boardData} = useBoards();

  return (
    <div className={style['kanban-task-assignee']}>
      <TaskAssignee
        {...{id, assignees, onSuccess: socketUpdateList, assigneeList}}
        readonly={write}
        sx={{position: 'absolute'}}
        hideIconWhenClick={false}
        onSuccess={() => getBoard(boardData.id)}
      />
    </div>
  );
};

export default memo(KanbanTaskAssignee);
