'use client';

import React, { useState, createContext, useContext, useId } from 'react';

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

export const Tabs = ({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div role="tablist" aria-orientation="horizontal" className="flex border-b">
      {children}
    </div>
  );
};

export const Tab = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used inside Tabs');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
        isActive ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500'
      } focus:outline-none focus-visible:ring focus-visible:ring-blue-300`}
    >
      {children}
    </button>
  );
};

export function TabPanel({ value, children }: { value: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used inside Tabs');

  const { activeTab } = context;

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      hidden={activeTab !== value}
      className="pt-6"
    >
      {activeTab === value && children}
    </div>
  );
}
