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
  setup(props, { emit }) {
    let email = props.email;
    let toggleRead = () => {
      emit("changeEmail", { toggleRead: true, save: true });
    };
    let toggleArchived = () => {
      emit("changeEmail", {
        toggleArchive: true,
        save: true,
        closeModal: true,
      });
    };
    let goNewer = () => {
      emit("changeEmail", { changeIndex: -1 });
    };
    let goOlder = () => {
      emit("changeEmail", { changeIndex: 1 });
    };
    let goNewerAndArchive = () => {
      emit("changeNewer", {
        changeIndex: -1,
        toggleArchived: true,
        save: true,
      });
    };
    let goOlderAndArchive = () => {
      emit("changeEmail", { changeIndex: 1, toggleArchived: true, save: true });
    };
    useKeydown([
      {
        key: "r",
        fn: toggleRead,
      },
      {
        key: "a",
        fn: toggleArchived,
      },
      {
        key: "n",
        fn: goNewer,
      },
      {
        key: "o",
        fn: goOlder,
      },
      {
        key: "[",
        fn: goNewerAndArchive,
      },
      {
        key: "]",
        fn: goOlderAndArchive,
      },
    ]);
    return {
      format,
      marked,
      toggleRead,
      toggleArchived,
      goNewer,
      goOlder,
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