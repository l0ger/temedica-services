/**
 * Browser-side Url helper
 */
export class UrlHelper {
  /**
   * Adding query string params into the url without reloading page
   * @param key
   * @param value
   */
  static addQueryParam(key: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url.toString());
  }
}
