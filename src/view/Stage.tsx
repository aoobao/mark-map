import StageComponent from '../components/CanvasContainer'
import { FC, PropsWithChildren } from 'react'
import RequestFrame from 'src/components/RequestFrame'

type IStageProps = PropsWithChildren<{}>

const Stage: FC<IStageProps> = props => {
  return (
    <div className="context">
      <div className="container">
        <RequestFrame>
          <StageComponent ftp={1000}></StageComponent>
        </RequestFrame>
      </div>
      <div className="button-wrap">
        <button>btn</button>
        <button>test</button>
      </div>
    </div>
  )
}

export default Stage
