<template>
  <nav role="navigation">
    <ul>
      <li v-for="pNav of categories" :key="pNav.id" :class="{ expanded: pNav.isExpanded, hasChildren: pNav.children }">
        <a :href="pNav.url" @click="goto(pNav)">{{ pNav.name }}</a>
        <ul v-if="pNav.children">
          <li v-for="sNav of pNav.children" :key="sNav.id" :class="{ expanded: sNav.isExpanded, hasChildren: sNav.children }">
            <a :href="sNav.url" @click="goto(sNav)">{{ sNav.name }}</a>
          </li>
        </ul>
      </li>
      <!--<li class="expanded hasChildren">
        <a href="#!">目标鱼</a>
        <ul>
          <li v-for="fish of fishes" :key="fish.abc">
            <a href="#!" @click="goto(fish)">{{ fish.name }}</a>
          </li>
        </ul>
      </li>
      <li class="expanded hasChildren">
        <a href="#!">钓场</a>
        <ul>
          <li v-for="place of places" :key="place.id">
            <a href="#!" @click="goto(place)">{{ place.name }}</a>
          </li>
        </ul>
      </li>
      <li class="expanded hasChildren">
        <a href="#!">装备</a>
        <ul>
          <li v-for="equipment of equipments" :key="equipment.id">
            <a href="#!" @click="goto(equipment)">{{ equipment.name }}</a>
          </li>
        </ul>
      </li>-->
      <!--<li v-for="place of places" :key="place.id" class="expanded">
        <a href="#!" @click="goto(place)">{{ fish.name }}</a>
      </li>
      <li v-for="equipment of equipments" :key="equipment.id" class="expanded">
        <a href="#!" @click="goto(equipment)">{{ fish.name }}</a>
      </li>
      <li v-for="pNav of navs" :key="pNav.id" :class="{ expanded: pNav.isExpanded, hasChildren: pNav.children }">
        <a :href="pNav.url" @click="goto(pNav)">{{ pNav.title }}</a>
        <ul v-if="pNav.children">
          <li v-for="sNav of pNav.children" :key="sNav.id" :class="{ expanded: sNav.isExpanded, hasChildren: sNav.children }">
            <a :href="sNav.url" @click="goto(sNav)">{{ sNav.title }}</a>
            <ul v-if="sNav.children">
              <li v-for="tNav of sNav.children" :key="tNav.id" :class="{ expanded: tNav.isExpanded, hasChildren: tNav.children }">
                <a :href="tNav.url" @click="goto(tNav)">{{ tNav.title }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>-->
    </ul>
  </nav>
</template>
<style scoped>
  nav {
    position: fixed;
    font-size: 16px;
    color: #000;
    width: 159px;
    border-right: 1px solid #000;
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
    color: #000;
    text-decoration: inherit;
    border: 1px solid transparent;
  }
  a:hover, a:focus {
    border-color: #000;
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
import firebase from 'firebase'
import {fishRef, placeRef, equipmentRef} from '../firebase'

export default {
  name: 'Navbar',
  firebase: {
    fishes: fishRef,
    places: placeRef,
    equipments: equipmentRef
  },
  data: function () {
    return {
      navs: [
        { title: '目标鱼',
          url: '#!',
          isExpanded: false,
          children: [
            { title: '草鱼', url: '/grass-carp' },
            { title: '鲤鱼', url: '/common-carp' },
            { title: '鲢鳙', ur: '/silver-carp-bighead' },
            { title: '鲫鱼', url: '/crucian-carp' },
            { title: '青鱼', url: '/black-carp' }
          ]
        },
        { title: '钓场',
          url: '#!',
          isExpanded: false,
          children: [
            { title: '北京', url: '/fishing-spot/beijing' },
            { title: '北戴河', url: '/fishing-spot/beidaihe' },
            { title: '石家庄', url: '/fishing-spot/shijiazhuang' },
            { title: '长春', url: '/fishing-spot/changchun' }
          ]
        },
        { title: '装备',
          url: '#!',
          isExpanded: false,
          children: [
            { title: '鱼竿', url: '/fishing-kit/fishing-pole' },
            { title: '鱼漂', url: '/fishing-kit/float' },
            { title: '鱼线', url: '/fishing-kit/fishing-line' },
            { title: '鱼钩', url: '/fishing-kit/fishhook' }
          ]
        },
        { title: '鱼食',
          url: '#!',
          isExpanded: false,
          children: [
            { title: '饵料', url: '/fish-food/bait' },
            { title: '窝料', url: '/fish-food/feed' }
          ]
        },
        { title: '决策支持',
          url: '#!',
          isExpanded: false,
          children: [
            { title: '历史数据分析', url: '/decision-support/data-analysis' },
            { title: '钓场地图', url: '/decision-support/fishing-spot-map' },
            { title: '钓鱼计划',
              url: '#!',
              isExpanded: false,
              children: [
                { title: '机器人推荐', url: '/decision-support/fishing-plan/robot-recommendation' },
                { title: '团队讨论', url: '/decision-support/fishing-plan/team-discussion' }
              ]
            },
            { title: '选钓位', url: '/decision-support/select-position' }
          ]
        },
        { title: '钓鱼日志', url: '/fishing-log' },
        { title: '消息中心', url: '/messages' },
        { title: '配置中心', url: '/config' },
        { title: '布局切换', url: '/toggle-layout' },
        { title: '退出登录', url: '#!' }
      ]
    }
  },
  computed: {
    categories: function () {
      return [{
        name: '目标鱼',
        url: '#!',
        isExpanded: false,
        children: this.fishes
      }, {
        name: '钓场',
        url: '#!',
        isExpanded: false,
        children: this.places
      }, {
        name: '装备',
        url: '#!',
        isExpanded: false,
        children: this.equipments
      }]
    }
  },
  methods: {
    goto: function (navItem) {
      navItem.isExpanded = !navItem.isExpanded
      if (navItem.name === '退出登录') {
        firebase.auth().signOut().then(() => {
          this.$router.replace('signin')
        })
      }
    }
  }
}
</script>
