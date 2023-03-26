import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Stage } from 'lib/index'
import { useFrame } from './RequestFrame'

const StageContext = createContext<Stage | null>(null)

type IStageContextProps = PropsWithChildren<{
  ftp: number
}>

const StageComponent: FC<IStageContextProps> = props => {
  const wrap$ = useRef<HTMLDivElement>(null)
  const [created, setCreated] = useState(false)
  const stage$ = useRef<Stage | null>(null)

  useEffect(() => {
    const dom = wrap$.current!
    const stage = new Stage({ dom })

    stage$.current = stage

    setCreated(true)

    return () => {
      stage.destroy()
      stage$.current = null
      setCreated(false)
    }
  }, [])

  useFrame(
    () => {
      const stage = stage$.current
      if (!stage) return
      // 渲染前

      stage.render()

      // 渲染后
    },
    props.ftp,
    100
  )

  return (
    <StageContext.Provider value={stage$.current}>
      <div ref={wrap$} className="stage">
        {created && props.children}
      </div>
    </StageContext.Provider>
  )
}

export const useStage = () => {
  const stage = useContext(StageContext)
  if (!stage) throw new Error('context provider 未加载')

  return stage
}

export default StageComponent
