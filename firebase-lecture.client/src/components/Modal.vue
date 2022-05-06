<template>
  <div
    class="modal fade"
    id="form-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog border-0" role="document">
      <div class="modal-content border border-2 border-warning rounded">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="modal-title"> <!--title slot --></slot>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-danger"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="modal-body"><!--body slot --></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {};
  },
};
</script>


<style scoped>
</style>