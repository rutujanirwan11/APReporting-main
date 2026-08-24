import type { PropsWithChildren } from 'react'

/**
 * The workspace uses the shared prototype provider during local development.
 * The deployed prototype does not need its optional controls, so keep the
 * public build self-contained and avoid requiring the private sibling repo.
 */
export function PrototypeProvider({ children }: PropsWithChildren) {
  return <>{children}</>
}
