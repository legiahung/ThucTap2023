import classNames from 'classnames';
import {FC, HTMLAttributes, useState} from 'react';

import api from '@/data/api';
import useTask from '@/states/task/use-task';

import PickDateTime from './pick-date-time';

const TaskDate: FC<HTMLAttributes<HTMLDivElement>> = ({className}) => {
  const {task, write} = useTask();

  const [minDate, setMinDate] = useState<Date>(task.startDate);
  const [maxDate, setMaxDate] = useState<Date>(task.dueDate);

  const handleSaveDueDate = (date: Date) => {
    api.task.update({id: task.id, dueDate: date}).then(() => setMaxDate(date));
  };

  const handleSaveStartDate = (date: Date) => {
    api.task.update({id: task.id, startDate: date}).then(() => setMinDate(date));
  };

  return (
    <div className={classNames('date', className)}>
      <PickDateTime maxDate={maxDate} readonly={!write} className="start-date" title="Start Date" value={task.startDate} handleSave={handleSaveStartDate} />
      <PickDateTime minDate={minDate} readonly={!write} className="due-date" title="Due Date" value={task.dueDate} handleSave={handleSaveDueDate} />
    </div>
  );
};
export default TaskDate;
