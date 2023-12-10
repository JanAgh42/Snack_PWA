<template>
  <q-page class="col row justify-center items-center" fullscreen>
    <article
      class="q-pa-lg bkg-primary rounded-borders items-center column commands-width q-mx-xl q-my-xl"
    >
      <h6 class="q-mb-md text-h6">Available command bindings</h6>
      <article class="commands-height row">
        <section>
          <span class="text-weight-bold">@username - </span>
          <span class="real-name-color"
            >address your message to certain users. All group members will see
            the message, but it will be highlighted for the specified users.
            Hint - you can automatically insert @username by clicking on the
            user nickname in the right pane.
          </span>
        </section>
        <section class="q-mt-md">
          <span class="text-weight-bold">/ - </span>
          <span class="real-name-color"
            >indicates the beginning of an operation query inside the command
            line. Hint - a valid command's color will turn green.
          </span>
        </section>
        <section class="q-mt-md">
          <span class="text-weight-bold">/join groupname - </span>
          <span class="real-name-color"
            >join an existing group. If a group does not exist, it will be
            created. Hint - a user can only join a public group - in order to
            become a member of a private one, you have to be invited by its
            owner.
          </span>
        </section>
        <section class="q-mt-md">
          <span class="text-weight-bold">/join groupname [visibility] - </span>
          <span class="real-name-color"
            >create a new group. Inside the square brackets replace 'visibility'
            with either 'public' to create a group open to all users, or
            'private' to create a hidden group. Hint - your group's name has to
            be unique.
          </span>
        </section>
        <section class="q-mt-md">
          <span class="text-weight-bold">/invite username - </span>
          <span class="real-name-color"
            >add another user to the currently selected group. Hint - you can
            add any user to a public group, but in a private group only the
            owner can add users.
          </span>
        </section>
        <section class="q-mt-md">
          <span class="text-weight-bold">/revoke username - </span>
          <span class="real-name-color"
            >remove a user from the currently selected group. Available in
            private groups only. Hint - only the owner can use this command.
          </span>
        </section>
        <section class="q-mt-md">
          <span class="text-weight-bold">/quit - </span>
          <span class="real-name-color"
            >delete the currently selected group. Available in both private and
            public groups. Hint - only the owner can use this command.
          </span>
        </section>
        <section class="q-mt-md">
          <span class="text-weight-bold">/cancel - </span>
          <span class="real-name-color"
            >leave the currently selected group. Available in both private and
            public groups. Hint - when the owner leaves his group, it is
            automatically deleted.
          </span>
        </section>
        <section class="q-mt-md">
          <span class="text-weight-bold">/kick username - </span>
          <span class="real-name-color"
            >remove a user from the currently selected group. Available in
            public groups only. Hint - a regular user cannot remove the owner.
          </span>
        </section>
        <section class="q-mt-md">
          <span class="text-weight-bold">/list - </span>
          <span class="real-name-color"
            >show the list of members of the currently active group together
            with their activity status in a separate modal.
          </span>
        </section>
        <section class="q-mt-md">
          <span class="text-weight-bold">/list groupname - </span>
          <span class="real-name-color"
            >show the list of members of any group the user is a member of,
            together with their activity status in a separate modal.
          </span>
        </section>
      </article>
    </article>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useApplicationStore } from 'src/stores/applicationStore';

const appStore = useApplicationStore();

onMounted(() => (appStore.chosenAppPage = '/settings'));
</script>

<style scoped lang="scss">
.commands-width {
  max-width: 700px;
}

.commands-height {
  max-height: 300px;
  overflow: auto;
}

::-webkit-scrollbar-track {
  background: $primary;
}

::-webkit-scrollbar-thumb {
  background: $secondary;
}
</style>
