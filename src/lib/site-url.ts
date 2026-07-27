export const siteUrl = new URL("https://nolan-boisel.com");

export function absolute(path: string) {
  return new URL(path, siteUrl).toString();
}
