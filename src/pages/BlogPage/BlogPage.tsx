import { FC, useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  Box, Button, FormControl, InputLabel, MenuItem,
} from '@mui/material';
import { Typography } from '../../components/Typography/Typography';
import { Tabs } from './components/Tabs/Tabs';
import { PostList } from './components/PostList/PostList';
import { Spinner } from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './BlogPage.scss';
import { getMyPostsAction, getPostsAction } from '../../store/posts/postsSlice';
import { LIMIT_POSTS } from '../../constants/limit';
import { Pagination } from '../../components/Pagination/Pagination';
import { authHeader } from '../../api/auth/authHeader';
import { filterOptions } from '../../constants/constants';

export const BlogPage: FC = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(12);
  const [orderBy, setOrderBy] = useState('');
  const {
    favoritesPosts, postsAll, myPosts, error, loading, countPosts,
  } = useAppSelector((state) => state.posts);
  const { activeTab } = useAppSelector((state) => state.tab);
  const { isLogged } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPostsAction({ offset: page * LIMIT_POSTS, ordering: orderBy || undefined }));
  }, [dispatch, page, orderBy]);

  useEffect(() => {
    const token = authHeader().Authorization?.split(' ')[1];
    if (token) dispatch(getMyPostsAction(token));
  }, [dispatch]);

  const handlePageClick = (pageNumber: number) => setPage(pageNumber);
  const handleNextClick = () => setPage(page + 1);
  const handlePrevClick = () => setPage(page - 1);

  const handleOrderByChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setOrderBy(selectedValue);
  };

  const handleSortByDate = () => {
    if (myPosts) {
      const sortedPosts = [...myPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
      dispatch({ type: 'posts/getMyPosts/fulfilled', payload: sortedPosts });
    }
  };

  const renderPosts = () => {
    if (postsAll && postsAll.length > 0 && activeTab === 'All') return <PostList cards={postsAll} />;
    if (
      favoritesPosts
      && favoritesPosts.length > 0
      && activeTab === 'My favorites'
    ) return <PostList cards={favoritesPosts} />;
    if (activeTab === 'My posts' && isLogged && myPosts && myPosts.length > 0) return <PostList cards={myPosts} />;
    return null;
  };

  return (
    <div className="blog">
      <Typography content="Blog" type="H1" />
      {loading ? (
        <Spinner />
      ) : (
        <div className="blog__tabs">
          <Tabs />
        </div>
      )}
      {(activeTab === 'All') && (
        <Box sx={{ minWidth: 120, marginBottom: '64px' }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Select filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderBy}
              label="Select filter"
              onChange={handleOrderByChange}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option || 'None'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {(activeTab === 'My posts') && (
      <Button onClick={handleSortByDate} sx={{ minWidth: 120, marginBottom: '64px' }} variant="outlined">Date</Button>
      )}
      {renderPosts()}
      {error && error}
      <div className="blog__pagination">
        {activeTab === 'All' && (
          <Pagination
            countElement={countPosts}
            page={page}
            handlePageClick={handlePageClick}
            handleNextClick={handleNextClick}
            handlePrevClick={handlePrevClick}
          />
        )}
      </div>
    </div>
  );
};
