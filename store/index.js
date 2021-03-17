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
            //  localStorage.setItem('auth',JSON.stringify(state.))
            }
          },
        actions:{
        },
        getters: {
            getuserLogged(state) {
                return state.userLogged
            },
            getAuthValue(state) {
                return state.authenticated
            }
            
        }
    })
}

export default createStore