/** Сообщения между страницей и веб-воркером, в котором работает мир игрока. */
export type ToWorker =
  /** Запустить мир: загрузить сохранение (или создать новый мир). */
  | { t: 'start'; fresh?: boolean }
  /** Новое соединение (свой игрок или друг по WebRTC). */
  | { t: 'open'; id: number }
  | { t: 'msg'; id: number; data: string }
  | { t: 'close'; id: number }
  /** Сохранить мир сейчас (страницу закрывают или сворачивают). */
  | { t: 'save' };

export type FromWorker =
  | { t: 'ready'; seed: number }
  | { t: 'msg'; id: number; data: string }
  | { t: 'close'; id: number; code: number; reason: string }
  | { t: 'saved' }
  | { t: 'error'; message: string };
