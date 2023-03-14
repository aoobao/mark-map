import { FC, PropsWithChildren, useEffect, useRef } from 'react'
import { Stage } from 'lib/index'

type ICanvasContainerProps = PropsWithChildren<{}>

const CanvasContainer: FC<ICanvasContainerProps> = props => {
  const wrap$ = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dom = wrap$.current!

    const stage = new Stage({ dom })

    return () => {
      stage.destroy()
    }
  }, [])

  return <div ref={wrap$}></div>
}

export default CanvasContainer
