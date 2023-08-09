declare module 'prettier' {
  export function format(code: string, opts?: Record<string, unknown>): string;
}
