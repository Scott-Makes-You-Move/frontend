import * as React from 'react';

export type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = unknown,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponent<DefaultElement extends React.ElementType, OwnProps = unknown> = <
  C extends React.ElementType = DefaultElement,
>(
  props: PolymorphicComponentProp<C, OwnProps>,
) => React.ReactElement | null;

export function createPolymorphicComponent<
  DefaultElement extends React.ElementType,
  OwnProps = unknown,
>(
  render: (
    props: PolymorphicComponentProp<DefaultElement, OwnProps>,
    ref: React.Ref<any>,
  ) => React.ReactElement | null,
): PolymorphicComponent<DefaultElement, OwnProps> {
  return React.forwardRef(render as any) as any;
}
