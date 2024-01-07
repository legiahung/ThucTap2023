import {FC} from 'react';
import Icon from '@/core-ui/icon';
import {ISetActivity} from '../activity/type';

interface IActiBottomContent {
  type: ISetActivity;
}

const ActiBottomContent: FC<IActiBottomContent> = ({type}) => {
  if (type === 'projects')
    return (
      <>
        <p className="text-[32px] font-semibold leading-9">200</p>
        <div className="flex items-center gap-1">
          <p className="text-sm font-semibold">+122%</p>
          <Icon name="ico-trend-up opacity-50"  />
        </div>
      </>
    );
  else if (type === 'tasks')
    return (
      <>
        <p className="text-[32px] font-semibold leading-9">15
        <span className='text-xl'> /20 </span></p>
        <div className="flex items-center gap-1">
          <p className="text-sm font-semibold">+122%</p>
          <Icon name="ico-trend-up opacity-50"  />
        </div>
      </>
    );
  return (
    <>
      <p className="text-[32px] font-semibold leading-9">70
        <span className='text-xl'> /100 </span></p>
      <div className="flex items-center gap-1">
        <p className="text-sm font-semibold">-0.22%</p>
        <Icon name="ico-trend-down opacity-50" />
      </div>
    </>
  );
};

export default ActiBottomContent;
