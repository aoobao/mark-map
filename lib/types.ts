export interface IRenderEvent {
  delta: number
  timer: number
}

export interface IViewRenderEvent extends IRenderEvent {}

export interface ILayerRenderEvent extends IViewRenderEvent {
  alpha: number
}

export interface IGroupRenderEvent extends ILayerRenderEvent {}

export interface IResizeEvent {
  width: number
  height: number
}

export type IStageEvent = {
  resize: IResizeEvent

  'before-render': IViewRenderEvent
  'after-render': IViewRenderEvent
}
