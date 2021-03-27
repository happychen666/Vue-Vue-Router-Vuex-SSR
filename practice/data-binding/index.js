import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
  <div>
    {{isActive?'isActive':'notActive'}}
    {{Date.now()}}
    <div v-html='html' :id="idName" :class="[{active:!isActive},'aaa']" :style="styles"></div>
    {{html}}
  </div>
  `,
  data: {
    isActive: false,
    html: '<p>this is a text</p>',
    idName: 'main',
    styles: {
      color: 'red',
      background: 'blue'
    }
  }
})
