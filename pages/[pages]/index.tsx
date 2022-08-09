/*
 * @FilePath: /nx-theme-tiny/pages/[pages]/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 16:34:30
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 11:32:48
 * Coding With IU
 */

import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Markdown from "../../components/Markdown";
import { Comments } from "../../components/widgets/Comments";
import { apiClient } from "../../utils/request.util";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await apiClient(`/page/slug/${ctx.query?.pages}`);
  return {
    props: {
      data,
    },
  };
}

const Page: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <title>{props.data.title}</title>
      </Head>
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {props.data.title}
          </h1>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
          <div className="pt-10 pb-8 prose dark:prose-invert max-w-none">
            <Markdown source={props.data.text} />
          </div>
          <div id="comment">
            <Comments
              type="Page"
              path={props.data.path}
              id={props.data.id}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;