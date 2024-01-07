import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Image from 'next/image';
import React, {memo} from 'react';

import {useBoardState} from '@/hooks/useBoardState';
import {useModalTaskDetailState} from '@/hooks/useModalTaskDetail';
import useBoards from '@/states/board/use-boards';
import {getTaskType} from '@/utils/task';

import KanbanTaskAssignee from './assignee';
import KanbanTaskDuoDate from './duo-date';
import KanbanTaskPriority from './priority';
import KanbanTaskStoryPoint from './story-point';
import style from './style.module.scss';
import KanbanTaskName from './task-name';
import KanbanTaskThumbnail from './thumbnail';

interface IKanbanTaskItem {
  itemId: string;
}

const KanbanTaskItem = ({itemId}: IKanbanTaskItem) => {
  const boardStore = useBoardState();
  const {boardData} = useBoards();
  const modalTaskDetailState = useModalTaskDetailState();
  const {members, taskSymbol} = boardData;
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: itemId});
  const task = boardStore.entitiesItem[itemId];
  const styleDnd = {transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1};
  if (!task) return null;
  const {attachments, assignees, id, name, dueDate, order, priority, type, storyPoint} = task;
  const taskType = getTaskType(type);

  const onClick = () => {
    modalTaskDetailState.setState(task);
  };

  return (
    <li className={style[`kanban-task-item`]} ref={setNodeRef} style={styleDnd} {...attributes} {...listeners}>
      <div className="bg" onClick={onClick}>
        {Boolean(attachments?.length) && <KanbanTaskThumbnail url={attachments?.[0]?.link} />}
        <KanbanTaskName name={(taskSymbol && order ? `[${taskSymbol}-${order}] ` : '') + name} />
        {process.env.NODE_ENV === 'development' && <KanbanTaskName name={String(task.indexColumn)} />}
      </div>
      <div className="actions">
        <div className="left">
          <Image src={`/icons/${taskType?.icon}`} alt="" width={24} height={24} />
        </div>
        <div className="right">
          <KanbanTaskDuoDate date={dueDate} />
          <KanbanTaskPriority priority={priority} />
          <KanbanTaskStoryPoint point={storyPoint} />
          <KanbanTaskAssignee assignees={assignees} id={id} assigneeList={members} />
        </div>
      </div>
    </li>
  );
};

export default memo(KanbanTaskItem);
