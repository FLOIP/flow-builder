<template>
  <div class="card">
    <div class="card-body sm-padding-below font-roboto">
      {{blockName}} block is not supported right now.
      You will not be able to proceed. Please Exit.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blockName: String,
  },
}
</script>
