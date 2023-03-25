import Stage from './Stage'
import Layer from './Layer'
export const VIEW_LIST: IViewProp[] = [
  {
    name: 'stage',
    view: <Stage />
  },
  {
    name: 'layer',
    view: <Layer />
  }
]

export interface IViewProp {
  name: string
  view: JSX.Element
}
