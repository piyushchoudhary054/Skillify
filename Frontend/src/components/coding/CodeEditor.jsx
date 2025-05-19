import { useState, useEffect } from 'react'
import MonacoEditor from '@monaco-editor/react'

const CodeEditor = ({ initialCode, language, onChange }) => {
  const [code, setCode] = useState(initialCode || '')
  
  useEffect(() => {
    if (initialCode !== undefined) {
      setCode(initialCode)
    }
  }, [initialCode])

  const handleEditorChange = (value) => {
    setCode(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className="h-full border rounded-md">
      <MonacoEditor
        height="100%"
        language={language.toLowerCase()}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default CodeEditor