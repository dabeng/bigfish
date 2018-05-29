<template>
  <div class="gallery">
    <div class="column">
      <img src="../assets/20150903_061401.jpg">
      <img src="../assets/20170803_161928.jpg">
    </div>
    <div class="column">
      <img src="../assets/20150912_110500.jpg">
    </div>
    <div class="column">
      <img src="../assets/20160625_063734.jpg">
      <img src="../assets/20160625_073616.jpg">
      <img src="../assets/20160702_074649.jpg">
    </div>
    <div class="column">
      <img src="../assets/20160826_153520.jpg">
      <img src="../assets/20160827_052823.jpg">
      <img src="../assets/20160909_173959.jpg">
    </div>
    <div class="column">
      <img src="../assets/20160910_061354.jpg">
    </div>
    <div class="column">
      <img src="../assets/20170719_142248.jpg">
      <img src="../assets/20170729_052006.jpg">
      <img src="../assets/20170803_151740.jpg">
    </div>
  </div>
</template>
<style scoped>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    padding: 0 2px 2px 162px;
  }
  .column {
    flex: 16.666%;
    max-width: 16.666%;
    padding: 0 2px;
    box-sizing: border-box;
  }
  img {
    width: 100%;
    margin-top: 4px;
    vertical-align: middle;
  }
  @media (max-width: 1200px) {
    .column {
      flex: 25%;
      max-width: 25%;
    }
  }
  @media (max-width: 1000px) {
    .column {
      flex: 33.333%;
      max-width: 33.333%;
    }
  }
  @media (max-width: 800px) {
    .column {
      flex: 50%;
      max-width: 50%;
    }
  }
  @media (max-width: 600px) {
    .column {
      flex: 100%;
      max-width: 100%;
    }
  }
</style>
<script>
export default {
  name: 'Gallery'
}
</script>
