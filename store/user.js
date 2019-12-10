import { http } from "../plugins/axios";

const state = () => ({
    token: '',
    id: '',
    email: '',
    nickname: '',
    avatar: ''
});
// 同步
// commit：同步操作，写法：this.$store.commit('mutations方法名',值)
const mutations = {
    SET_TOKEN(state, token) {
        state.token = token 
    },
    SET_USER(state, user) {
        state.id = user._id 
        state.email = user.email 
        state.nickname = user.nickname 
        state.avatar = user.avatar 
    },
    LOGOUT(state) {
        state.id = ''
        state.token = ''
        state.email = ''
        state.nickname = ''
        state.avatar = ''
    }
};
// 异步 async
// dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('action方法名',值)
const actions = {
    // login.vue 中引用 this.$store.dispatch('user/login', obj)
    login: async({state, commit}, data) => {
        // console.log('action data', data)
        let ret = await http.post('/user/login', data);
        // 登录返回token
        commit('SET_TOKEN', ret.data.token);
        return ret;
    },
    logout: async({state, commit}, data) => {
        let ret = await http.post('/user/logout')
        return ret;
    },
    detail: async({state, commit}, data) => {
        // console.log('action data', data)
        let ret = await http.get('/user/detail');
        if (ret.code === 0) {
            // let token = localStorage.getItem('RX_USER_TOKEN');
            console.log('setuser', ret)
            commit('SET_USER', ret.data);
            // commit('SET_TOKEN', token);
            return ret;
        }
    }
};
export default {
     namespace: true,
     state,
     mutations,
     actions
}