const state = {
  isSignedIn: localStorage.getItem("jwt_token") ? true : false,
  userID: localStorage.getItem("userID"),
  jwtToken: localStorage.getItem("jwt_token")
    ? "Bearer " + localStorage.getItem("jwt_token")
    : "",
  username: localStorage.getItem("username")
};

const getters = {
  isSignedIn: state => state.isSignedIn,
  userID: state => state.userID,
  jwtToken: state => state.jwtToken,
  username: state => state.username
};

const mutations = {
  signIn(state, payload) {
    state.isSignedIn = true;
    state.userID = payload.userID;
    state.jwtToken = "Bearer " + payload.jwtToken;
    state.username = payload.username;
  },
  signOut(state) {
    state.isSignedIn = false;
    state.userID = "";
    state.username = "";
  },
  changeUsername(state, payload) {
    state.username = payload.username;
  }
};

const actions = {
  signIn(context, payload) {
    localStorage.setItem("jwt_token", payload.token);
    localStorage.setItem("userID", payload.userID);
    localStorage.setItem("username", payload.username);
    context.commit("signIn", payload);
  },
  signOut(context) {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("userID");
    localStorage.removeItem("username");
    context.commit("signOut");
  },
  profileUpdate(context, payload) {
    localStorage.setItem("username", payload.username);
    context.commit("changeUsername", payload);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
