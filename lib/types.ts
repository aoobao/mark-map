export interface IViewRenderEvent {
  delta: number
  timer: number
}

export interface ILayerRenderEvent extends IViewRenderEvent {
  alpha: number
}

export interface IResizeEvent {
  width: number
  height: number
}

export type IStageEvent = {
  resize: IResizeEvent

  'before-render': IViewRenderEvent
  'after-render': IViewRenderEvent
}
