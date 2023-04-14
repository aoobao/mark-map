export const getAlpha = (selfAlpha: number, parentAlpha: number) => {
  // 考虑到可能存在父节点隐藏但是子节点想要显示的需求，这里做一个特殊判断：
  // 当自身的alpha = Infinity 时，不管parent的alpha是多少，把透明度重置为1

  return selfAlpha === Infinity ? 1 : selfAlpha * parentAlpha
}

export const downloadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.src = src

    img.onload = () => {
      resolve(img)
    }

    img.onerror = err => {
      reject(new Error('error'))
    }

    img.onabort = () => {
      reject(new Error('abort'))
    }
  })
}
