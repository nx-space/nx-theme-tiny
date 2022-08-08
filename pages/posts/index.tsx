/*
 * @FilePath: /nx-theme-tiny/pages/posts/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 14:59:01
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 16:15:34
 * Coding With IU
 */

import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useSnapshot } from "valtio";
import appState from "../../states/appState";
import { apiClient } from "../../utils/request.util";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await apiClient("/posts", {
    method: "GET",
    params: {
      page: ctx.query.page || 1,
      size: 10, // CONFIGS NEEDED
    }
  });
  return {
    props: {
      data,
    }
  }
}

const Posts: NextPage = (props: any) => {

  const appStateSnapshot = useSnapshot(appState) as any;

  return (
    <>
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {appStateSnapshot.aggregate.aggregatedData.sites.description}
          </h1>
          <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
            {appStateSnapshot.aggregate.aggregatedData.sites.description}
          </p>
        </div>

        <ul>
          {props.data.data.map((item) => (
            <li key={item.id} className="py-4">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
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
                        <a grayaria-label="post's category name" className='mr-3 text-sm font-medium uppercase text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'>
                          {item.category.name}
                        </a>
                        {item.tags.map((tag, index) => (
                          <a grayaria-label="post's tag name" className='mr-3 text-sm font-medium uppercase text-gray-500 hover:text-gray-600 dark:hover:text-gray-400' key={index}>
                            {tag.name}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className='prose text-gray-500 max-w-none dark:text-gray-400' />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <nav className="flex justify-between">
            <Link href="/posts?page={props.data.pagination.currentPage - 1}">
              <a>
                <button className="cursor-auto disabled:opacity-50"
                  aria-label="Previous page"
                  disabled={!props.data.pagination.has_prev_page}
                >上一页</button>
              </a>
            </Link>
            <span>
              {props.data.pagination.current_page} / {props.data.pagination.total_page}
            </span>
            <Link href={`/posts?page=${props.data.pagination.current_page + 1}`}>
              <a>
                <button className="cursor-auto disabled:opacity-50"
                  aria-label="Next page"
                  disabled={!props.data.pagination.has_next_page}
                >下一页</button>
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Posts;