/*
 * @FilePath: /nx-theme-tiny/components/layouts/Header/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 12:28:09
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 12:26:09
 * Coding With IU
 */

import { FC, useState } from "react";
import clsx from "clsx";
import { useSnapshot } from "valtio";
import appState from "../../../states/appState";
import Link from "next/link";

export const Header: FC<any> = () => {


  const [isOpen, setIsOpen] = useState(false);

  const aggregateSnapshot = ((useSnapshot(appState)).aggregate as any)

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href={"/"}>
          <a>
            <div className="flex items-center justify-between">
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {aggregateSnapshot?.aggregatedData.sites?.title}
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          <Link href={`/posts`}>
            <a className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100" >Posts</a>
          </Link>

          <Link href={`/archive`}>
            <a className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100" >Archive</a>
          </Link>

          <Link href={`/links`}>
            <a className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100" >Links</a>
          </Link>
          {
            aggregateSnapshot?.aggregatedData.page_meta?.map((item: any) => {
              return (
                <Link href={`/${item.slug}`}>
                  <a key={item.id} className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100" >{item.title}</a>
                </Link>
              )
            })
          }
        </div>
        {/* <button aria-label="Toggle Dark Mode" type="button" className="w-8 h-8 p-1 ml-1 mr-1 rounded sm:ml-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-gray-900 dark:text-gray-100"> <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
        </button> */}
        <div className="sm:hidden">
          <button type="button" className="w-8 h-8 ml-1 mr-1 rounded" aria-label="Toggle Menu" onClick={() => {
            setIsOpen(!isOpen);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-gray-900 dark:text-gray-100"> <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className={clsx(
            isOpen ? "translate-x-0" : "translate-x-full",
            "fixed w-full h-full top-24 right-0 bg-gray-200 dark:bg-gray-800 opacity-95 z-10 transform ease-in-out duration-300"
          )}>

            <button type="button" aria-label="toggle modal" className="fixed w-full h-full cursor-auto focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-gray-900 dark:text-gray-100"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>


            <nav className="fixed h-full mt-8">
              <div className="px-12 py-4">
                <a className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100" href="/blog">Blog</a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}