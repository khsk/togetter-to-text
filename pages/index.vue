<template>
<div class="container">
    <my-nav></my-nav>
    <h1>hello world</h1>
    <div class="container">
        <label class="label" for="input-id">取得するまとめ</label>
        <div class="field has-addons">
            <div class="control is-expanded">
                <input id="input-id" class="input is-primary is-large" type="number" :value="togetterId" v-bind:readonly=isLoading @input="setId" placeholder="取得したいTogetterのIDを入力してください(https://togetter.com/li/(ID))">
                <p class="help">取得したいTogetterのIDを入力してください https://togetter.com/li/(ID)</p>
            </div>
            <div class="control">
                <a class="button is-large is-primary  wf-nicomoji" v-on:click="getText" v-bind:class="{ 'is-loading': isLoading }">
                    取得
                </a>
            </div>
        </div>
    </div>
    <result v-if="text"></result>
    <loading-screen></loading-screen>
</div>
</template>

<script>
import { mapState }  from 'vuex'
import Result        from '@/components/result.vue'
import LoadingScreen from '@/components/loading-screen.vue'
import MyNav from '@/components/nav.vue'
export default {
    components: {
        Result,
        LoadingScreen,
        MyNav,
    },
    computed: mapState({
        togetterId: 'togetterId',
        isLoading : 'isLoading', 
        text      : 'text',
    }),
    methods: {
        setId(e) {
            this.$store.commit('setId', e.target.value)
        },
        getText(e) {
            this.$store.commit('setIsLoadig', true)
            this.$store.dispatch('getText', this.$store.togetterId).then(() => {
                this.$store.commit('setIsLoadig', false)
            })
        }
    }
}
</script>