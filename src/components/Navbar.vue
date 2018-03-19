<template>
  <ul class="directory-tree">
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
</template>
<style scoped>
  .directory-tree {
    display: inline-block;
    font-size: 18px;
  }
  li {
    list-style-type: none;
  }
  .hasChildren:before {
    content: '›'
  }
  .hasChildren.expanded:before {
    content: '›';
    display: inline-block;
    transform: rotate(90deg);
  }
  a {
    display: inline-block;
    padding: 5px 10px;
    color: inherit;
    text-decoration: inherit;
  }
  a:hover {
    color: #b80036;
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
        { title: 'Target Fish',
          isExpanded: false,
          children: [
            { title: 'Grass Carp' },
            { title: 'Carp' },
            { title: 'Silver Carp' },
            { title: 'Bighead Carp' },
            { title: 'Crucian Carp' },
            { title: 'Blunt-snout Bream' },
            { title: 'Yellow-head Catfish' },
            { title: 'Black Carp' },
            { title: 'Catfish' },
            { title: 'Turtle' }
          ]
        },
        { title: 'Fishing Spot',
          isExpanded: false,
          children: [
            { title: 'Beijing' },
            { title: 'Beidaihe' },
            { title: 'Shi Jiazhuang' },
            { title: 'Changchun' }
          ]
        },
        { title: 'Equipments',
          isExpanded: false,
          children: [
            { title: 'Fishing Pole' },
            { title: 'Float' },
            { title: 'Fishing Line' },
            { title: 'Fishhook' }
          ]
        },
        { title: 'Fish Food',
          isExpanded: false,
          children: [
            { title: 'Bait' },
            { title: 'Feed' },
            { title: 'Additive' }
          ]
        },
        { title: 'Decision Support',
          isExpanded: false,
          children: [
            { title: 'Data Analysis' },
            { title: 'Fishing Spot Map' },
            { title: 'Fishing Plan',
              isExpanded: false,
              children: [
                { title: 'Robot Decision' },
                { title: 'Team Discussion' }
              ]
            },
            { title: 'Select Position' }
          ]
        },
        { title: 'Fishing Log' }
      ]
    }
  }
}
</script>
