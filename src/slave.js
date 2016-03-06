import { universalSelf, onMasterMessage } from './threads/slave';

universalSelf.addEventListener('message', onMasterMessage);
