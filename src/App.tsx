import { Chats } from './chat/chat';
import React, { Suspense } from 'react';

function App() {
  console.log('app rendered');

  return (
    <>
      <Suspense fallback={<div>Loading... </div>}>
        <Chats />
      </Suspense>
    </>
  );
}

export default App;
