import { FC } from 'react';
import NewPost from './components/NewPost/NewPost';
import Notifications from './components/Notifications/Notifications';
import PostList from './components/PostList/PostList';

const Home: FC = () => (
  <main className="bg-background flex w-full max-w-[800px] flex-col items-center gap-6">
    {/* TODO: move to layout? */}
    <div className="bg-primary fixed z-50 flex h-20 w-[100vw] max-w-[800px] content-center items-center justify-between px-6 font-bold text-white md:text-[22px]">
      <p>Posts Network</p>

      <Notifications />
    </div>

    <div className="bg-background flex w-full flex-col gap-6 px-4 pt-30 pb-6">
      <NewPost />

      <PostList />
    </div>
  </main>
);

export default Home;
