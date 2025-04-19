module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow inline Tailwind utility classes on <Button />',
    },
    messages: {
      noInlineClasses: 'Avoid inline Tailwind classes on <Button>. Use variant/size instead.',
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        // Check if the component is named "Button"
        const isButton = node.name.name === 'Button';
        if (!isButton) return;

        // Find the className attribute
        const classNameAttr = node.attributes.find((attr) => attr.name?.name === 'className');

        // Only handle static className strings for now
        if (classNameAttr && classNameAttr.value?.type === 'Literal') {
          const value = classNameAttr.value.value;

          // Tailwind-style utility classes (basic pattern detection)
          if (
            typeof value === 'string' &&
            /\b(bg-|text-|px-|py-|pl-|pr-|pt-|pb-|w-|h-|rounded-)/.test(value)
          ) {
            context.report({
              node: classNameAttr,
              messageId: 'noInlineClasses',
            });
          }
        }
      },
    };
  },
};
