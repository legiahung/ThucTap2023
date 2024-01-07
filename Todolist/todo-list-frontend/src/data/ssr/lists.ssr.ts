import {GetStaticPaths, GetStaticProps} from 'next';

import api from '../api';
import {ISeo} from '../api/types/commom';

type ParsedQueryParams = {
  id: string;
};

type PageProps = {
  id: string;
  seo: ISeo;
};

export const getStaticProps: GetStaticProps<PageProps, ParsedQueryParams> = async ({params}) => {
  try {
    const {id} = params!;
    const seo = (await api.todolist.seoOne({id})).data;
    return {
      props: {
        id,
        seo
      }
      //FIXME: This revalidate rule may be cause slow api due to a lot of static page call api, I am changing to Using On-Demand Revalidation
      // revalidate: 60 // In seconds
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const allList = await api.todolist.get();
  const paths = allList.data.flatMap(({id}) => ({params: {id}}));
  return {paths, fallback: 'blocking'};
};
