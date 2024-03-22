import { FC } from 'react';
import './SearchCard.scss';
import { useNavigate } from 'react-router-dom';
import { DateCard } from '../../../../components/DateCard/DateCard';
import { Typography } from '../../../../components/Typography/Typography';
import { ActionsCard } from '../../../../components/ActionsCard/ActionsCard';

interface ISearchCard {
  id: number;
  title: string;
  image: string;
  date: string;
  like: number;
  dislike: number;
  isFavorite: boolean;
}

export const SearchCard: FC<ISearchCard> = ({
  id,
  date,
  image,
  title,
  dislike,
  like,
  isFavorite,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="search-card">
      <div className="search-card__content">
        <div>
          <div className="search-card__img-box">
            <img className="search-card__img" src={image} alt={title} />
          </div>
        </div>
        <div>
          <DateCard date={date} />
          <button type="button" className="search-card__btn" onClick={handleClick}>
            <Typography content={title} type="H3" />
          </button>
        </div>
      </div>
      <ActionsCard
        id={id}
        like={like}
        dislike={dislike}
        isFavorite={isFavorite}
      />
    </div>
  );
};
