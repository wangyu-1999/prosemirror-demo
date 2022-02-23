import React, { useEffect, useRef } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

export const Basics = () => {
  const EditorRef = useRef(null);
  const ContentRef = useRef(null);

  useEffect(() => {
    window.view = new EditorView(EditorRef.current, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(ContentRef.current),
        plugins: exampleSetup({ schema: mySchema }),
      }),
    });
  }, []);

  return (
    <>
      <div>Here is a demo of ProseMirror</div>
      <div
        style={{
          marginTop: "20px",
          position: "relative",
          left: "30px",
          width: "300px",
        }}
      >
        <div ref={EditorRef}></div>
      </div>

      <div ref={ContentRef} style={{ display: "none" }}>
        <h3>Hello ProseMirror</h3>

        <p>This is editable text. You can focus it and start typing.</p>

        <p>
          To apply styling, you can select a piece of text and manipulate its
          styling from the menu. The basic schema supports <em>emphasis</em>,{" "}
          <strong>strong text</strong>,{" "}
          <a href="http://marijnhaverbeke.nl/blog">links</a>,{" "}
          <code>code font</code>, and{" "}
          <img src="@/public/img/smiley.png" alt="smile" /> images.
        </p>

        <p>
          Block-level structure can be manipulated with key bindings (try
          ctrl-shift-2 to create a level 2 heading, or enter in an empty
          textblock to exit the parent block), or through the menu.
        </p>

        <p>
          Try using the “list” item in the menu to wrap this paragraph in a
          numbered list.
        </p>
      </div>
    </>
  );
};
