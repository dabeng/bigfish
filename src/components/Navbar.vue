<template>
  <nav role="navigation">
    <ul>
      <li v-for="pNav of categories" :key="pNav.id" :class="{ hasChildren: pNav.children }">
        <a v-if="!pNav.url" href="#!" @click="goto(pNav, $event)">{{ pNav.name }}</a>
        <router-link v-else :to="pNav.url">{{ pNav.name }}</router-link>
        <ul v-if="pNav.children">
          <li v-for="sNav of pNav.children" :key="sNav.id" :class="{ hasChildren: sNav.children }">
            <a v-if="!sNav.url" href="#!" @click="goto(pNav, $event)">{{ sNav.name }}</a>
            <router-link v-else :to="sNav.url">{{ sNav.name }}</router-link>
          </li>
        </ul>
      </li>
      <li v-for="pNav of navs" :key="pNav.id" :class="{ hasChildren: pNav.children }">
        <a v-if="!pNav.url" href="#!" @click="goto(pNav, $event)">{{ pNav.name }}</a>
        <router-link v-else :to="pNav.url">{{ pNav.name }}</router-link>
        <ul v-if="pNav.children">
          <li v-for="sNav of pNav.children" :key="sNav.id" :class="{ hasChildren: sNav.children }">
            <a v-if="!sNav.url" href="#!" @click="goto(sNav, $event)">{{ sNav.name }}</a>
            <router-link v-else :to="sNav.url">{{ sNav.name }}</router-link>
            <ul v-if="sNav.children">
              <li v-for="tNav of sNav.children" :key="tNav.id" :class="{ hasChildren: tNav.children }">
                <a v-if="!tNav.url" href="#!" @click="goto(tNav, $event)">{{ tNav.name }}</a>
                <router-link v-else :to="tNav.url">{{ tNav.name }}</router-link>
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
    background-color: #eee;
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
        { name: '鱼食',
          children: [
            { name: '饵料', url: '/fish-food/bait' },
            { name: '窝料', url: '/fish-food/feed' }
          ]
        },
        { name: '决策支持',
          children: [
            { name: '历史数据分析', url: '/decision-support/data-analysis' },
            { name: '钓场地图', url: '/decision-support/fishing-spot-map' },
            { name: '钓鱼计划',
              children: [
                { name: '机器人推荐', url: '/decision-support/fishing-plan/robot-recommendation' },
                { name: '团队讨论', url: '/decision-support/fishing-plan/team-discussion' }
              ]
            },
            { name: '选钓位', url: '/decision-support/select-position' }
          ]
        },
        { name: '钓鱼日志', url: '/fishing-log' },
        { name: '消息中心', url: '/messages' },
        { name: '配置中心', url: '/config' },
        { name: '布局切换', url: '/toggle-layout' },
        { name: '退出登录' }
      ]
    }
  },
  computed: {
    categories: function () {
      return [{
        name: '目标鱼',
        children: this.fishes
      }, {
        name: '钓场',
        children: this.places
      }, {
        name: '装备',
        children: this.equipments
      }]
    }
  },
  methods: {
    goto: function (navItem, e) {
      if (e.target.parentNode.classList.contains('expanded')) {
        e.target.parentNode.classList.remove('expanded')
      } else {
        e.target.parentNode.classList.add('expanded')
      }
      if (navItem.name === '退出登录') {
        firebase.auth().signOut().then(() => {
          this.$router.replace('signin')
        })
      }
    }
  }
}
</script>
