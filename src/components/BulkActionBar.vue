<template>
  <h1>
    <input
      type="checkbox"
      :checked="allEmailsSelected"
      :class="[someEmailsSelected ? 'partial-check' : '']"
      @click="bulkSelect"
    />
  </h1>
</template>

<script>
import useEmailSelection from "@/composables/useEmailSelection";
import { computed } from "vue";
export default {
  setup(props) {
    let emailSelection = useEmailSelection();
    let numberSelected = computed(() => emailSelection.emails.size);
    let numberEmails = props.emails.length;
    let allEmailsSelected = computed(
      () => numberSelected.value === numberEmails
    );
    let someEmailsSelected = computed(
      () => numberSelected.value > 0 && numberSelected.value < numberEmails
    );
    let bulkSelect = function () {
      if (allEmailsSelected.value) {
        emailSelection.clear();
      } else {
        emailSelection.addMultiple(props.emails);
      }
    };
    return {
      allEmailsSelected,
      someEmailsSelected,
      bulkSelect
    };
  },
  props: {
    emails: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
</style>