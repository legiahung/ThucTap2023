'use client';
import {motion, useAnimation} from 'framer-motion';
import {FC, MouseEventHandler} from 'react';
import {AnimationControls} from 'framer-motion';
import {sidebarItems} from '@/constants';
import Link from 'next/link';

interface ISidebarActions {
  controlText: AnimationControls;
}

const SidebarActions: FC<ISidebarActions> = ({controlText}) => {
  return (
    <div id="actions">
      <div className="flex items-center gap-2 self-stretch rounded-lg py-4 px-1">
        <img src={'icons/plus-fill.svg'} />
        <motion.p animate={controlText}>Add task</motion.p>
      </div>
      {sidebarItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          style={{
            textDecoration: 'none',
            color: '#000'
          }}
          className="flex items-center gap-2 self-stretch rounded-lg py-4 px-1"
        >
          {item.icon}
          <motion.p animate={controlText}>{item.title}</motion.p>
        </Link>
      ))}
    </div>
  );
};

export default SidebarActions;
