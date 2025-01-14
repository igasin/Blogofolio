import { FC } from 'react';
import './MediumCard.scss';
import { DateCard } from '../DateCard/DateCard';
import { Typography } from '../Typography/Typography';
import { ActionsCard } from '../ActionsCard/ActionsCard';

interface IMediumCard {
  id: number;
  title: string;
  image: string;
  date: string;
}

export const MediumCard: FC<IMediumCard> = ({
  id, date, image, title,
}) => (
  <div className="medium-card">
    <div className="medium-card__img-box">
      <img className="medium-card__img" src={image} alt={title} />
    </div>
    <DateCard date={date} />
    <Typography content={title} type="H3" />
    <div className="medium-card__actions">
      <ActionsCard id={id} like={0} dislike={0} isFavorite={false} />
    </div>
  </div>
);
