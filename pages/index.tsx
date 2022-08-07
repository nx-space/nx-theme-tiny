import type { NextPage } from 'next'
import { useSnapshot } from 'valtio'
import appState from '../states/appState'

const Home: NextPage = () => {

  const aggregatedTopSnapshot = (useSnapshot(appState).aggregate as any).aggrgeatedTop

  return (
    <div>
    </div>
  )
}

export default Home
