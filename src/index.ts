import { parser } from "./prolog.grammar";
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

export const prologLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ")", align: false }),
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
      // TODO: https://lezer.codemirror.net/docs/ref/#highlight.tags
      styleTags({
        Identifier: t.variableName,
        Boolean: t.bool,
        String: t.string,
        LineComment: t.lineComment,
        "( )": t.paren,
      }),
    ],
  }),
  languageData: {
    // TODO: https://codemirror.net/docs/ref/#state.EditorState.languageDataAt
    commentTokens: { line: ";" },
  },
});

export function prolog() {
  return new LanguageSupport(prologLanguage);
}
