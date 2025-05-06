## General Rules
- Constants should always be at the top of the file and in all caps, not in functions
- Always consider if somethign you're writing can be reused. If so, abstract it
- Always use arrow functions and const patterns, not "function"
- prefer exporting functions inline, e.g. `export const someFunc = () => {}`
- Use the `autoClassName` function in `src/lib/utils.ts` when adding classes to an element
- Never make your own UI components. If the one you need isn't in `src/components/ui` then generate it with `shadcn`. If the component isn't available from `shadcn` then you can make your own, but generate your own in `src/components/ui` and import it.
- Always use the next Image component for images

## Tool Use
- Search the web for documentation when you're unsure of something
- use `npm` not yarn or pnpm
- Whenever you complete your work, check for problems and fix them before you consider your work complete. Do this until there are no problems left. DO NOT SKIP THIS STEP.

## Preferences when writing PayloadCMS code
- ALWAYS import collection types from `@payload-config`, never make your own
- Never write to `@payload-config` yourself. If the types don't exist it's likely just that the file needs to be added to the global config for the type generator to run
- When typing Media fields, use the payloadcms `Media` type and then mark fields that have `number | Media` as the type `as Media`
