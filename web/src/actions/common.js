export const SYNC_WITH_SERVER_START = 'SYNC_WITH_SERVER_START';
export const SYNC_WITH_SERVER_FINISH = 'SYNC_WITH_SERVER_FINISH';

export const syncWithServerStart = () => ({
  type: SYNC_WITH_SERVER_START
});

export const syncWithServerFinish = () => ({
  type: SYNC_WITH_SERVER_FINISH
});
