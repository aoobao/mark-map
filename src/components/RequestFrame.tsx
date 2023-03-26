import { createSubscribe } from '../assets/subscribe'
import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useRef } from 'react'
import { useWatch } from 'src/hooks/useWatch'

// const FrameContext = createcont

type IRequestFrameProps = PropsWithChildren<{}>

const RequestFrame: FC<IRequestFrameProps> = props => {
  const [publish, subscribe] = useMemo(() => {
    const reg = createSubscribe<number>()

    return reg
  }, [])

  useEffect(() => {
    let cancel = 0
    const render = (timer: number) => {
      cancel = requestAnimationFrame(render)
      publish(timer)
    }

    cancel = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(cancel)
    }
  }, [])

  return <FrameContext.Provider value={{ subscribe }}>{props.children}</FrameContext.Provider>
}

export default RequestFrame

interface IFrameContext {
  subscribe: (func: (timer: number) => void, zIndex?: number) => () => void
}

const FrameContext = createContext<IFrameContext | undefined>(undefined)

export const useFrame = (func: (timer: number) => void, ftp: number, zIndex?: number) => {
  const request = useContext(FrameContext)
  if (!request) throw new Error('context provider 未加载')
  const callback$ = useWatch(func)

  useEffect(() => {
    let lastTimer = 0
    const cancel = request.subscribe(time => {
      const t = time - lastTimer
      if (!ftp || t < 1000 / ftp) return
      lastTimer = time

      callback$.current(time)
    }, zIndex)

    return cancel
  }, [ftp, zIndex])
}
