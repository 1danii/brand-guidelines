"use client";

import Document from "@tiptap/extension-document";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import { FloatingMenu } from "@tiptap/react/menus";
// import StarterKit from "@tiptap/starter-kit";

export function Editor() {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Heading, HardBreak],
    content: "<p>Hello World! 🌎️</p>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  console.log(editor?.schema);

  return (
    <>
      {editor && (
        <FloatingMenu editor={editor}>
          <div className="floating-menu" data-testid="floating-menu">
            <button
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              type="button"
            >
              H1
            </button>
            <button
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              type="button"
            >
              H2
            </button>
          </div>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />;
    </>
  );
}
