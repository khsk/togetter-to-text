<template>
    <nav class="navbar is-fixed-top is-primary">
        <div class="navbar-brand ">
          <!-- <img src="~/assets/images/logo.png"> -->
          <p class="wf-nicomoji has-text-light is-size-3 name">{{title}}</p>
        </div>
    </nav>
</template>

<style>
    .name {
        user-select: none;
    }
</style>

<script>
import { mapState }  from 'vuex'
export default {
    computed: mapState({
        title     : 'title',
    }),
}
</script>