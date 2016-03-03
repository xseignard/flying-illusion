import { store } from '../stores/master';
import * as G from '../actions/game';

const mapStateToActionCreator = {
	devidle: G.launchIdle,
	devzoom: G.launchZoom,
	devintro: G.launchIntro,
	devtuto: G.launchTuto,
	devwait: G.launchWait,
	devwarning: G.launchWarning,
	devload: G.launchLoad,
	devplay: G.launchPlay,
	devrecap: G.launchRecap,
	devsave: G.launchSave,
	devrank: G.launchRank,
	devend: G.launchEnd,
};

export const setDevGameState = (status) => {
	if (mapStateToActionCreator[status]) {
		const delay = status !== 'devplay' ? 500000 : -50000;
		store.dispatch(mapStateToActionCreator[status](delay));
	}
};
