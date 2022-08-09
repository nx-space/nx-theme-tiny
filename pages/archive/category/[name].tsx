/*
 * @FilePath: /nx-theme-tiny/pages/archive/category/[name].tsx
 * @author: Wibus
 * @Date: 2022-08-09 11:35:10
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 12:07:13
 * Coding With IU
 */

import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { apiClient } from "../../../utils/request.util";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { name } = ctx.query;
  const data = await apiClient(`/categories/${name}?tag=false`);
  return {
    props: {
      data: data.data,
    },
  };
}

const Category: NextPage = (props: any) => {
  return (
    <>
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {props.data.name}
          </h1>
          <p className="text-base leading-6 text-gray-500 dark:text-gray-400">
            共有 {props.data.children?.length} 篇文章
          </p>
        </div>

        <ul>
          {props.data.children.map((item) => (
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
                        <Link href={`/archive/categories/${item.category.slug}`}>
                          <a grayaria-label="post's category name" className='mr-3 text-sm font-medium uppercase text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'>
                            {item.category.name}
                          </a>
                        </Link>
                        {item.tags.map((tag, index) => (
                          <Link href={`/archive/tag/${tag.name}`} key={index}>
                          <a grayaria-label="post's tag name" className='mr-3 text-sm font-medium uppercase text-gray-500 hover:text-gray-600 dark:hover:text-gray-400' key={index}>
                            {tag.name}
                          </a>
                        </Link>
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


      </div>
    </>
  )
}

export default Category;