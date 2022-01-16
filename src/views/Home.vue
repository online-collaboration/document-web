<template>
    <div class="playground">
        <h1>Hello, Honeycomb!</h1>
        <div class="editor" ref="editorContainer"></div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'

Quill.register('modules/cursors', QuillCursors)
const ydoc = new Y.Doc()
const provider = new WebsocketProvider(
    'wss://demos.yjs.dev',
    'quill-demo-2',
    ydoc
)
const ytext = ydoc.getText('quill')
const editorContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
    if (!editorContainer.value) {
        return
    }
    const editor = new Quill(editorContainer.value, {
        modules: {
            cursors: true,
            toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block'],
            ],
            history: {
                userOnly: true,
            },
        },
        placeholder: 'Start collaborating...',
        theme: 'snow', // or 'bubble'
    })
    new QuillBinding(ytext, editor, provider.awareness)
})
</script>
<style lang="scss">
body {
    margin: 0;
}
.playground {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100vh;
    padding: 5vw;
    background-color: lightskyblue;

    h1 {
        margin-top: 0;
        font-family: 'Comic Sans MS', fantasy;
    }

    .ql-toolbar {
        background-color: #a6c5dc;
    }

    .editor {
        background-color: white;
    }
}
</style>
