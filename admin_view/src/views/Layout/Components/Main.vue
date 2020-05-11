<template>
    <div id="main-wrap">
        <router-view /> 
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    #main-wrap {
        height: calc(100vh - 50px);
        overflow: scroll;
    }
</style>

