import { useEffect, useRef } from 'react'

export const useWatch = <T>(target: T) => {
  const ref$ = useRef(target)

  useEffect(() => {
    ref$.current = target
  }, [target])

  return ref$
}
