import { Chats } from './chat/chat';
import { fetchChats } from './chat/service';

function App() {
  console.log('app rendered');
  fetchChats();

  return (
    <>
      <Chats />
    </>
  );
}

export default App;
