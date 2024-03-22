export type TitleTabType = 'All' | 'My favorites' | 'Popular' | 'My posts';

interface ITab {
  id: number;
  title: TitleTabType;
  isActive: boolean;
  isDisabled: boolean;
  activeTab: TitleTabType;
}

export interface ITabsState {
  tabs: ITab[];
  activeTab: TitleTabType;
}
