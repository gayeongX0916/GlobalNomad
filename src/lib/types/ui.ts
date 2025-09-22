export type MenuItem<
  T extends string | number | undefined = string | undefined
> = {
  label: string;
  value?: T;
};
