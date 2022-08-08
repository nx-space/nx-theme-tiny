/*
 * @FilePath: /nx-theme-tiny/components/Markdown/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 16:01:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 18:10:38
 * Coding With IU
 */


import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import gfm from 'remark-gfm'
import images from '../../states/images.state'
import { isClientSide } from '../../utils/ssr.util'
import { CodeBlock } from './renderers/CodeBlock'
import { Image } from './renderers/Image'
export const Markdown = (props: { source: string, [key: string]: any }) => {
  props.images ? images.data = props.images : null
  return (
    <div id="write">
      <ReactMarkdown
      remarkPlugins={[
        gfm,
        rehypeKatex
      ]}
      components={isClientSide() && {
        // 'img': Image,
        // 'pre': CodeBlock,
        // 'code': CodeBlock,
      } || {}}
      >
        {props.source}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown