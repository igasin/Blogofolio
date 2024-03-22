import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITabsState } from './interfaces';

const initialState: ITabsState = {
  tabs: [
    {
      id: 1,
      title: 'All',
      isActive: true,
      isDisabled: false,
      activeTab: 'All',
    },
    {
      id: 2,
      title: 'My favorites',
      isActive: false,
      isDisabled: false,
      activeTab: 'My favorites',
    },
    {
      id: 3,
      title: 'Popular',
      isActive: false,
      isDisabled: false,
      activeTab: 'Popular',
    },
    {
      id: 4,
      title: 'My posts',
      isActive: false,
      isDisabled: false,
      activeTab: 'My posts',
    },
  ],
  activeTab: 'All',
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      const tabToUpdate = state.tabs.find((tab) => tab.id === action.payload);

      if (tabToUpdate && !tabToUpdate.isDisabled) {
        const newTabs = state.tabs.map((tab) => ({
          ...tab,
          isActive: tab.id === action.payload,
        }));

        state.tabs = newTabs;
        state.activeTab = tabToUpdate.title;
      }
    },
  },
});

export const { setActiveTab } = tabsSlice.actions;

export default tabsSlice.reducer;
