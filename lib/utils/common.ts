export const getAlpha = (selfAlpha: number, parentAlpha: number) => {
  // 考虑到可能存在父节点隐藏但是子节点想要显示的需求，这里做一个特殊判断：
  // 当自身的alpha = Infinity 时，不管parent的alpha是多少，把透明度重置为1

  return selfAlpha === Infinity ? 1 : selfAlpha * parentAlpha
}
