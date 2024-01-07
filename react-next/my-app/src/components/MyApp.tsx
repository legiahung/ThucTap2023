import React from 'react';
import MyButton from './MyButton';

function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

export default MyApp;