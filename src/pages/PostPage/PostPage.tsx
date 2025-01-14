import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import thumbsDown from '../../assets/icons/thumbsDown.svg';
import thumbsUp from '../../assets/icons/thumbsUp.svg';
import favorites from '../../assets/icons/favorites.svg';
import arrowPrev from '../../assets/icons/arrowPrev.svg';
import arrowNext from '../../assets/icons/arrowNext.svg';
import { Typography } from '../../components/Typography/Typography';
import { IconButton } from '../../components/IconButton/IconButton';
import './PostPage.scss';
import { getPost } from '../../api/getPost';
import { IPost } from '../../interfaces/IPost';
import { Spinner } from '../../components/Spinner/Spinner';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useAppSelector } from '../../store/hooks';
import { isDarkTheme } from '../../store/theme/selectors';

export const PostPage: FC = () => {
  const { id } = useParams();

  const isDark = useAppSelector(isDarkTheme);

  const [post, setPost] = useState<null | IPost>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPost({ id }).then((data) => {
        setPost(data);
        setIsLoading(false);
      });
    }
  }, [id]);

  const breadcrumbsPaths = ({ title }: IPost) => [
    { name: 'Home', url: '/posts', isActive: true },
    { name: `Post ${title}`, url: '', isActive: false },
  ];

  return (
    <div className="post">
      {post && (
        <>
          <Breadcrumbs path={breadcrumbsPaths(post)} />
          <Typography content={post.title} type="H1" />
          <div className="post__img-box">
            <img src={post.image} alt={post.title} className="post__img" />
          </div>
          <div className="post__content">
            <Typography content={post.text} type="textPrimary" />
            <div className="post__actions">
              <div className="post__actions-likes">
                <IconButton
                  onClick={() => console.log('thumbsUp')}
                  withBackground
                >
                  <img src={thumbsUp} alt="thumbsUp" />
                </IconButton>
                <IconButton
                  onClick={() => console.log('thumbsDown')}
                  withBackground
                >
                  <img src={thumbsDown} alt="thumbsDown" />
                </IconButton>
              </div>
              <IconButton
                onClick={() => console.log('favorites')}
                withBackground
              >
                <div className="post__actions-favorites">
                  <img src={favorites} alt="favorites" />
                  {' '}
                  Add to favorites
                </div>
              </IconButton>
            </div>
          </div>
          <div className="post__transitions">
            <IconButton onClick={() => console.log('arrowPrev')}>
              <div className="post__transitions-box">
                <img src={arrowPrev} alt="prev" />
                <div className="post__transitions-texts prev">
                  <div
                    className={`post__transitions-title ${isDark && 'dark'}`}
                  >
                    Previous
                  </div>
                  <div className="post__transitions-text">.....</div>
                </div>
              </div>
            </IconButton>
            <IconButton onClick={() => console.log('arrowNext')}>
              <div className="post__transitions-box">
                <div className="post__transitions-texts next">
                  <div
                    className={`post__transitions-title ${isDark && 'dark'}`}
                  >
                    Next
                  </div>
                  <div className="post__transitions-text">.....</div>
                </div>
                <img src={arrowNext} alt="next" />
              </div>
            </IconButton>
          </div>
        </>
      )}
      {isLoading && <Spinner />}
    </div>
  );
};
