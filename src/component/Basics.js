import React, { useEffect, useRef } from 'react';
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
})



export const Basic = () => {
  const EditorRef = useRef(null);
  useEffect(()=>{
    window.view = new EditorView(EditorRef.current, {
   state: EditorState.create({
   doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
    plugins: exampleSetup({schema: mySchema})
  })
})
  })

  return(
    <>
      <div className='info'>Here is a demo of ProseMirror</div>
      <div ref={EditorRef} ></div>
    </>
  )
}
