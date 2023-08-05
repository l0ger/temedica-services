import type { GetServerSideProps, NextPage } from 'next';
import { Layout } from '../component/layout/layout';
import Search from '../component/search';
import { QueryClient, dehydrate } from 'react-query';
import { DrugService } from '../services/drugService';
import { Drug } from '../types';

const Home: NextPage = () => {
  return (
    <Layout>
      <Search />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async function (context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<Drug[]>(
    ['drugs', context.query?.q || ''],
    () => {
      return DrugService.index(context.query?.q as string);
    },
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Home;
