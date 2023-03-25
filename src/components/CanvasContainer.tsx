import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Stage } from 'lib/index'

const StageContext = createContext<Stage | null>(null)

type IStageContextProps = PropsWithChildren<{}>

const StageComponent: FC<IStageContextProps> = props => {
  const wrap$ = useRef<HTMLDivElement>(null)
  const [created, setCreated] = useState(false)
  const stage$ = useRef<Stage>(null)

  useEffect(() => {
    const dom = wrap$.current!
    const stage = new Stage({ dom })

    setCreated(true)

    return () => {
      stage.destroy()
      setCreated(false)
    }
  }, [])

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
