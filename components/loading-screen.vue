<template>
<div class="pageloader" v-bind:class="{ 'is-active': isLoading }">
    <span class="title wf-nicomoji">取得中… 数分かかりますワン</span>
</div>
</template>

<script>
import { mapState }  from 'vuex'
export default {
    computed: mapState({
        isLoading : 'isLoading', 
    }),
}
</script>