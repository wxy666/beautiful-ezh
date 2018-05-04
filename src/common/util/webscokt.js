import store from '../../store'
import Cookies from 'js-cookie'
const webscoket='ws'
export function init() {
	let ws=null
	const wsuri = "ws://123.57.14.54:8081/socket/socketServer?userid=" + store.state.name;
	if('WebSocket' in window) {
		ws = new WebSocket(wsuri);
	} else if('MozWebSocket' in window) {
		ws = new MozWebSocket(wsuri)
	} else {
		ws = new SockJS("http://sdapi.ezhihe.cn/socket/imserver");
	}
	ws.onmessage = ws.websocketonmessage;
	ws.onclose = ws.websocketclose;
	return ws
}
export function setWs(ws) {
  return Cookies.set(webscoket, ws)
}