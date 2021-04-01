<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchived">
        Set {{ email.archived ? "un" : "" }}archived (a)
      </button>
      <button @click="toggleRead">
        Mark {{ email.read ? "un" : "" }}read (r)
      </button>
      <button @click="goNewer">Newer (n)</button
      ><button @click="goOlder">Older (o)</button>
    </div>
    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em
        >From {{ email.from }} on
        {{ format(new Date(email.sentAt), "MMM do yyyy") }}</em
      >
    </div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<script>
import { format } from "date-fns";
import axios from "axios";
import marked from "marked";
import useKeydown from "../composables/useKeydown";
export default {
  setup(props) {
    let email = props.email;
    let toggleRead = () => {
      email.read = !email.read;
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    };
    let toggleArchived = () => {
      email.archived = !email.archived;
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    };
    useKeydown([
      {
        key: "r",
        fn: () => {
          toggleRead();
        },
      },
      {
        key: "a",
        fn: () => {
          toggleArchived();
        },
      },
    ]);
    return {
      format,
      marked,
      toggleRead,
    };
  },
  props: {
    email: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>