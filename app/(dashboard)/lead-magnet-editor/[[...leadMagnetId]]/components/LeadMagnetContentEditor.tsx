import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContext";
import { Editor, EditorContent } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import LeadMagnetContentPreview from "./LeadMagnetContentPreview";

function LeadMagnetContentEditor() {
  const { editedLeadMagnet, setEditedLeadMagnet } =
    useLeadMagnetEditorContext();
  const [editor, setEditor] = React.useState<Editor | null>(null);

  useEffect(() => {
    if (!editor) {
      setEditor(
        new Editor({
          extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
            Heading.configure({ levels: [1, 2, 3] }),
            CodeBlock,
            BulletList,
            OrderedList,
            ListItem,
            History,
          ],
          content: editedLeadMagnet.draftBody,
          onUpdate: ({ editor }) => {
            setEditedLeadMagnet((prev) => ({
              ...prev,
              draftBody: editor.getHTML(),
            }));
          },
        })
      );
    }

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex h-full flex-row">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">
          Content Editor
        </h1>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Title
          </label>
          <Input
            type="text"
            value={editedLeadMagnet.draftTitle}
            onChange={(e) =>
              setEditedLeadMagnet((prev) => ({
                ...prev,
                draftTitle: e.target.value,
              }))
            }
            placeholder="What is the title of your lead magnet?"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Subtitle
          </label>
          <Input
            type="text"
            value={editedLeadMagnet.draftSubtitle}
            onChange={(e) =>
              setEditedLeadMagnet((prev) => ({
                ...prev,
                draftSubtitle: e.target.value,
              }))
            }
            placeholder="What is the title of your lead magnet?"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Body
          </label>
          {editor && (
            <EditorContent
              className="h-[50vh] w-full appearance-none overflow-y-scroll rounded border"
              editor={editor}
            />
          )}
        </div>
      </div>
      <div className="purple-dotted-pattern flex h-full w-1/2 flex-col overflow-y-auto">
        <div className="mx-12 my-8 flex h-full max-w-lg lg:mx-auto">
          <LeadMagnetContentPreview
            title={editedLeadMagnet.draftTitle}
            subtitle={editedLeadMagnet.draftSubtitle}
            body={editedLeadMagnet.draftBody}
          />
        </div>
      </div>
    </div>
  );
}

export default LeadMagnetContentEditor;
