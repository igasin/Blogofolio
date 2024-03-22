import { FC } from 'react';
import './DateCard.scss';

interface IDateCard {
  date: string;
}

export const DateCard: FC<IDateCard> = ({ date }) => <div className="date">{date}</div>;
