# Set up guide

## Routes

[Full Spec Here](routes/markdown/routes.md)

Auth is up to the implementer for now

## Customising Core Blocks - Slots

## Overriding Core Blocks

## Creating Fully Custom Vendor Blocks

- validations...
  - schema somewhere the app can find... don't use validateCommunityBlock in base store. Dynamically find schema somewhere.
- stores...
  - need BLOCK_TYPE and overriding createWith at least 
  - example minimal...: BaseBlockStore
  - example extending minimal
  - in future export some typescript helpers - IRootState
  - now export some important other functionas that stores sometimes use..? Or can all be done with commit/dispatch? If so, document these...

## Removing Blocks

## Overriding Components - Expression editor etc.

## Customising Views - Slots

## Overriding Views - /flows, /flows/new etc.

## Creating New Views

## Custom styling

- semantic class names on each component div/top level component
