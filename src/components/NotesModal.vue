<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" scrollable max-width="60%">
      <v-card>
        <v-card-text>
          <v-card-title>Notes for {{ TASK_TITLE }}</v-card-title>
          <v-list three-line>
            <v-list-item v-for="(note, key) in NOTES" v-bind:key="key">
              <v-list-item-content>
                <v-list-item-title>{{ note.note }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click.prevent="deleteNote(note.id)">
                  <v-icon color="red">delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-container>
            <v-form @submit.prevent="addNote()">
              <v-textarea
                outline
                v-model="note"
                label="Note"
                placeholder="Start writing your note here"
              ></v-textarea>

              <v-btn color="success" type="submit" class="mb-5">Add note</v-btn>
            </v-form>
            <v-flex xs12>
              <img :src="imageUrl" height="150" />
              <v-text-field
                label="Select an Image"
                v-model="imageName"
                prepend-icon="attach_file"
                @click="pickFile()"
              ></v-text-field>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              />
            </v-flex>
            <v-btn :loading="loading" :disabled="!imageFile" @click="uploadFile()">
              Attach picture
              <v-icon right dark>attach_file</v-icon>
            </v-btn>
          </v-container>

          <v-card-actions>
            <v-btn text color="primary" @click="open = false">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="red" dark @click="deleteTask()">Remove Task</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
export default {
  name: "notesModal",
  data: () => ({
    note: "",
    open: true,
    imageUrl: "",
    imageName: "",
    imageFile: ""
  }),
  computed: {
    NOTES() {
      return this.$store.getters.NOTES(
        this.$route.params.id,
        this.$route.params.taskId
      );
    },
    TASK_TITLE() {
      return this.$store.getters.TASK_TITLE(
        this.$route.params.id,
        this.$route.params.taskId
      );
    }
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;

      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0];
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    uploadFile() {
      console.log(this.imageFile);
    },
    addNote() {
      this.$store
        .dispatch("POST_NOTE", {
          note: this.note,
          taskId: this.$route.params.taskId,
          listId: this.$route.params.id
        })
        .then(response => {
          this.note = "";
        })
        .catch(error => {
          this.$store.commit("SET_NOTIFICATION", {
            dispay: true,
            text: "Something went wrong",
            alertClass: "error"
          });
        });
    },
    deleteNote(noteId) {
      this.$store
        .dispatch("DELETE_NOTE", {
          noteId,
          taskId: this.$route.params.taskId,
          listId: this.$route.params.id
        })
        .then(response => {
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: "Note has been removed",
            alertClass: "success"
          });
        })
        .catch(error => {
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: "Something bad happened",
            alertClass: "error"
          });
        });
    },
    deleteTask() {
      this.$store
        .dispatch("DELETE_TASK", {
          taskId: this.$route.params.taskId,
          listId: this.$route.params.id
        })
        .then(status => {
          if (status === 204) {
            this.$store.commit("SET_NOTIFICATION", {
              display: true,
              text: "Task has been removed",
              alertClass: "success"
            });
            this.open = false;
          }
        })
        .catch(error => {
          this.$store.commit("SET_NOTIFICATION", {
            display: true,
            text: "Something bad happened",
            alertClass: "error"
          });
        });
    }
  },
  mounted() {
    this.$store.dispatch("GET_NOTES", {
      listId: this.$route.params.id,
      taskId: this.$route.params.taskId
    });
  },
  watch: {
    open: function(value) {
      if (value === false) {
        this.$router.push({
          name: "tasks",
          params: {
            id: this.$route.params.id
          }
        });
      }
    }
  }
};
</script>