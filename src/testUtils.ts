import * as ts from 'typescript';

export function format(code: string): string {
  const sourceFile = ts.createSourceFile('', code, ts.ScriptTarget.ES2022);
  const printer = ts.createPrinter({});

  return printer.printFile(sourceFile);
}
