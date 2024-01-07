import cls from 'classnames';
import React, {FC} from 'react';

import Button from '@/core-ui/button';
import Modal from '@/core-ui/modal';
import {useDocumentsStore} from '@/hooks/useDocuments';

import {IProps} from '../types-create';
import useModalDelete from './hook';
import styles from './style.module.scss';

const ModalDeleteDocument: FC<IProps> = props => {
  const {open, onClose} = props;
  const {onClick} = useModalDelete(props);
  const documentsState = useDocumentsStore();

  if (!open) return null;

  return (
    <Modal
      className={cls(styles['com-modal-todo-confirm-delete'], 'max-w-xl')}
      variant="center"
      open={open}
      onClose={onClose}
    >
      <Modal.Header>
        <h3 className="title">
          <span className="block text-center">Are you sure you want to delete document:</span>
          <i className="block text-center">{documentsState.currentDocument.name}</i>
        </h3>
      </Modal.Header>
      <Modal.Footer>
        <div className="content">
          <Button className="w-full" variant="outlined" color="primary" text="No" onClick={onClose} type="button" />
          <Button className="w-full" variant="contained" color="primary" text="Yes" type="submit" onClick={onClick} />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteDocument;
