import { FC } from 'react';
import NewPost from './components/NewPost/NewPost';
import PostList from './components/PostList/PostList';

const Home: FC = () => (
  <main className="bg-background flex h-svh w-full max-w-[800px] flex-col items-center gap-6">
    <div className="bg-primary h-20 w-full max-w-[800px] content-center pl-6 font-bold text-white md:text-[22px]">
      CodeLeap Network
    </div>

    <div className="bg-background flex w-full flex-col gap-6 px-4">
      <NewPost />

      <PostList />
    </div>
  </main>
);

export default Home;
