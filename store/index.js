import Vuex from 'vuex'


const createStore =() => {
    return new Vuex.Store({
        
        state:{
            authenticated:null,
            userLogged:null,
        },
        mutations: {
            update (state, payload) {
             state.authenticated = payload.authenticated
             state.userLogged = payload.userLogged
            }
          },
        actions:{
            updateDetails(vuexContext,data){
                vuexContext.commit('update',data);
            }
        },
        getters: {
            getuserLogged(state) {
                return state.userLogged
            },
            
        }
    })
}

export default createStore