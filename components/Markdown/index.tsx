/*
 * @FilePath: /nx-theme-tiny/components/Markdown/index.tsx
 * @author: Wibus
 * @Date: 2022-08-08 16:01:35
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 18:16:26
 * Coding With IU
 */


import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import gfm from 'remark-gfm'
import images from '../../states/images.state'
import { isClientSide } from '../../utils/ssr.util'
import { CodeBlock } from './renderers/CodeBlock'
import { Image } from './renderers/Image'
export const Markdown = (props: { source: string, [key: string]: any }) => {
  props.images ? images.data = props.images : null

  const [components, setComponents] = useState({})

  useEffect(() => {
    setComponents({
      'img': Image,
      'pre': CodeBlock,
      'code': CodeBlock,
    })
  }, [])

  return (
    <div id="write">
      <ReactMarkdown
        remarkPlugins={[
          gfm,
          rehypeKatex
        ]}
        components={isClientSide() && components || {}}
      >
        {props.source}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown