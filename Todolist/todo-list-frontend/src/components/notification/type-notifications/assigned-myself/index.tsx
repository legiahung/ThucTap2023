import Link from 'next/link';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';

import {TypeNotifications} from '../types';

const AssignedMyself: FC<TypeNotifications> = props => {
  const {notification, handleIsRead} = props;
  const {content, link, sender} = notification;

  const textLink = (
    <Link href={`${ROUTES.TASK}/${link}`} onClick={handleIsRead}>
      {content}
    </Link>
  );

  return (
    <p className="content">
      <span className="sender-name">{sender.name}</span> assigned a task {textLink} to{' '}
      <span className="sender-name">{sender.name}</span>
    </p>
  );
};

export default AssignedMyself;
