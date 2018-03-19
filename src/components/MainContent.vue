<template>
  <div class="main-content">
    <div class="image-gallery">
      <div class="column">
        <img src="../assets/20140526_092728.jpg">
        <img src="../assets/20140706_142255.jpg">
        <img src="../assets/20150509_080029.jpg">
        <img src="../assets/20150903_061401.jpg">
        <img src="../assets/20150912_110500.jpg">
        <img src="../assets/20150912_114858.jpg">
        <img src="../assets/20151002_102649.jpg">
      </div>
      <div class="column">
        <img src="../assets/20160522_115331.jpg">
        <img src="../assets/20160625_063734.jpg">
        <img src="../assets/20160625_073616.jpg">
        <img src="../assets/20160702_074649.jpg">
        <img src="../assets/20160702_074700.jpg">
        <img src="../assets/20160702_112548.jpg">
        <img src="../assets/20160702_122653.jpg">
      </div>
      <div class="column">
        <img src="../assets/20160801_154042.jpg">
        <img src="../assets/20160826_153520.jpg">
        <img src="../assets/20160826_153828.jpg">
        <img src="../assets/20160827_052823.jpg">
        <img src="../assets/20160827_115657.jpg">
        <img src="../assets/20160909_173959.jpg">
        <img src="../assets/20160910_061354.jpg">
      </div>
      <div class="column">
        <img src="../assets/20160910_140947.jpg">
        <img src="../assets/20160923_065319.jpg">
        <img src="../assets/20170312_122909.jpg">
        <img src="../assets/20170719_142251.jpg">
        <img src="../assets/20170722_093803.jpg">
        <img src="../assets/20170729_052006.jpg">
        <img src="../assets/20170729_091747.jpg">
      </div>
      <div class="column">
        <img src="../assets/20170803_104152.jpg">
        <img src="../assets/20170803_151740.jpg">
        <img src="../assets/20170803_161745.jpg">
        <img src="../assets/20171006_134024.jpg">
        <img src="../assets/20170722_093803.jpg">
        <img src="../assets/20170729_052006.jpg">
      </div>
      <div class="column">
        <img src="../assets/20170729_091747.jpg">
        <img src="../assets/20170803_104152.jpg">
        <img src="../assets/20170803_151740.jpg">
        <img src="../assets/20170803_161745.jpg">
        <img src="../assets/20171006_134024.jpg">
        <img src="../assets/20160801.jpg">
      </div>
    </div>
  </div>
</template>
<style scoped>
  .main-content {
    width: calc(100% - 180px);
    float: right;
  }
  .image-gallery {
    display: flex;
    flex-wrap: wrap;
  }
  .column {
    flex: 16.66%;
    padding: 0 4px;
    box-sizing: border-box;
  }
  img {
    width: 100%;
  }
</style>
<script>
export default {
  name: 'MainContent'
}
</script>
