import CanvasContainer from './components/CanvasContainer'
import ActionSide from './ActionSide'
import './App.css'
import { IViewProp } from './view/index'
import { useCallback, useState } from 'react'

function App() {
  const [View, setView] = useState<JSX.Element | undefined>()
  const changeView = useCallback((v: IViewProp) => {
    setView(v.view)
  }, [])

  return (
    <div className="App">
      <div className="wrap">
        {View}
      </div>

      <ActionSide switchView={changeView} />
    </div>
  )
}

export default App
