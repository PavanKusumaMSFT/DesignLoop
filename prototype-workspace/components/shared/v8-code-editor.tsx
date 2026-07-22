import React, { useState } from 'react';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import './v8-code-editor.css';

/* ===========================================
   Code Editor
   Monaco editor wrapper for syntax-highlighted code editing
   =========================================== */

export interface CodeEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The code content */
  value?: string;
  /** Default value (for uncontrolled usage) */
  defaultValue?: string;
  /** Language for syntax highlighting (e.g., 'kusto', 'json', 'sql', 'javascript') */
  language?: string;
  /** Height of the editor (number in pixels or CSS string) */
  height?: number | string;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Whether to show line numbers */
  lineNumbers?: boolean;
  /** Whether to enable minimap */
  minimap?: boolean;
  /** Whether the editor has an error state */
  error?: boolean;
  /** Callback when content changes */
  onChange?: (value: string | undefined) => void;
  /** Callback when editor is mounted */
  onMount?: OnMount;
}

/**
 * CodeEditor - Monaco-based code editor component
 * 
 * Provides syntax highlighting and editing for various languages.
 * Supports KQL, JSON, SQL, JavaScript, TypeScript, and many more.
 */
export function CodeEditor({
  value,
  defaultValue,
  language = 'plaintext',
  height = 300,
  readOnly = false,
  lineNumbers = true,
  minimap = false,
  error = false,
  onChange,
  onMount,
  className = '',
  ...props
}: CodeEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const classNames = [
    'ap-code-editor',
    error && 'ap-code-editor--error',
    isFocused && !error && 'ap-code-editor--focused',
    className,
  ].filter(Boolean).join(' ');

  const handleMount: OnMount = (editor, monaco) => {
    // Track focus state
    editor.onDidFocusEditorWidget(() => setIsFocused(true));
    editor.onDidBlurEditorWidget(() => setIsFocused(false));

    // Call user's onMount if provided
    onMount?.(editor, monaco);
  };

  const handleChange: OnChange = (newValue) => {
    onChange?.(newValue);
  };

  return (
    <div className={classNames} aria-invalid={error || undefined} {...props}>
      <Editor
        height={height}
        language={language}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onMount={handleMount}
        loading={<div className="ap-code-editor__loading">Loading editor...</div>}
        options={{
          readOnly,
          lineNumbers: lineNumbers ? 'on' : 'off',
          minimap: { enabled: minimap },
          scrollBeyondLastLine: false,
          fontSize: 13,
          fontFamily: '"Cascadia Code", "Fira Code", Consolas, "Courier New", monospace',
          tabSize: 2,
          automaticLayout: true,
          wordWrap: 'on',
          folding: true,
          renderLineHighlight: 'line',
          selectOnLineNumbers: true,
          roundedSelection: false,
          cursorStyle: 'line',
          contextmenu: true,
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
      />
    </div>
  );
}
