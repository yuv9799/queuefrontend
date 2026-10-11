import { io } from 'socket.io-client';
import { api } from './api.js';

let socket = null;

// When the API base isn't configured (e.g. a production build made without
// VITE_API_URL) we can't open a real-time connection. Return a harmless,
// NON-NULL stub so every subscriber API (.on/.off/.emit/.once) stays callable.
// This guarantees a missing backend can NEVER crash the React tree — it only
// disables live events, while the app shell still renders (REST shows a
// connection error). Never return null from getSocket().
function createNoopSocket() {
  return {
    on() { return this; },
    once() { return this; },
    off() { return this; },
    emit() { return this; },
    removeAllListeners() { return this; },
    close() {},
    connected: false,
  };
}

export function getSocket() {
  if (!socket) {
    socket = api.BASE
      ? io(api.BASE, {
          transports: import.meta.env.PROD ? ['websocket'] : ['websocket', 'polling'],
        })
      : createNoopSocket();
  }
  return socket;
}

export function subscribeAll(cb) {
  const s = getSocket();
  const subscribe = () => s.emit('subscribe:all');
  s.on('connect', subscribe);
  if (s.connected) subscribe();
  s.on('token:updated', cb);
  s.on('queue:updated', cb);
  return () => {
    s.off('connect', subscribe);
    s.off('token:updated', cb);
    s.off('queue:updated', cb);
  };
}

// Staff Control Center real-time subscription.
export function subscribeStaff(cb) {
  const s = getSocket();
  const subscribe = () => s.emit('subscribe:staff');
  s.on('connect', subscribe);
  if (s.connected) subscribe();
  s.on('staff:update', cb);
  s.on('staff:activity', cb);
  s.on('token:updated', cb);
  s.on('queue:updated', cb);
  return () => {
    s.off('connect', subscribe);
    s.off('staff:update', cb);
    s.off('staff:activity', cb);
    s.off('token:updated', cb);
    s.off('queue:updated', cb);
  };
}

export default getSocket;