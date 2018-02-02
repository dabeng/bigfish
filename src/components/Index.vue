<template>
  <ul>
    <li v-for="pItem of items" :key="pItem.id">
      {{ pItem.title }}
      <ul v-if="pItem.children">
        <li v-for="sItem of pItem.children" :key="sItem.id">
          {{ sItem.title }}
          <ul v-if="sItem.children">
            <li v-for="tItem of sItem.children" :key="tItem.id">
              {{ tItem.title }}
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Index',
  data: function () {
    return {
      items: [
        { title: 'Target Fish',
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
          children: [
            { title: 'Beijing' },
            { title: 'Beidaihe' },
            { title: 'Shi Jiazhuang' },
            { title: 'Changchun' }
          ]
        },
        { title: 'Equipments',
          children: [
            { title: 'Fishing Pole' },
            { title: 'Float' },
            { title: 'Fishing Line' },
            { title: 'Fishhook' }
          ]
        },
        { title: 'Fish Food',
          children: [
            { title: 'Bait' },
            { title: 'Feed' },
            { title: 'Additive' }
          ]
        },
        { title: 'Decision Support',
          children: [
            { title: 'Data Analysis' },
            { title: 'Fishing Spot Map' },
            { title: 'Fishing Plan',
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
<style scoped>
  li {
    list-style-type:none;
  }
  ul {
    margin-left: -20px;
  }
</style>
