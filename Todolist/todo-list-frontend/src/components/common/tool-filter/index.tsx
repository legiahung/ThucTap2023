/* eslint-disable @typescript-eslint/no-unused-expressions */
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {
  Collapse,
  FormControl,
  FormControlLabel,
  List,
  ListItemButton,
  MenuItem,
  RadioGroup,
  Select,
  SelectChangeEvent
} from '@mui/material';
import classNames from 'classnames';
import {useRouter} from 'next/router';
import {FC, useEffect, useState} from 'react';

import useTopbar from '@/components/topbar/hook';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import {IMember, ITodolistResponse} from '@/data/api/types/todolist.type';
import {IUserResponse} from '@/data/api/types/user.type';
import useMemberOptions from '@/hooks/useMemberOptions';
import useFilter from '@/states/filter/use-filter';
import {Priorities, PriorityColors, PriorityIcons} from '@/utils/constant';

import AssigneeIcon from '../assignee-icon';
import BpRadio from '../mui-custom-radio-button';
import style from './style.module.scss';

interface IProps {
  className?: string;
  todolist?: ITodolistResponse;
  myTasks?: ITodolistResponse[];
}

interface StatusItem {
  id?: number;
  name?: string;
  color?: string;
}

const ToolFilter: FC<IProps> = ({className, todolist, myTasks}) => {
  const {
    setStatusFilterInList,
    setStatusFilterInMyTask,
    setPriorityFilterInList,
    setAssigneeFilterInList,
    currentAssignee,
    currentPriority,
    currentStatus,
    setCurrentAssignee,
    setCurrentPriority,
    setCurrentStatus,
    setCurrentType
  } = useFilter();
  const {auth} = useTopbar();
  const [selectStatus, setSelectStatus] = useState<number | number[]>(0);
  const [selectPriority, setSelectPriority] = useState<string>('default');
  const [selectAssignee, setSelectAssignee] = useState<string>('default');
  const [openStatus, setOpenStatus] = useState(false);
  const [openAssignee, setOpenAssignee] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const router = useRouter();
  const isKanbanView = router.asPath.includes(ROUTES.KANBAN) ? true : false;
  const prioList = Object.values(Priorities).reverse();
  const prioColors = Object.values(PriorityColors).reverse();
  const prioIcons = Object.values(PriorityIcons).reverse();

  let myTasksStatus: {id?: number[]; color?: string; name?: string}[] = [];
  if (myTasks) {
    const statusList: StatusItem[] = [];

    myTasks.map(e => e?.status.map(statusItem => statusList.push(statusItem)));
    if (statusList && statusList.length > 0) {
      const newStatusList = statusList!
        .map(e => ({name: e.name, color: e.color}))
        .reduce((acc, cur) => {
          const index = acc.findIndex(e => e.name === cur.name && e.color === cur.color);
          if (index === -1) {
            return acc.concat(cur);
          } else {
            return acc;
          }
        }, [] as StatusItem[]);
      myTasksStatus = [];
      for (const newStatus of newStatusList) {
        const ids: number[] = [];
        for (const status of statusList) {
          if (status.name === newStatus.name && status.color === newStatus.color) {
            ids.push(status.id ? status.id : 0);
          }
        }
        myTasksStatus.push({id: ids, name: newStatus.name, color: newStatus.color});
      }
    }
  }

  const assignees: IUserResponse[] = [];
  const onOpenPriority = () => {
    setOpenPriority(!openPriority);
  };

  const onOpenStatus = () => {
    setOpenStatus(!openStatus);
  };

  const onOpenAssignee = () => {
    setOpenAssignee(!openAssignee);
  };

  const onChangeStatus = (e: SelectChangeEvent<number>) => {
    const statusNumber = Number(e.target.value);
    setSelectStatus(statusNumber);
    setCurrentStatus(statusNumber);
    if (todolist) {
      setStatusFilterInList(statusNumber);
    }

    if (myTasks) {
      const myTasksStatusFiltered = myTasksStatus?.filter(item => item.id && item.id.some(x => x == statusNumber));
      myTasksStatusFiltered.length != 0
        ? setStatusFilterInMyTask(myTasksStatusFiltered[0].id ? myTasksStatusFiltered[0].id : [])
        : setStatusFilterInMyTask([]);
    }
  };

  const onChangePriority = (e: SelectChangeEvent<unknown>) => {
    const priorityValue = String(e.target.value);
    setSelectPriority(priorityValue);
    setCurrentPriority(priorityValue);
    if (todolist) {
      setPriorityFilterInList(priorityValue);
    }
    if (myTasks) {
      setPriorityFilterInList(priorityValue);
    }
  };

  const onChangeAssignee = (e: SelectChangeEvent<unknown>) => {
    const assigneeValue = String(e.target.value);
    setSelectAssignee(assigneeValue);
    setCurrentAssignee(assigneeValue);
    if (todolist) {
      setAssigneeFilterInList(assigneeValue);
    }
    if (myTasks) {
      setAssigneeFilterInList(assigneeValue);
    }
  };

  const onReset = () => {
    setCurrentAssignee('default');
    setCurrentPriority('default');
    setCurrentStatus(0);
    setSelectStatus(0);
    setCurrentType('');
    setSelectPriority('default');
    setSelectAssignee('default');
    setStatusFilterInList(0);
    setPriorityFilterInList('');
    setAssigneeFilterInList('default');
    setStatusFilterInMyTask([]);
    setOpenAssignee(false);
    setOpenPriority(false);
    setOpenStatus(false);
  };

  useEffect(() => {
    if (
      (currentPriority != 'default' && currentPriority != '') ||
      (currentAssignee != '' && currentAssignee != 'default') ||
      currentStatus
    ) {
      setSelectStatus(currentStatus);
      setSelectPriority(currentPriority);
      setSelectAssignee(currentAssignee);
    } else {
      setSelectStatus(0);
      setSelectPriority('default');
      setSelectAssignee('default');
    }
  }, [router]);

  const {options} = useMemberOptions(todolist?.members as IMember[]);
  (todolist?.tasks || []).map(({assignees: Assigneeitem}) => {
    Assigneeitem[0]?.user?.id && assignees.push(Assigneeitem[0]?.user);
  });
  const newAssigneeList = Array.from(new Set(assignees.map(e => e.id)));
  const assigneeOptions = newAssigneeList.map(e => options.filter(a => a.id == e));
  return (
    <div className={classNames(style['tool-filter'], className)}>
      <div className="filter-icon">
        <Icon name="ico-filter" size={20} />
        <span>Filter</span>
      </div>
      <Select
        style={{width: 60}}
        variant="standard"
        disableUnderline
        className={style['menu-dropdown']}
        autoWidth
        sx={{
          '&:hover': {backgroundColor: 'transparent'},
          '&:active': {backgroundColor: 'transparent'}
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)'
            }
          }
        }}
      >
        <div className="select-inner scrollbar max-h-[70vh] overflow-y-auto overflow-x-hidden py-2">
          <MenuItem className={`${style['menu-item']} hover:cursor-default`} sx={{paddingY: '0px', paddingX: '20px'}}>
            <div className="menu-header-inner">
              <span className="font-bold">Filter</span>
              <span className="font-medium text-blue-500 hover:cursor-pointer" onClick={onReset}>
                Reset
              </span>
            </div>
          </MenuItem>
          <hr className="mx-[20px] mt-3" />
          {!isKanbanView && (
            <MenuItem className={`${style['menu-item']} menu-item`} sx={{paddingY: '0px', paddingX: '20px'}}>
              <List component="nav" className="list-inner">
                <ListItemButton onClick={onOpenStatus} className={!openStatus ? 'is-close' : ''}>
                  <span>Status</span>
                  {openStatus ? (
                    <ExpandLess fontSize="small" sx={{color: '#64748B', fontWeight: '100'}} />
                  ) : (
                    <ExpandMore fontSize="small" sx={{color: '#64748B', fontWeight: '100'}} />
                  )}
                </ListItemButton>
                <Collapse in={openStatus} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="radio-status-group-label"
                        defaultValue={selectStatus}
                        name="radio-status-group"
                        onChange={onChangeStatus}
                        className="status-radios"
                      >
                        <FormControlLabel
                          key={0}
                          value={0}
                          sx={{color: '#000000', background: '#F1F5F9'}}
                          control={<BpRadio />}
                          label="Not Done"
                          checked={selectStatus == 0}
                        />
                        {todolist &&
                          todolist?.status?.map(({id, color, name, index}) => (
                            <FormControlLabel
                              key={index}
                              value={id}
                              sx={{color, background: color + '32'}}
                              control={<BpRadio />}
                              label={name}
                              checked={selectStatus == id}
                            />
                          ))}
                        {myTasks &&
                          myTasksStatus?.map(({id, color, name}) => (
                            <FormControlLabel
                              key={color}
                              value={id && id[0]}
                              sx={{color, background: color + '32'}}
                              control={<BpRadio />}
                              label={name}
                              checked={selectStatus == (id && id[0])}
                            />
                          ))}
                      </RadioGroup>
                    </FormControl>
                  </List>
                </Collapse>
              </List>
              <hr />
            </MenuItem>
          )}

          <MenuItem className={`${style['menu-item']} menu-item`} sx={{paddingY: '0px', paddingX: '20px'}}>
            <List component="nav" className={`list-inner ${myTasks?.length && 'is-last'}`}>
              <ListItemButton onClick={onOpenPriority} className={!openPriority ? 'is-close' : ''}>
                <span>Priority</span>
                {openPriority ? (
                  <ExpandLess fontSize="small" sx={{color: '#64748B', fontWeight: '100'}} />
                ) : (
                  <ExpandMore fontSize="small" sx={{color: '#64748B', fontWeight: '100'}} />
                )}
              </ListItemButton>
              <Collapse in={openPriority} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="radio-priority-group-label"
                      defaultValue={selectPriority}
                      name="radio-priority-group"
                      onChange={onChangePriority}
                      className="priority-radios"
                    >
                      <FormControlLabel
                        key={0}
                        value={'default'}
                        sx={{color: '#000000'}}
                        control={<BpRadio />}
                        label="Show All"
                        checked={selectPriority == 'default'}
                      />
                      {prioList.map((e, index) => (
                        <FormControlLabel
                          key={index}
                          value={e}
                          control={<BpRadio />}
                          label={
                            <>
                              <Icon
                                className="priority-icon mr-1 "
                                name={prioIcons[index]}
                                style={{color: prioColors[index]}}
                              />
                              {e}
                            </>
                          }
                          checked={selectPriority == e}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </List>
              </Collapse>
            </List>
            {!myTasks?.length && <hr />}
          </MenuItem>
          {!myTasks?.length && (
            <MenuItem className={`${style['menu-item']} menu-item`} sx={{paddingY: '0px', paddingX: '20px'}}>
              <List component="nav" className={`list-inner is-last`}>
                <ListItemButton onClick={onOpenAssignee} className={!openAssignee ? 'is-close' : ''}>
                  <span>Assignee</span>
                  {openAssignee ? (
                    <ExpandLess fontSize="small" sx={{color: '#64748B', fontWeight: '100'}} />
                  ) : (
                    <ExpandMore fontSize="small" sx={{color: '#64748B', fontWeight: '100'}} />
                  )}
                </ListItemButton>
                <Collapse in={openAssignee} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="radio-assginee-group-label"
                        defaultValue={selectAssignee}
                        name="radio-assginee-group"
                        onChange={onChangeAssignee}
                        className="priority-radios"
                      >
                        <FormControlLabel
                          key={'default'}
                          value={'default'}
                          sx={{color: '#000000'}}
                          control={<BpRadio />}
                          label="Show All"
                          checked={selectAssignee == 'default'}
                        />
                        <FormControlLabel
                          key={'Unassigned'}
                          value={'Unassigned'}
                          sx={{color: '#000000'}}
                          control={<BpRadio />}
                          label={
                            <>
                              <div className="assignee-user mr-1">
                                <AssigneeIcon name="U" bg="bg-slate-200" />
                              </div>
                              <span>Unassigned</span>
                            </>
                          }
                          checked={selectAssignee == 'Unassigned'}
                        />
                        {assigneeOptions
                          .filter(a => a.length > 0 && a[0].id == auth?.id)
                          .map(a => (
                            <FormControlLabel
                              key={a[0].id}
                              value={a[0].id}
                              control={<BpRadio />}
                              label={
                                <>
                                  <div className="assignee-user mr-1">
                                    <AssigneeIcon name={a[0].name} bg={a[0].bg} />
                                  </div>
                                  <span>Assign to me</span>
                                </>
                              }
                              checked={selectAssignee == a[0].id}
                            />
                          ))}
                        {assigneeOptions
                          .filter(a => a.length > 0 && a[0].id != auth?.id)
                          .map(a => (
                            <FormControlLabel
                              key={a[0].id}
                              value={a[0].id}
                              control={<BpRadio />}
                              label={
                                <>
                                  <div className="assignee-user mr-1">
                                    <AssigneeIcon name={a[0].name} bg={a[0].bg} />
                                  </div>
                                  <span>{a[0].name}</span>
                                </>
                              }
                              checked={selectAssignee == a[0].id}
                            />
                          ))}
                      </RadioGroup>
                    </FormControl>
                  </List>
                </Collapse>
              </List>
            </MenuItem>
          )}
        </div>
      </Select>
    </div>
  );
};

export default ToolFilter;
