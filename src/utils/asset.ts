/**
 * Utility to resolve public asset URLs dynamically based on Vite's base path.
 * Supports root domain deployments ('/'), subdirectory deployments ('/repo-name/'),
 * and relative deployments ('./').
 */
export function getAssetUrl(assetPath: string): string {
  if (!assetPath) return '';
  
  // External URLs (http/https/data) should remain untouched
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://') || assetPath.startsWith('data:')) {
    return assetPath;
  }

  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  const rawBase = import.meta.env.BASE_URL || './';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  return `${base}${cleanPath}`;
}
