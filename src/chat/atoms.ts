import { chats$ } from './service';
import { atomWithObservable } from 'jotai/utils';

export const chatsAtom = atomWithObservable(() => chats$);
