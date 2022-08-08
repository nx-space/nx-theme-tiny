import type { NextPage } from 'next'
import Link from 'next/link'
import { useSnapshot } from 'valtio'
import appState from '../states/appState'

const Home: NextPage = () => {

  const appStateSnapshot = useSnapshot(appState) as any;
  const aggregatedTopSnapshot = appStateSnapshot.aggregate.aggregatedTop.posts

  return (
    <div className='divide-y divide-gray-200 dark:divide-gray-700'>
      <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
          Latest
        </h1>
        <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
          {appStateSnapshot.aggregate.aggregatedData.sites.description}
        </p>
      </div>

      <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
        {
          aggregatedTopSnapshot?.map((item: any) => {
            return (
              <li className='py-12' key={item.id}>
                <article>
                  <div className='space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline'>
                    <dl>
                      <dt className='sr-only'>Published on</dt>
                      <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                        <time>
                          {item.created.split('T')[0]}
                        </time>
                      </dd>
                    </dl>
                    <div className='space-y-5 xl:col-span-3'>
                      <div className='space-y-6'>
                        <div>
                          <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                            <Link href={`/posts/${item.category.slug}/${item.slug}`}>
                              <a aria-label="post's name" className='text-gray-900 dark:text-gray-100'>
                                {item.title}
                              </a>
                            </Link>
                          </h2>
                          <div className='flex flex-wrap'>
                            <a href="" aria-label="post's category name" className='mr-3 text-sm font-medium uppercase text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'>
                              {item.category.name}
                            </a>
                          </div>
                        </div>
                        <div className='prose text-gray-500 max-w-none dark:text-gray-400' />
                      </div>
                      <div className='text-base font-[300] leading-6'>
                        <Link href={`/posts/${item.category.slug}/${item.slug}`}>
                          <a className='text-gray-500 hover:text-gray-600 dark:hover:text-gray-400' aria-label="read more">Read more →</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })
        }
      </ul>
      <div className='flex justify-end text-base font-medium leading-6'>
        <Link href="/posts">
          <a className='text-gray-500 hover:text-primary-600 dark:hover:text-gray-400 mt-5'>All Posts →</a>
        </Link>
      </div>
    </div>
  )
}

export default Home
