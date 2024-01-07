import {SelectChangeEvent} from '@mui/material';
import classNames from 'classnames';
import {FC} from 'react';

import TaskPiority from '@/components/common/task-priority';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';
import {ToastContents} from '@/utils/toast-content';

import Title from '../../title';

export const Priority: FC<IBaseProps> = ({className}) => {
  const {write, task, update} = useTask();
  const toast = useToast();
  const onChange = (event: SelectChangeEvent<unknown>) => {
    api.task
      .update({id: task.id, priority: event.target.value as string})
      .then(update)
      .catch(() => toast.show({type: 'danger', title: 'Priority', content: ToastContents.ERROR}));
  };
  return (
    <div className={classNames('priority', className)}>
      <Title text="Priority" />
      <div className="select">
        <TaskPiority priority={task.priority} onChange={onChange} readOnly={!write} hideTitle={false} />
      </div>
    </div>
  );
};

export default Priority;
