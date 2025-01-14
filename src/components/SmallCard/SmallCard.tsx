import { FC } from 'react';
import { DateCard } from '../DateCard/DateCard';
import { Typography } from '../Typography/Typography';
import './SmallCard.scss';
import { ActionsCard } from '../ActionsCard/ActionsCard';

interface ISmallCard {
  id: number;
  title: string;
  image: string;
  date: string;
}

export const SmallCard: FC<ISmallCard> = ({
  id, date, image, title,
}) => (
  <div className="small-card">
    <div className="small-card__content">
      <div>
        <DateCard date={date} />
        <Typography content={title} type="H3" />
      </div>
      <div>
        <div className="small-card__img-box">
          <img className="small-card__img" src={image} alt={title} />
        </div>
      </div>
    </div>
    <ActionsCard id={id} like={0} dislike={0} isFavorite={false} />
  </div>
);
