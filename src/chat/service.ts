import axios from 'axios';
import { from, map, Subject } from 'rxjs';
import { Chat } from './models';

const chatApiClient = axios.create({
  baseURL: 'https://6156154ae039a0001725a90c.mockapi.io',
});

const chats = new Subject<Chat[]>();
export const chats$ = chats.asObservable();

export const fetchChats = () => {
  console.log('fetch called');
  return from(chatApiClient.get<Chat[]>('/chats'))
    .pipe(map((response) => response.data))
    .subscribe({
      next: (x) => chats.next(x),
      error: (error) => chats.error(error),
    });
};
