// state, mutations, actions, getter

export const state = () => ({
  data: []
});

export const mutations = {
  setData(state, data) {
    // state.data=data;
    state.data.unshift(data);
  }
}

export const actions = {}
