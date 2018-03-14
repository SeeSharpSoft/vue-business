# Vibe - Components

## Guideline

- file names UpperCamelCase
- component names start with Vibe*, e.g VibeIcon
- class names and ids should be kebab case
- class names prefixed with vibe-*
- each component has a class equal to its name, e.g. VibeIcon => vibe-icon class
- simple template with the main goal of a simple DOM
- layout/styling should be done in CSS/LESS only (if possible)
- minimal base theming
- define component specific LESS variables based on global LESS variables, e.g. @vibe-calendar-background: @vibe-primary-background;
- no scoped LESS/CSS
- use of mixins for reusable functionality and to unify/define API

## To Define:

- code style
- component structure
- global LESS variables and helper methods

## First components

- Calendar
- Avatar
- Icon
- Button
- ...
