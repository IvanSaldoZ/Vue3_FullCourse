<template>
  <!-- При клике по темной области - скрываем диалог-->
  <div class="dialog" v-if="show" @click="hideDialog">
    <!-- Убираем наследование события от парента путем добавления StopPropagation-->
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: "my-dialog",
  mixins: [toggleMixin],
  mounted() {
    console.log('MyDialog mounted')
  }
  // Всё это вынес в миксин
  // props: {
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  // methods: {
  //   hideDialog() {
  //     // Эмиттим наверх обновление пропса show - меняем на false при скрытии диалога
  //     this.$emit('update:show', false)
  //   }
  // }
}
</script>

<style scoped>

.dialog {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}

</style>