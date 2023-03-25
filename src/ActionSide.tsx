import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { IViewProp, VIEW_LIST } from './view/index'
type IActionSideProps = {
  switchView: (view: IViewProp) => void
}

const ActionSide: FC<IActionSideProps> = props => {
  const [name, setName] = useState('')

  useEffect(() => {
    const index = parseInt(localStorage.getItem('current-view') || '0')
    const view = VIEW_LIST[index]
    if (view) {
      setName(view.name)
      props.switchView(view)
    }
  }, [])

  return (
    <div className="action-side">
      {VIEW_LIST.map((view, index) => {
        const classes = 'action-side-btn ' + (view.name === name ? ' action-side-btn-active' : '')

        return (
          <button
            className={classes}
            key={index}
            onClick={() => {
              setName(view.name)
              props.switchView(view)
            }}
          >
            {view.name}
          </button>
        )
      })}
    </div>
  )
}

export default ActionSide
