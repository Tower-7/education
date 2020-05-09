<template>
    <div id="layout" class="open">
        <LayoutHeader />
        <LayoutNav />
        <Main />
    </div>
</template>
<script>
import LayoutHeader from './Components/Header'
import LayoutNav from './Components/Nav'
import Main from './Components/Main'
export default {
    name: 'layout',
    components: {LayoutHeader,LayoutNav, Main},
  
}
</script>
<style lang="scss" scoped>
   
</style>