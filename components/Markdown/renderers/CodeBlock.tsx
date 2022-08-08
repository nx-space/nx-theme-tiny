/*
 * @FilePath: /nx-theme-tiny/components/Markdown/renderers/CodeBlock.tsx
 * @author: Wibus
 * @Date: 2022-08-08 16:57:22
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-08 17:26:54
 * Coding With IU
 */
import { useCallback, useEffect, useRef } from 'react'
import { message } from 'react-message-popup'
import { loadStyleSheet, loadScript } from '../../../utils/load.util'
import styles from './index.module.css'


export const CodeBlock = (props) => {
  const { language, value } = props

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value)
    message.success('COPIED!')
  }, [value])


  useEffect(() => {
    const css = loadStyleSheet(
      `https://cdn.jsdelivr.net/gh/PrismJS/prism-themes@master/themes/prism-one-${
      // isPrintMode ? 'light' : colorMode
      // "dark"
      "light"
      }.css`,
    )

    return () => {
      css?.remove()
    }
  }, [])
  useEffect(() => {
    loadStyleSheet(
      'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/line-numbers/prism-line-numbers.min.css',
    )

    Promise.all([
      loadScript(
        'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/components/prism-core.min.js',
      ),
    ])
      .then(() =>
        Promise.all([
          loadScript(
            'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js',
          ),
          loadScript(
            'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/line-numbers/prism-line-numbers.min.js',
          ),
        ]),
      )
      .then(() => {
        if (ref.current) {
          requestAnimationFrame(() => {
            window.Prism?.highlightElement(ref.current)

            requestAnimationFrame(() => {
              window.Prism?.highlightElement(ref.current)
            })
          })
        } else {
          requestAnimationFrame(() => {
            window.Prism?.highlightAll()
            // highlightAll twice

            requestAnimationFrame(() => {
              window.Prism?.highlightAll()
            })
          })
        }
      })
  }, [])


  const ref = useRef<HTMLElement>(null)
  return (
    <div className={styles['code-wrap']}>
      <span className={styles['language-tip']} aria-hidden>
        {language}
      </span>

      <pre className="line-numbers !bg-transparent" data-start="1">
        <code className={`language-${language ?? 'markup'}`} ref={ref}>
          {value}
        </code>
      </pre>

      <div className={styles['copy-tip']} onClick={handleCopy} aria-hidden>
        Copy
      </div>
    </div>
  )
}