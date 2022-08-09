/*
 * @FilePath: /nx-theme-tiny/pages/links/index.tsx
 * @author: Wibus
 * @Date: 2022-08-09 12:28:06
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 13:12:33
 * Coding With IU
 */

import { GetServerSideProps, NextPage } from "next";
import { LinksSender } from "../../components/widgets/LinksSender";
import { apiClient } from "../../utils/request.util";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await apiClient("/links/all").then((res) => res.data);

  return {
    props: {
      data,
    },
  }
}

const Links: NextPage = (props: any) => {
  return (
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:space-x-6 md:mt-24">
      <div className="pt-6 pb-8 space-x-2 md:space-y-5">
        <h1 className="pb-5 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-l-4 md:border-r-4 md:px-6">
          Links
        </h1>
        <ul>
          {
            props.data.map((item: any, index: number) => {
              return (
                <li className="mt-5 mb-2 mr-5 list-disc" key={index}>
                  <a className="mr-3 text-xl font-medium text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" href={item.url}>
                    {item.name}
                  </a>
                  <a className="-ml-2 text-xl font-semibold text-gray-600 dark:text-gray-300" href={item.url}>
                    -- {item.description}
                  </a>
                </li>
              )
            }
            )
          }
        </ul>
      </div>
      <LinksSender />
    </div>
  )
}

export default Links;