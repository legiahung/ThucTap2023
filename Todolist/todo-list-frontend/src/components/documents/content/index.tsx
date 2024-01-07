import dynamic from 'next/dynamic';
import React, {useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import Button from '@/core-ui/button';
import Icon from '@/core-ui/icon';
import {useDocumentsStore} from '@/hooks/useDocuments';

import style from './style.module.scss';

const Editor = dynamic(() => import('@/components/common/ckeditor'), {
  ssr: false
});

const WYSIWYG = dynamic(() => import('@/components/common/wysiwyg'), {
  ssr: true
});

export interface IForm {
  content?: string;
}

const DocumentContent: React.FC = () => {
  const [edit, setEdit] = useState(false);
  const documentsState = useDocumentsStore();
  const {control, handleSubmit, reset} = useForm<IForm>({
    defaultValues: {content: documentsState.currentDocument?.content}
  });

  useEffect(() => {
    reset({content: documentsState.currentDocument?.content});
    setEdit(false);
  }, [documentsState.currentDocument]);

  const onSubmit: SubmitHandler<IForm> = data => {
    documentsState.updateDocument({...documentsState.currentDocument, content: data.content || ''});
  };
  return (
    <div className={style['document-content']}>
      {documentsState.currentDocument && (
        <div className="mb-3 flex items-center">
          <Icon name="content" className="ico-fluent_text-description mr-1" size={20} />
          <span className="mr-3">Content</span>
          <Button
            text="Edit"
            className="bg-slate-100"
            onClick={() => {
              setEdit(!edit);
            }}
          />
        </div>
      )}
      {edit ? (
        <form className="decsription-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={control}
            rules={{required: false}}
            defaultValue={documentsState.currentDocument?.content}
            render={({field}) => (
              <Editor
                name="example"
                value={documentsState.currentDocument.content || ''}
                onChange={text => field.onChange(text)}
              />
            )}
          />
          <div className="mt-4 flex gap-4">
            <Button
              className="max-w-20 h-8 px-2 text-sm"
              variant="contained"
              color="primary"
              text="Save"
              type="submit"
            />
            <Button
              className="max-w-20 h-8 px-2 text-sm"
              variant="outlined"
              color="white"
              text="Cancel"
              type="button"
              onClick={() => setEdit(false)}
            />
          </div>
        </form>
      ) : (
        <div>
          {documentsState.currentDocument && (
            <WYSIWYG content={documentsState.currentDocument.content || ''} render={documentsState.currentDocument} />
          )}
        </div>
      )}
    </div>
  );
};
export default DocumentContent;
