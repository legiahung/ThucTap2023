'use client'
import React, { useState } from 'react';
import MyApp from '@/components/MyApp';
import Profile from '@/components/Profile';
import ShoppingList from '@/components/product';
import '@/components/styles.css';
import IndexPage from '@/components/FetchAPI';
import Fill from '@/components/Fill-product';
import Game from '@/components/game';

export default function Home() {
  const [selectedContent, setSelectedContent] = useState<React.ReactNode | null>(null);

  const handleItemClick = (content: React.ReactNode) => {
    setSelectedContent(content);
  };

  return (
    <div className="container">
      <ul className="menu">
        <li onClick={() => handleItemClick(<MyApp />)}>Point</li>
        <li onClick={() => handleItemClick(<Profile />)}>Profile</li>
        <li onClick={() => handleItemClick(<ShoppingList />)}>ShoppingList</li>
        <li onClick={() => handleItemClick(<Game />)}>Tictactoe</li>
        <li onClick={() => handleItemClick(<Fill/>)}>FilterableProductTable</li>
        <li onClick={() => handleItemClick(<IndexPage />)}>FetchAPI</li>
      </ul>
      <div className="content-display">{selectedContent}</div>
    </div>
    
  );
}
