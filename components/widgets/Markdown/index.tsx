/*
 * @FilePath: /nx-theme-tiny/components/widgets/Markdown/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 16:01:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 16:04:31
 * Coding With IU
 */


import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import gfm from 'remark-gfm'
export default function Markdown(props: { source: string }) {
  return(
    <ReactMarkdown remarkPlugins={[
      gfm,
      rehypeKatex
      ]}>
      {props.source}
    </ReactMarkdown>
  )
}