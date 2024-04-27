import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import {LoginPage} from './pages/Login.page';
import { HomePage } from './pages/Home.page';
import { BookmarksPage } from './pages/Bookmarks.page';
import { TweetsLookupPage } from './pages/TweetsLookup.page';
import { RecentSearchPage } from './pages/RecentSearch.page';
import { SearchPage } from './pages/Search.page';
import { BenchTask } from 'vitest';

import { TimelinePage } from './pages/Timeline.page';
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/bookmarks',
    element: <BookmarksPage />,
  },
  {
    path: '/lookup',
    element: <TweetsLookupPage />,
  },
  {
    path: '/recentsearch',
    element: <RecentSearchPage />,
  },
  {
    path: '/timeline',
    element: <TimelinePage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  }

  
]);

export function Router() {
  return <RouterProvider router={router} />;}


