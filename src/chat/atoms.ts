import { atom } from 'jotai';
import { Chat } from './models';
import { chatApiClient } from './service';

export const chatsAtom = atom<Chat[] | undefined>(undefined);
export const chatsError = atom<Error | undefined>(undefined);

export const fetchChatsAtom = atom(
  (get) => get(chatsAtom),
  async (_get, set) => {
    set(chatsError, undefined);

    const response = await chatApiClient
      .get<Chat[]>('/chats')
      .catch((err) => set(chatsError, err));

    set(chatsAtom, response?.data || []);
  }
);
