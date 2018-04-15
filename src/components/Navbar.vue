<template>
  <nav role="navigation">
    <ul>
      <li v-for="pNav of navs" :key="pNav.id" :class="{ expanded: pNav.isExpanded, hasChildren: pNav.children }">
        <a href="#!" @click="pNav.isExpanded = !pNav.isExpanded">{{ pNav.title }}</a>
        <ul v-if="pNav.children">
          <li v-for="sNav of pNav.children" :key="sNav.id" :class="{ expanded: sNav.isExpanded, hasChildren: sNav.children }">
            <a href="#!" @click="sNav.isExpanded = !sNav.isExpanded">{{ sNav.title }}</a>
            <ul v-if="sNav.children">
              <li v-for="tNav of sNav.children" :key="tNav.id" :class="{ expanded: tNav.isExpanded, hasChildren: tNav.children }">
                <a href="#!" @click="tNav.isExpanded = !tNav.isExpanded">{{ tNav.title }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
  nav {
    position: fixed;
    font-size: 16px;
    color: #eee;
    width: 185px;
    border-right: 1px solid #fff;
  }
  .hasChildren:before {
    content: '+';
  }
  .hasChildren.expanded:before {
    content: '–';
  }
  a {
    display: inline-block;
    padding: 5px 10px;
    color: #eee;
    text-decoration: inherit;
    border: 1px solid transparent;
  }
  a:hover, a:focus {
    border-color: #fff;
  }
  .hasChildren > a:focus {
    border-color: transparent;
  }
  .directory-tree>li:first-child {
    margin-top:0;
  }
  ul {
    list-style-type: none;
    padding-left: 10px;
  }
  li.expanded>ul {
    display: list-item;
  }
  li:not(.expanded)>ul {
    display: none;
  }
</style>
<script>
export default {
  name: 'Navbar',
  data: function () {
    return {
      navs: [
        { title: '目标鱼',
          isExpanded: false,
          children: [
            { title: '草鱼' },
            { title: '鲤鱼' },
            { title: '鲢鳙' },
            { title: '鲫鱼' },
            { title: '青鱼' }
          ]
        },
        { title: '钓场',
          isExpanded: false,
          children: [
            { title: '北京' },
            { title: '北戴河' },
            { title: '石家庄' },
            { title: '长春' }
          ]
        },
        { title: '装备',
          isExpanded: false,
          children: [
            { title: '鱼竿' },
            { title: '鱼漂' },
            { title: '鱼线' },
            { title: '鱼钩' }
          ]
        },
        { title: '鱼食',
          isExpanded: false,
          children: [
            { title: '饵料' },
            { title: '窝料' }
          ]
        },
        { title: '决策支持',
          isExpanded: false,
          children: [
            { title: '历史数据分析' },
            { title: '钓场地图' },
            { title: '钓鱼计划',
              isExpanded: false,
              children: [
                { title: '机器人推荐' },
                { title: '团队讨论' }
              ]
            },
            { title: '选钓位' }
          ]
        },
        { title: '钓鱼日志' }
      ]
    }
  }
}
</script>
