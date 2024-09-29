<script setup>
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { ref } from "vue";

// 接收父组件的 content 参数
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// 将 content 初始化为 props.content
const content = ref(props.content);

// 处理表单提交事件
async function onSubmit() {
  const res = await fetch(`/api/push-${props.path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: content.value }),
  });
  console.log(res.status);
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textarea v-model="content" class="border-2 h-96"></Textarea>
    <Button>保存修改</Button>
  </form>
</template>
