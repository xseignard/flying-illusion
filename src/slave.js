import { universalSelf, onMasterMessage } from './utils/slave';

universalSelf.addEventListener('message', onMasterMessage);
