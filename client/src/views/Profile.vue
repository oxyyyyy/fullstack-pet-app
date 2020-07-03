<template>
  <div class="page">
    <form enctype="multipart/form-data" @submit.prevent="editProfile">
      <div class="profile__header">
        <figure class="profile__avatar image is-128x128">
          <img class="is-rounded" :src="user.avatarPath" />
        </figure>
        <b-field class="file">
          <b-upload v-model="user.avatar">
            <a class="button is-primary">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="user.avatar">
            {{ user.avatar.name }}
          </span>
        </b-field>
      </div>
      <b-field label="Name">
        <b-input v-model="user.username"></b-input>
      </b-field>
      <b-field label="Email">
        <b-input v-model="user.email" type="email"></b-input>
      </b-field>
      <b-button type="is-primary" native-type="submit">Edit</b-button>
    </form>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      user: {
        username: "",
        email: "",
        avatarPath: "",
        avatar: null
      },
      isLoading: false
    };
  },
  mounted() {
    this.isLoading = true;
    axios
      .get(`/profile/${this.$route.params.id}`)
      .then(response => {
        this.user.username = response.data.username;
        this.user.email = response.data.email;
        this.user.avatarPath = response.data.avatar;
      })
      .catch(() => {
        this.$buefy.toast.open({
          message: `Something went wrong`,
          position: "is-bottom",
          type: "is-danger"
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  methods: {
    editProfile() {
      let formData = new FormData();
      formData.append("username", this.user.username);
      formData.append("email", this.user.email);
      if (this.user.avatar) {
        formData.append("filedata", this.user.avatar);
      }
      console.log(formData);
      this.isLoading = true;
      axios
        .put(`/profile/${this.$route.params.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: this.$store.state.jwtToken
          }
        })
        .then(() => {
          this.$store.dispatch("profileUpdate", {
            username: this.user.username
          });
          this.$buefy.toast.open({
            message: "Profile was edited",
            position: "is-bottom",
            type: "is-success"
          });
          this.$router.go();
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: `Something went wrong`,
            position: "is-bottom",
            type: "is-danger"
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.profile__header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.profile__avatar {
  margin-right: 2rem;

  img {
    background-color: #e9e9e9;
    min-height: 128px;
  }
}
</style>
