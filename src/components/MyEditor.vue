<template>
  <section
    v-if="editor"
    class="tw-flex tw-items-center tw-flex-wrap tw-gap-x-3 tw-border-t tw-border-l tw-border-r tw-border-gray400 tw-p-4"
  >
    <button
      @click.prevent="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{
        'tw-bg-gray200 tw-rounded': editor.isActive('bold'),
      }"
      class="tw-p-1"
    >
      <q-icon name="mdi-format-bold" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{
        'tw-bg-gray200 tw-rounded': editor.isActive('italic'),
      }"
      class="tw-p-1"
    >
      <q-icon name="mdi-format-italic" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleUnderline().run()"
      :class="{
        'tw-bg-gray200 tw-rounded': editor.isActive('underline'),
      }"
      class="tw-p-1"
    >
      <q-icon name="format_underlined" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="setLink"
      :class="{
        'tw-bg-gray200 tw-rounded': editor.isActive('link'),
      }"
      class="tw-p-1"
    >
      <q-icon name="link" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().unsetLink().run()"
      :disabled="!editor.isActive('link')"
      class="tw-p-1"
    >
      <q-icon name="link_off" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{
        'tw-bg-gray200 tw-rounded': editor.isActive('heading', {
          level: 1,
        }),
      }"
      class="tw-p-1"
    >
      <q-icon name="mdi-format-header-1" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{
        'tw-bg-gray200 tw-rounded': editor.isActive('heading', {
          level: 2,
        }),
      }"
      class="tw-p-1"
    >
      <q-icon name="mdi-format-header-2" size="20px"></q-icon>
    </button>

    <button
      @click.prevent="editor.chain().focus().toggleBulletList().run()"
      :class="{
        'tw-bg-gray200 tw-rounded': editor.isActive('bulletList'),
      }"
      class="tw-p-1"
    >
      <q-icon name="format_list_bulleted" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleOrderedList().run()"
      :class="{
        'tw-bg-gray200 tw-rounded': editor.isActive('orderedList'),
      }"
      class="tw-p-1"
    >
      <q-icon name="mdi-format-list-numbered" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().setHorizontalRule().run()"
      class="tw-p-1"
    >
      <q-icon name="horizontal_rule" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleBlockquote().run()"
      :class="{
        'tw-bg-gray200 tw-rounded': editor.isActive('blockquote'),
      }"
      class="tw-p-1"
    >
      <q-icon name="mdi-format-quote-close" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{
        'tw-bg-gray200 tw-rounded': editor.isActive('code'),
      }"
      class="tw-p-1"
    >
      <q-icon name="code" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
      class="tw-p-1"
    >
      <q-icon name="undo" size="20px"></q-icon>
    </button>
    <button
      @click.prevent="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
      class="tw-p-1"
    >
      <q-icon name="redo" size="20px"></q-icon>
    </button>
  </section>
  <editor-content :editor="editor" />
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
  editorProps: {
    attributes: {
      class:
        "tw-border tw-prose tw-border-gray400 tw-p-4 tw-min-h-[12rem] tw-max-h-[12rem] tw-overflow-y-auto tw-outline-none tw-max-w-none",
    },
  },
  extensions: [
    StarterKit,
    Underline,
    Link.configure({
      protocols: ["ftp", "mailto"],
      autolink: true,
      openOnClick: true,
      validate: (href) => /^https?:\/\//.test(href),
    }),
  ],
});
</script>
