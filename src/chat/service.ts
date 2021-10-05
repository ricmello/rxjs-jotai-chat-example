import axios from 'axios';
import { BehaviorSubject, distinctUntilChanged, from, map } from 'rxjs';
import { Chat } from './models';

const chatApiClient = axios.create({
  baseURL: 'https://6156154ae039a0001725a90c.mockapi.io',
});

function getRandomQuantity(data: Chat[]) {
  return data.filter((_, i) => i < Math.random() * 30);
}

const chatsSubject = new BehaviorSubject<{ chats?: Chat[]; error?: Error }>({});

export const chats$ = chatsSubject.asObservable().pipe(distinctUntilChanged());
export const fetchChats = () => {
  console.log('fetch called');

  return from(chatApiClient.get<Chat[]>('/chats'))
    .pipe(map((response) => getRandomQuantity(response.data)))
    .subscribe({
      next: (chats) => chatsSubject.next({ chats, error: undefined }),
      error: (error) => chatsSubject.next({ chats: [], error }),
    });
};
