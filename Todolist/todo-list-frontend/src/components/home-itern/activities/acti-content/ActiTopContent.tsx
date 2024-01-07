import {FC} from 'react';
import Icon from '@/core-ui/icon';
import {ISetActivity} from '../activity/type';

interface IActiTopContent {
  type: ISetActivity;
}

const ActiTopContent: FC<IActiTopContent> = ({type}) => {
  if (type === 'projects') {
    return (
      <>
        <p className="text-xl leading-6">Current Projects</p>
        <Icon name="ico-folder-open opacity-50" />
      </>
    );
  } else if (type === 'tasks') {
    return (
      <>
        <p className="text-xl leading-6">Task to day</p>
        <Icon name="ico-file-list-check opacity-50" />
      </>
    );
  }
  return (
    <>
      <p className="text-xl leading-6">Work productivity</p>
      <Icon name="ico-file-list-check opacity-50" />
    </>
  );
};

export default ActiTopContent;
