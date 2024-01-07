import {FC} from 'react';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import useModals from '@/states/modals/use-modals';
import {IBaseProps} from '@/types';

import Title from '../title';

interface IToolbarProps extends IBaseProps {
  title: string;
  showActions?: boolean;
}
const Toolbar: FC<IToolbarProps> = ({className, title, showActions = false}) => {
  const {setIsOpenModal, setSelectedTodolist} = useModals();

  const onNew = () => {
    setIsOpenModal('createList');
    setSelectedTodolist();
  };

  return (
    <div className={className}>
      <div className="toolbar">
        <div className="left">
          <Title tilte={title} />
        </div>
        {showActions && (
          <div className="right">
            <Button className="btn-create-new" startIcon={<Icon name="ico-plus-circle" size={28} />} onClick={onNew}>
              <span className="h5 ml-1 font-medium">New List</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
