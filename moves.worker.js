!function(e){function t(_){if(E[_])return E[_].exports;var u=E[_]={exports:{},id:_,loaded:!1};return e[_].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var E={};return t.m=e,t.c=E,t.p="",t(0)}([function(e,t,E){"use strict";function _(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.stopMoves=t.setMovesTimeouts=void 0;var u=E(4),o=_(u),O=function(e){self.postMessage({type:"dispatch",action:JSON.stringify(e)})},M=t.setMovesTimeouts=function(e){var t=arguments.length<=1||void 0===arguments[1]?0:arguments[1],E=e.map(function(e,E){var _=setTimeout(function(){O({type:o["default"].MOVE_SHOW,index:E})},e.showTime-t),u=setTimeout(function(){O({type:o["default"].MOVE_COMMENTABLE,index:E})},e.time-o["default"].MOVE_TOLERANCE_OK-t),M=setTimeout(function(){O({type:o["default"].MOVE_HIDE,index:E})},e.time-t),n=setTimeout(function(){O({type:o["default"].MOVE_UNCOMMENTABLE,index:E})},e.time+o["default"].MOVE_TOLERANCE_OK-t);return{timeoutShow:_,timeoutCommentable:u,timeoutHide:M,timeoutUncommentable:n}});O({type:o["default"].MOVES_TIMEOUTS,timeouts:E})},n=["timeoutShow","timeoutCommentable","timeoutHide","timeoutUncommentable"],i=t.stopMoves=function(e){e.forEach(function(e){n.forEach(function(t){clearTimeout(e[t])})})};self.addEventListener("message",function(e){"setMovesTimeouts"===e.data["function"]?M(e.data.moves,e.data.forward):"stopMoves"===e.data["function"]&&i(e.data.moves)})},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={APP_WIDTH:1920,APP_HEIGHT:1080}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={CHOREGRAPHY:"CHOREGRAPHY",CHOREGRAPHY_RESET:"CHOREGRAPHY_RESET"}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={GAME_IDLE:"GAME_IDLE",GAME_INTRO:"GAME_INTRO",GAME_TUTO:"GAME_TUTO",GAME_WAIT:"GAME_WAIT",GAME_WARNING:"GAME_WARNING",GAME_LOAD:"GAME_LOAD",GAME_PLAY:"GAME_PLAY",GAME_RECAP:"GAME_RECAP",GAME_SAVE:"GAME_SAVE",GAME_RANK:"GAME_RANK",GAME_END:"GAME_END",GAME_INTRO_DURATION:3e3,GAME_WAIT_DURATION:1e4,GAME_WARNING_DURATION:5e3,GAME_LOAD_DURATION:3e3,GAME_RECAP_DURATION:5e3,GAME_SAVE_DURATION:3e4,GAME_RANK_DURATION:5e3,GAME_END_DURATION:5e3}},function(e,t,E){"use strict";function _(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=E(1),o=_(u),O=E(3),M=_(O),n=E(2),i=_(n),A=E(5),T=_(A),s=E(8),a=_(s),f=E(6),d=_(f),r=E(7),l=_(r),c=E(9),R=_(c);t["default"]=Object.assign({},o["default"],M["default"],i["default"],T["default"],a["default"],d["default"],l["default"],R["default"])},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={MOVES_TIMEOUTS:"MOVES_TIMEOUTS",MOVES_END_DELAY:1e3,MOVE_SHOW:"MOVE_SHOW",MOVE_COMMENTABLE:"MOVE_COMMENTABLE",MOVE_HIDE:"MOVE_HIDE",MOVE_UNCOMMENTABLE:"MOVE_UNCOMMENTABLE",MOVE_DURATION:4e3,MOVE_TOLERANCE_OK:200,MOVE_TOLERANCE_GOOD:100,MOVE_TOLERANCE_EXCELLENT:50}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={PAD:"PAD"}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={SCORE:"SCORE",SCORES_LOADED:"SCORES_LOADED",SCORES_RESET:"SCORES_RESET"}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={STEP:"STEP",STEPS_RESET:"STEPS_RESET"}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={TUTO_FORWARD_TIME:6e3,TUTO_END_TIME:11e3,TUTO_STEP_ONE_TIME:7800,TUTO_STEP_ONE_DIRECTION:"top",TUTO_STEP_TWO_TIME:10100,TUTO_STEP_TWO_DIRECTION:"left"}}]);