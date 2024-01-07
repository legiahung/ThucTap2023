import dynamic from 'next/dynamic';
import {BaseSyntheticEvent, FC} from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';

import Button from '@/core-ui/button';

const Editor = dynamic(() => import('@/components/common/ckeditor'), {
  ssr: false
});

export interface IFormInputs {
  comment: string;
}

interface Iprops {
  form: UseFormReturn<IFormInputs, any>;
  onClose: () => void;
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  value?: string;
}

const CommentForm: FC<Iprops> = ({form, onSubmit, onClose, value}) => {
  const {control} = form;

  return (
    <form onSubmit={onSubmit}>
      <Controller
        name="comment"
        rules={{required: true}}
        control={control}
        render={({field}) => <Editor name="example" value={value || ''} onChange={text => field.onChange(text)} />}
      />
      <div className="mt-4 flex gap-4">
        <Button className="max-w-20 h-8 px-2 text-sm" variant="contained" color="primary" text={value ? 'Save' : 'Comment'} type="submit" />
        <Button className="max-w-20 h-8 px-2 text-sm" variant="outlined" color="white" text="Cancel" type="button" onClick={onClose} />
      </div>
    </form>
  );
};

export default CommentForm;
