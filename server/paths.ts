/**
 * Путь HTTP-запроса без query-строки. В отличие от `new URL(...)` не бросает
 * исключений на странных адресах вроде «//» — иначе такой запрос ронял бы сервер.
 */
export function requestPath(url: string | undefined): string {
  const raw = (url ?? '/').split('?')[0].split('#')[0];
  return raw.startsWith('/') ? raw : `/${raw}`;
}
