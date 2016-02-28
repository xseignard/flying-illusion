import { configureStore } from './store-slave';
import { listenToMaster } from './utils/utils-slave';

const store = configureStore();
store.dispatch(listenToMaster());
