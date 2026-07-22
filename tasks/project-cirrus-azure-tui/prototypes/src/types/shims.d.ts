declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Minimal but faithful Storybook typing stub so stories typecheck without
// installing the full Storybook toolchain in the prototype sandbox.
declare module '@storybook/react' {
  type PropsOf<T> = T extends (props: infer P) => unknown ? P : Record<string, unknown>;
  export type Meta<T> = {
    component?: T;
    title?: string;
    tags?: string[];
    decorators?: Array<(Story: () => JSX.Element) => JSX.Element>;
    parameters?: Record<string, unknown>;
    argTypes?: Record<string, unknown>;
  };
  export type StoryObj<T> = {
    args?: Partial<PropsOf<T>>;
    render?: (args: PropsOf<T>) => unknown;
    parameters?: Record<string, unknown>;
  };
}
