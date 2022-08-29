import * as ts from "typescript";
import { prettier } from "../utils";

// TypeScriptのコードを整形して、比較可能な文字列に正規化する
export function format(code: string): string {
  const sourceFile = ts.createSourceFile("", code, ts.ScriptTarget.ES2015);
  const printer = ts.createPrinter();

  return prettier(printer.printFile(sourceFile));
}
