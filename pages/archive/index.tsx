/*
 * @FilePath: /nx-theme-tiny/pages/archive/index.tsx
 * @author: Wibus
 * @Date: 2022-08-09 12:08:24
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 14:38:55
 * Coding With IU
 */

import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { SEO } from "../../components/others/SEO";
import { apiClient } from "../../utils/request.util";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const tagData = await apiClient("/categories?type=Tag").then((res) => res.data);
  const cateData = await apiClient("/categories?type=Category").then((res) => res.data);
  return {
    props: {
      tags: tagData,
      categories: cateData,
    },
  };
}


const Archive: NextPage = (props: any) => {
  return (
    <>
      <SEO title="存档" />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:space-x-6 md:mt-24">

        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-l-4 md:border-r-4 md:px-6">
            Categories
          </h1>
        </div>
        <div className="flex flex-wrap max-w-lg">

          {
            props.categories.map((item: any, index: number) => {
              return (
                <div className="mt-2 mb-2 mr-5" key={index}>
                  <Link href={`/category/${item.slug}`}>
                    <a className="mr-3 text-xl font-medium uppercase text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
                      {item.name}
                    </a>
                  </Link>
                  <Link href={`/category/${item.slug}`}>
                    <a className="-ml-2 text-xl font-semibold text-gray-600 uppercase dark:text-gray-300">
                      ({item.count})
                    </a>
                  </Link>
                </div>
              )
            })
          }


        </div>

        <div className="pt-36 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-l-4 md:border-r-4 md:px-6">
            Tags
          </h1>
        </div>
        <div className="flex flex-wrap max-w-lg">

          {
            props.tags.map((item: any, index: number) => {
              return (
                <div className="mt-2 mb-2 mr-5" key={index}>
                  <Link href={`/tag/${item.name}`}>
                    <a className="mr-3 text-xl font-medium uppercase text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
                      {item.name}
                    </a>
                  </Link>
                  <Link href={`/tag/${item.name}`}>
                    <a className="-ml-2 text-xl font-semibold text-gray-600 uppercase dark:text-gray-300">
                      ({item.count})
                    </a>
                  </Link>
                </div>
              )
            })
          }


        </div>
      </div>
    </>
  )
}

export default Archive;