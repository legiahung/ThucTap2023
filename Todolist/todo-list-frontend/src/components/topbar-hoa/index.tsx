import {FC, useState} from 'react';
import styles from './topbar-hoa.module.scss';
import TopBarRightIntern from './topbar-right-intern';
import { topbarPageName } from './page-name.type'

const TopBarHoa: FC = () => {
  // const [pageName, setPageName] = useState('')
  // const pageNameObj = {...topbarPageName};
  // Object.keys(pageNameObj).map(key => {
  //   if (key == name) setPageName(name?.toString());
  // });
  return (
    <div className={styles['topbar']}>
      <p className="l eading-9 text-[32px] font-bold text-blue-700 capitalize">
        Home
      </p>
      <TopBarRightIntern />
    </div>
  );
};

export default TopBarHoa;
