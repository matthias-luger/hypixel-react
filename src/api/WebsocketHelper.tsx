import { ApiRequest, WebsocketHelper } from "./ApiTypes.d";
import { Base64 } from "js-base64";
import cacheUtils from '../utils/CacheUtils';
import api from "./ApiHelper";

let requests: ApiRequest[] = [];
let requestCounter: number = 0;
let websocket: WebSocket;

function initWebsocket(): void {

    let onWebsocketClose = (): void => {
        console.log("Websocket closed");
        console.log("reopening Websocket")
        websocket = getNewWebsocket();
    };

    let onWebsocketError = (e: Event): void => {
        console.error(e);
    };

    let onWebsocketMessage = (e: MessageEvent): void => {
        var response: ApiResponse = JSON.parse(e.data);
        let request: ApiRequest | undefined = requests.find(e => e.mId === response.mId);
        if (!request) {
            return;
        }
        delete response.mId;
        if (response.type.includes("error")) {
            request.reject(response.data);
        } else {
            let parsedResponse = JSON.parse(response.data);
            request.resolve(parsedResponse);
            // cache the response 
            let maxAge = response.maxAge;
            cacheUtils.setIntoCache(request.type, Base64.decode(request.data), parsedResponse, maxAge);
        }
    };

    let getNewWebsocket = (): WebSocket => {

        if (!websocket) {
            websocket = (window as any).websocket;
            api.setConnectionId();
            cacheUtils.checkForCacheClear();
        } else {
            // reconnect
            websocket = new WebSocket('wss://skyblock-backend.coflnet.com/skyblock');
            api.setConnectionId();
            (window as any).websocket = websocket;
        }
        websocket.onclose = onWebsocketClose;
        websocket.onerror = onWebsocketError;
        websocket.onmessage = onWebsocketMessage;
        return websocket;
    }

    websocket = getNewWebsocket();
}

function sendRequest(request: ApiRequest): Promise<void> {
    let requestString = JSON.stringify(request.data);
    return cacheUtils.getFromCache(request.type, requestString).then(cacheValue => {
        if (cacheValue) {
            request.resolve(cacheValue);
            return;
        }

        if (websocket && websocket.readyState === WebSocket.OPEN) {
            request.mId = requestCounter++;

            try {
                request.data = Base64.encode(requestString);
            } catch (error) {
                throw new Error("couldnt btoa this data: " + request.data);
            }

            requests.push(request);
            websocket.send(JSON.stringify(request));
        } else if (!websocket || websocket.readyState === WebSocket.CONNECTING) {
            websocket.onopen = function () {
                console.log("websocket opened");
                sendRequest(request);
            }
        }
    })
}

export let websocketHelper: WebsocketHelper = {
    sendRequest: sendRequest,
    init: initWebsocket
}