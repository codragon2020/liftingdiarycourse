# UI Coding Standards

## Component Library

This project uses **shadcn/ui** as the sole UI component library.

## Rules

1. **Only use shadcn/ui components** - All UI elements must be built using shadcn/ui components
2. **No custom components** - Do not create custom UI components; use shadcn/ui components exclusively
3. **Install components as needed** - Use `npx shadcn@latest add <component>` to add new shadcn/ui components to the project

## Adding Components

To add a new shadcn/ui component:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc.
```

## Component Location

shadcn/ui components are installed to `components/ui/` and can be imported using the path alias:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
```

## Why shadcn/ui Only

- Ensures consistent design language across the application
- Reduces maintenance overhead from custom component implementations
- Provides accessible, well-tested components out of the box
- Integrates seamlessly with Tailwind CSS
