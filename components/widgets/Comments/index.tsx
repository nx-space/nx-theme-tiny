/*
 * @FilePath: /nx-theme-tiny/components/widgets/Comments/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 18:14:29
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-09 00:12:03
 * Coding With IU
 */

import { FC, useEffect, useState } from "react";
import styles from './index.module.css'
import clsx from "clsx";
import Link from "next/link";
import { apiClient } from "../../../utils/request.util";
import { mailAvatar } from "../../../utils/mail.util";
import { useMount } from "react-use";
import Markdown from "../../Markdown";

interface ICommentsFC {
  // type 只能填写 post 或 page
  type: 'post' | 'page';
  path: String
  id: String
}

export const Comments: FC<ICommentsFC> = ({ type, path, id }) => {

  const [list, setList] = useState<any>();

  const getComments = async () => {
    return await apiClient(`/comments/ref/${id}`).then(res => {
      setList(res);
      console.log(res);
      return res
    })
  }

  useMount(() => {
    getComments();
  })

  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300 ml-0">
      <div className={clsx(styles["comments"])}>
        <div className="items-center flex flex-auto">
          <div className="flex-wrap whitespace-nowrap items-center flex flex-auto">
            <h4 className="font-semibold">{list?.data.length} comments</h4>
          </div>
        </div>

        <form action="post" className={clsx(styles['form'])}>
          <div className={clsx(styles["boxMain"])}>
            <textarea id="" placeholder="Comment here" className={clsx(styles["textarea"])}></textarea>
          </div>
          <div className={clsx(styles["submitBtn"])}>
            <Link href="https://guides.github.com/features/mastering-markdown/">
              <a className={clsx(styles.markdownSupport)}>
                <svg aria-hidden="true" role="img" className={clsx(styles.supportBtn, "mr-1")} viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path fillRule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg>
                Styling with Markdown is supported
              </a>
            </Link>

            <div className={clsx(styles.submit)}>
              <button type="submit" className={clsx(styles.submitInner)}>Submit Comments</button>
            </div>
          </div>
        </form>

        <div className={clsx(styles.timeline)}>
          {list && list.data.map((item: any, index: Number) => {
            return (
              <div className={clsx(styles.comment)}>
                <div className={clsx(styles.header)}>
                  <div className={clsx(styles.author)}>
                    <a href={item?.url} className={clsx(styles.authorAvatar)}>
                      <img src={item.mail ? mailAvatar(item.mail) : "https://cravatar.cn/avatar/"} alt={item.author} width={30} height={30} />
                      <span>{item.author}</span>
                    </a>
                    <span>
                      <time>
                        {item.created.split('T')[0]}
                      </time>
                    </span>
                  </div>
                  <div className="flex">Reply</div>
                </div>

                <div className={clsx(styles.content)}>
                  <Markdown
                    source={item.text}
                  />
                </div>

                {
                  item.children && (
                    <div className={clsx(styles.replyContainer)}>
                      <div className="relative">
                        <div className={clsx(styles.tlLine)} />
                        {
                          item.children && item.children.map((item: any, index: Number) => {
                            return (
                              <div className={clsx(styles.replyBox)}>
                                <div className={clsx(styles.replyAuthorAvatar)}>
                                  <a href={item?.url} className={clsx(styles.authorAvatar)}>
                                    <img src={item.mail ? mailAvatar(item.mail) : "https://cravatar.cn/avatar/"} alt={item.author} width={30} height={30} />
                                  </a>
                                </div>
                                <div className={clsx(styles.headerBox)}>
                                  <div className={clsx(styles.replyHeader, styles.header)}>
                                    <div className={clsx(styles.author)}>
                                      <a rel="nofollow noopener noreferrer" target="_blank"
                                        href={item?.url} className="flex items-center">
                                        <span className="link-primary font-semibold">{item.author}</span>
                                      </a>
                                      <span className="link-secondary ml-2">
                                        <time className="whitespace-nowrap">
                                          {item.created.split('T')[0]}
                                        </time>
                                      </span>
                                    </div>
                                  </div>
                                  <div className={clsx(styles.content)}>
                                    <Markdown
                                      source={item.text}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                }

              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}