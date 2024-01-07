import aws from 'aws-sdk';
import {ManagedUpload, PutObjectRequest} from 'aws-sdk/clients/s3';
import classNames from 'classnames';
import {ChangeEvent, FC} from 'react';

import Button from '@/core-ui/button';
import IconButton from '@/core-ui/icon-button';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import useTask from '@/states/task/use-task';
import {IBaseProps} from '@/types';
import {AttachmentType} from '@/utils/constant';
import {validFileSize} from '@/utils/valid-file-size';

import style from './style.module.scss';

aws.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION
});

const s3 = new aws.S3();

const Upload: FC<IBaseProps> = ({className}) => {
  const toast = useToast();
  const {task, write, update} = useTask();
  const {id} = task;

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const name = file.name;
        const type: keyof typeof AttachmentType = file.type.startsWith('image') ? 'image' : 'file';

        if (!validFileSize(file)) {
          toast.show({type: 'danger', title: 'error', content: 'File or image must not larger than 25 MB '});
          continue;
        }

        const s3ObjectRequest: PutObjectRequest = {
          Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
          Body: file,
          Key: `${process.env.NEXT_PUBLIC_AWS_BUCKET_ENV || 'data-test'}/${Date.now() + name}`,
          ACL: 'public-read'
        };

        s3.upload(s3ObjectRequest, (err: Error, response: ManagedUpload.SendData) => {
          if (err) console.log('Error', err);
          if (response) {
            api.task.update({id, attachment: {create: {name: name, link: response.Location, type}}}).then(update);
          }
        });
      }
    }
  };

  return (
    <div className={classNames(style.upload, className)}>
      {write && (
        <div className="upload-button">
          <Button type="button" className="add-desktop">
            <span>Add attachments</span>
          </Button>
          <IconButton name="ico-plus-circle" className="add-mobile" />
          <input name="attachments" type="file" onChange={onUpload} multiple />
        </div>
      )}
    </div>
  );
};

export default Upload;
