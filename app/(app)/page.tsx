import { FC } from 'react';
import NewPost from './components/NewPost/NewPost';
import PostList from './components/PostList/PostList';

const Home: FC = () => (
  <main className="bg-background flex h-svh flex-col items-center gap-4 px-3 pt-10 md:px-4">
    <div className="bg-primary fixed top-0 h-20 w-full content-center pl-6 font-bold text-white md:text-[22px]">
      CodeLeap Network
    </div>

    <NewPost />

    <PostList />
  </main>
);

export default Home;
