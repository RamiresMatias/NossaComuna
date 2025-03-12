<template>
  <div class="select-tag">
    <ul class="select-tag__list">
      <li v-for="(tag, i) in tagsSelected" :key="`${i}-${tag}`" class="select-tag__item">
        <Tag class="flex gap-2 items-center bg-primary-50" severity="secondary">
          <span class="text-surface-900">{{ tag.description }}</span>
          <i
            class="pi pi-times cursor-pointer text-surface-900 hover:text-red-400 flex items-center justify-center rounded-full
            transition-all"
            @click="removeTag(i)"
          ></i>
        </Tag>
      </li>
      <li v-if="tags.length < 4" class="select-tag__input">
        <input 
          type="text" 
          placeholder="Adicione 4 tags"
          v-model="search" 
          :disabled="loadingTags"
          @focus="openDropdown"
          @keyup.prevent.enter="handleEnterTag"
        />
        <div v-if="showDropdown" class="select-tag__options">
          <div class="w-full border-b border-b-solid border-b-neutral-200 p-3 flex items-center justify-between">
            <h3 class="text-lg">Selecione uma tag</h3>
            <i
              class="pi pi-times cursor-pointer text-surfacec-900 font-normal hover:text-red-400 flex items-center justify-center rounded-full
              transition-all text-base"
              @click="showDropdown = false"
            ></i>
          </div>
          <ul class="flex flex-col items-start justify-start w-full" >
            <li 
              v-for="item in filteredList" 
              :key="item.id" 
              class="select-tag__options__tag"
              @click="selectTag(item.id)"
            >
              {{ item.description }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTag } from '@/modules/tag/composables/useTag/useTag'

const tags = defineModel<string[]>({
  default: []
})

const showDropdown = ref(false)

const { filteredList, search, create, loading: loadingTags } = useTag()

const tagsSelected = computed(() => filteredList.value.filter(el => tags.value.includes(el.id)))

const handleEnterTag = async () => {
  const tagFound = filteredList.value.find((el) => el.description.toLowerCase() === search.value.trim().toLowerCase())
  if (tagFound) return selectTag(tagFound.id)
  
  const newTag = await create(search.value.trim())

  if (newTag) tags.value.push(newTag)
}

const selectTag = (tagId: string) => {
  const hasSelected = tags.value.includes(tagId)
  if (hasSelected) return
  tags.value.push(tagId)
  showDropdown.value = false
  search.value = ''
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}

const openDropdown = () => {
  showDropdown.value = true
}
</script>

<style lang="scss" scoped>
.select-tag {
  @apply w-full px-8;

  &__list {
    @apply w-full flex flex-wrap items-center gap-2 list-none relative;
  }

  &__input {
    input {
      @apply outline-none border-none p-2;
    }
  }

  &__input:focus-within .select-tag__options {
    @apply opacity-100 transition-all flex-col items-center justify-start;
  }

  &__options {
    @apply transition-all delay-500 absolute top-10 left-0 h-[200px] z-10
    w-[400px] rounded-md bg-white overflow-y-auto shadow-md border border-solid border-neutral-200;
    &__tag {
      @apply transition-all w-full hover:bg-primary-50 cursor-pointer p-3;
    }
  }
}
</style>