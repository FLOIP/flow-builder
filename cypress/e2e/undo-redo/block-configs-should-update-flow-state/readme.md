In general, e2e should focus on what are VISIBLE from users perspective.
But, as we have a bunch of configs to test, we can assume that:
- if a block config UI updates the flow state, it should work with the UNDO/REDO feature

Secondly, a working config UI doesn't mean the component is working with UNDO/REDO, it has to mutate the flow state and not use local state.

Specs within this folder are vertical e2e testing (see more here for details https://katalon.com/resources-center/blog/end-to-end-e2e-testing#h5)
