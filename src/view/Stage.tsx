import StageComponent from '../components/CanvasContainer'
import { FC, PropsWithChildren } from 'react'

type IStageProps = PropsWithChildren<{}>

const Stage: FC<IStageProps> = props => {
  return (
    <div className="context">
      <div className="container">
        <StageComponent></StageComponent>
      </div>
      <div className="button-wrap">
        <button>btn</button>
        <button>test</button>
      </div>
    </div>
  )
}

export default Stage
