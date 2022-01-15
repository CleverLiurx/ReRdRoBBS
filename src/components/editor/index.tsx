import React, { useState, useEffect } from "react";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig } from "@wangeditor/editor";
import { message } from "antd";
import styled from "@emotion/styled";

type InsertFnType = (url: string, alt: string, href: string) => void;
interface FileRes {
  errno: string;
  errmsg: string;
  data: {
    url: string;
    alt: string;
    href: string;
  };
}

export const MyEditor = ({
  defaultText,
  editorApi,
  readOnly = false,
}: {
  defaultText?: string;
  editorApi?: (e: IDomEditor) => void;
  readOnly?: boolean;
}) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例

  // 工具栏
  const toolbarConfig = {
    excludeKeys: ["fullScreen"],
  };
  // 编辑器
  let editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} };
  editorConfig = {
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        // 上传图片的配置
        server: process.env.REACT_APP_API_URL + "/file",
        fieldName: "file",
        maxNumberOfFiles: 1,
        withCredentials: true,
        customInsert(res: FileRes, insertFn: InsertFnType) {
          if (res.errno !== "0") {
            message.error("上传失败请联系管理员");
            return;
          }
          const { url, alt, href } = res.data;
          insertFn(url, alt, href);
        },
      },
    },
    onCreated(editor: IDomEditor) {
      setEditor(editor);
      editor.dangerouslyInsertHtml(defaultText || ""); // 设置默认值
      readOnly && editor.disable();
      editorApi && editorApi(editor);
      // @ts-ignore
      process.env.NODE_ENV === "development" && (window._editor = editor);
    },
  };

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      {/* @ts-ignore  */}
      <DiyEditor readOnly={readOnly}>
        {!readOnly ? (
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{
              border: "1px solid #ccc",
              position: "sticky",
              zIndex: "2",
              top: "64px",
            }}
          />
        ) : null}

        <Editor
          defaultConfig={editorConfig}
          mode="default"
          style={
            readOnly
              ? {
                  minHeight: "auto",
                }
              : {
                  border: "1px solid #ccc",
                  borderTop: "none",
                }
          }
        />
      </DiyEditor>
    </>
  );
};

const DiyEditor = styled.div`
  #w-e-textarea-1 {
    min-height: ${(props) => {
      // @ts-ignore
      return props.readOnly ? "auto" : "320px";
    }};
  }
`;
