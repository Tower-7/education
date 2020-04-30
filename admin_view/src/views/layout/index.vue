<template>
    <div id="layout" class="open">
        <LayoutHeader />
        <LayoutNav />
    </div>
</template>
<script>
import LayoutHeader from './Components/Header'
import LayoutNav from './Components/Nav'
export default {
    name: 'layout',
    components: {LayoutHeader,LayoutNav},
  
}
</script>
<style lang="scss" scoped></style>