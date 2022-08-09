/*
 * @FilePath: /nx-theme-tiny/pages/posts/[category]/[path].tsx
 * @author: Wibus
 * @Date: 2022-08-08 15:24:47
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 12:04:55
 * Coding With IU
 */

import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useSnapshot } from "valtio";
import { BackTop } from "../../../components/widgets/BackTop";
import Markdown from "../../../components/Markdown";
import appState from "../../../states/appState";
import { apiClient } from "../../../utils/request.util";
import { Comments } from "../../../components/widgets/Comments";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await apiClient(`/posts/${ctx.query.category}/${ctx.query.path}`)
  return {
    props: {
      data,
    }
  }
}

const Post: NextPage = (props: any) => {


  const aggregateSnapshot = (useSnapshot(appState) as any).aggregate;

  return (
    <div className="max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">
      <BackTop />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time>
                      {props.data.created.split('T')[0]}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                  {props.data.title}
                </h1>
              </div>
            </div>
          </header>
          <div className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6" style={{
            gridTemplateRows: "auto 1fr",
          }}>
            <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Author</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    <div className="inline-block max-w-full overflow-hidden relative box-border m-0">
                      <div style={{
                        display: "block",
                        maxWidth: "100%",
                        margin: 0,
                        border: "none",
                        padding: 0,
                      }}>
                        <img src={aggregateSnapshot.aggregatedData.user.avatar} alt={aggregateSnapshot.aggregatedData.user.name} style={{
                          maxWidth: "100%",
                          display: "block",
                          margin: "0px",
                          border: "none",
                          padding: "0px",
                          height: "50px",
                        }} />
                      </div>
                    </div>
                    <dl className="text-sm font-medium leading-5 whitespace-nowrap">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {aggregateSnapshot.aggregatedData.user.name}
                      </dd>
                      <p className="text-gray-500 dark:text-gray-400">
                        {aggregateSnapshot.aggregatedData.user.introduce}
                      </p>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-10 pb-8 prose dark:prose-invert max-w-none">
                <Markdown
                  source={props.data.text}
                  images={props.data.images}
                />
              </div>
              <div id="comment">
                <Comments
                  type="Post"
                  path={props.data.path}
                  id={props.data.id}
                />
              </div>
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                <div className="py-4 xl:py-8">
                  <h2 className="mb-3 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Category</h2>
                  <Link href={`/archive/category/${props.data.category.slug}`}>
                    <a className="t-4 mr-3 text-sm uppercase text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 font-bold">
                      {props.data.category.name}
                    </a>
                  </Link>
                </div>
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">Tags</h2>
                  <div className="flex flex-wrap">
                    {props.data.tags.map((tag: string) => (
                      <Link href={`/archive/tag/${tag}`}>
                        <a className="mt-3 mr-3 text-sm uppercase text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 font-extralight">
                        {tag}
                      </a>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-4 xl:pt-8">
                    <Link href={"/posts"}>
                      <a className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
                        ← 返回列表
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Post;