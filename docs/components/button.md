# 🧱 Button Component

The `Button` component is a flexible, accessible, and polymorphic UI primitive. It supports:

- Visual **variants** (`default`, `ghost`, `outline`, etc.)
- **Sizes** (`default`, `sm`, `lg`, `icon`)
- A **loading** state with spinner
- **Polymorphism** with `as` prop (`<a>`, `NextLink`, etc.)
- **Type-safe props** via TypeScript
- Built-in **accessibility guardrails** (e.g. `aria-label` checks)

## 🧩 Features

| Feature                  | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| ✅ TailwindCSS + CVA     | Uses `class-variance-authority` for consistent styling     |
| ✅ Polymorphic rendering | Supports `as="a"` or `as={Link}`                           |
| ✅ Type-safe             | Full TypeScript support                                    |
| ✅ Accessible            | Warns if icon-only buttons lack labels                     |
| ✅ Loading support       | Use `loading` prop to show spinner and disable interaction |

## 📦 Usage

### Basic

```tsx
<Button>Click Me</Button>
```

### Variant + Size

```tsx
<Button variant="outline" size="lg">
  Outline Button
</Button>
```

### As a Link

```tsx
<Button as="a" href="/about">
  Go to About
</Button>
```

### With Next.js Link

```tsx
import Link from 'next/link';

<Button as={Link} href="/pricing">
  Pricing
</Button>;
```

### Icon Button (Accessible)

```tsx
<Button size="icon" aria-label="Search">
  <SearchIcon />
</Button>
```

### Loading State

```tsx
<Button loading>Saving...</Button>
```
