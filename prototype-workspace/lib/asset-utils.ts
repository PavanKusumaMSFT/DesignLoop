/**
 * Asset utilities for ensuring proper image loading across environments
 */

export const getAssetPath = (path: string): string => {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // In production or Codespaces, ensure proper base path
  const basePath = process.env.NODE_ENV === 'production' ? '' : ''
  
  return `${basePath}${normalizedPath}`
}

export const verifyAssetExists = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(getAssetPath(path), { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

export const getAssetWithFallback = (primaryPath: string, fallbackPath?: string): string => {
  // For now, return the primary path
  // In the future, we could add runtime verification
  return getAssetPath(primaryPath)
}

// List of critical assets that should be verified
export const CRITICAL_ASSETS = [
  '/azure-logo.svg',
  '/icons/virtual-machine.svg',
  '/icons/backup.svg',
] as const

export type CriticalAsset = typeof CRITICAL_ASSETS[number]
