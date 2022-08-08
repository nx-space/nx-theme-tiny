import type { NextPage } from 'next'
import { useSnapshot } from 'valtio'
import appState from '../states/appState'

const Home: NextPage = () => {

  const aggregatedTopSnapshot = (useSnapshot(appState).aggregate as any).aggrgeatedTop

  return (
    <div className='divide-y divide-gray-200 dark:divide-gray-700'>
      <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
          Latest
        </h1>
        <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
          岁月你别催，该来的我不推。
        </p>
      </div>
    </div>
  )
}

export default Home
