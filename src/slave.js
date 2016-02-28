import { configureStore } from './stores/slave';
import { listenToMaster } from './utils/slave';

const store = configureStore();
store.dispatch(listenToMaster());
