// Миксин, который отвечает за открытие и закрытие диалогового окна
// Его можно примешать к любому всплывающему объекту (списку, окну и т.д.)
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }

  },
  methods: {
    hideDialog() {
      // Эмиттим наверх обновление пропса show - меняем на false при скрытии диалога
      this.$emit('update:show', false)
    }
  },
  mounted() {
    console.log('Mixin mounted')
  }
  //...

}