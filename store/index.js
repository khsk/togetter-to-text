import axios from 'axios'

export const state = () => ({
    togetterId : '',
    text       : '',
    isLoading  : false,
})

export const mutations = {
    setId(state, id) {
        state.togetterId = id
    },
    setText(state, text) {
        state.text = text
    },
    setIsLoadig(state, loadingState) {
        state.isLoading = !!loadingState
    },
}

export const actions = {
    getText(context) {
        return axios.post('/api', {
            id : context.state.togetterId,
        }).then(response => {
            // console.log(response)
            context.commit('setText', response.data)
        }).catch(error => {
            console.error('getText', error)
        })
    },
}
