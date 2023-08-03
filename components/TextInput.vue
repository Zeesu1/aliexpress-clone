<template>
  <div>
    <client-only>
      <input
        v-model="inputRef"
        autocomplete="off"
        class="w-full bg-white text-gray-800 border text-sm border-#EFF0EB rounded-lg p-3 placeholder-gray-500 focus:outline-none"
        :placeholder="placeholder"
        :maxlength="max"
        :class="{ 'border-gray-900': isFocused, 'border-red-500': error }"
        :type="inputType"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </client-only>
    <span v-if="error" class="text-red-500 text-14px font-semibold">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: String as PropType<string | null>,
    default: '',
  },
  max: {
    type: Number,
    default: 100,
  },
  inputType: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  error: String,
  'onUpdate:value': Function as PropType<(value: string | null) => void>,
})

const { placeholder, max, inputType, error } = toRefs(props)

const isFocused = ref(false)

const inputRef = computed({
  get: () => props.value,
  set: value => props['onUpdate:value']?.(value),
})
</script>
