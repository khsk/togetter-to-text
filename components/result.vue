<template>
<section class="hero is-primary">
  <div class="hero-body">
      <div class="container">
        <h2 class="title wf-nicomoji">取得結果</h2>
            <a class="button is-info"  v-on:click="copyToClipbord">
                Copy to Clipbord
            </a>
            <a class="button is-link"  v-on:click="downloadText">
                Download as .txt
            </a>
        </div>
    </div>
    <pre id="tweets">{{text}}</pre>
</section>
</template>

<script>
import { mapState }  from 'vuex'
import { toast } from "bulma-toast"

export default {
    computed: mapState({
        text      : 'text',
    }),
    methods: {
        copyToClipbord(e) {
            console.log(toast)
            document.addEventListener('copy', (e) => {
                e.preventDefault();
                e.clipboardData.setData('text/plain', document.querySelector('#tweets').textContent);
                toast({ message: "Copy to Clipbord", type: "is-success", position: "bottom-right"});
            }, {once:true});
            if(!document.execCommand('copy')) {
                toast({ message: "Error!", type: "is-danger", position: "bottom-right"});    
            }
        },
        downloadText(e) {
            const blob = new Blob([this.$store.state.text], {type: 'text/plain'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = this.$store.state.text.split('\n')[0] + '.txt'
            link.click()
        },
    }
}
</script>