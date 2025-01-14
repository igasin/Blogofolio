import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullCard } from '../FullCard/FullCard';
import { IPost } from '../../../../interfaces/IPost';
import { MediumCard } from '../MediumCard/MediumCard';
import { SmallCard } from '../SmallCard/SmallCard';
import './PostList.scss';

interface IPostList {
  cards: IPost[];
}

export const PostList: FC<IPostList> = ({ cards }) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/posts/${id}`);
  };

  const fullCard = cards[0];
  const mediumCards = cards.slice(1, 5);
  const smallCards = cards.slice(5, 12);

  return (
    <div className="list">
      <div>
        <div className="list__full-card">
          <FullCard
            id={fullCard.id}
            date={fullCard.date}
            image={fullCard.image}
            text={fullCard.text}
            title={fullCard.title}
            onClick={handleClick}
            dislike={fullCard.dislike}
            like={fullCard.like}
            isFavorite={fullCard.isFavorite}
          />
        </div>
        <div className="list__medium-card">
          {mediumCards.map(
            ({
              id, date, image, title, like, dislike, isFavorite,
            }) => (
              <MediumCard
                key={id}
                id={id}
                date={date}
                image={image}
                title={title}
                onClick={handleClick}
                dislike={dislike}
                like={like}
                isFavorite={isFavorite}
              />
            ),
          )}
        </div>
      </div>
      <div className="list__small-card">
        {smallCards.map(
          ({
            id, date, image, title, like, dislike, isFavorite,
          }) => (
            <SmallCard
              key={id}
              id={id}
              date={date}
              image={image}
              title={title}
              onClick={handleClick}
              dislike={dislike}
              like={like}
              isFavorite={isFavorite}
            />
          ),
        )}
      </div>
    </div>
  );
};
