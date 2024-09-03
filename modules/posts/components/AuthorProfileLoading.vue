<template>
  <div class="w-full max-h-96 bg-white shadow-sm border-t-[30px] border-t-gray-300 border-solid rounded-md flex flex-col gap-5 box-border p-4">
    <NuxtLink to="/posts" class="flex gap-2 items-end -mt-8">
      <Skeleton width="3rem" height="3rem" shape="circle"></Skeleton>
      <Skeleton width="10rem" height="1rem"></Skeleton>
    </NuxtLink>
    <div class=" font-regular text-gray-500">
      <Skeleton width="18rem" height="1rem"></Skeleton>
    </div>
    <div class="info">
      <Skeleton width="3rem" height="1rem"></Skeleton>
      <Skeleton width="5rem" height="1rem"></Skeleton>
    </div>
    <div class="info">
      <Skeleton width="3rem" height="1rem"></Skeleton>
      <Skeleton width="5rem" height="1rem"></Skeleton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  @apply flex flex-col  text-sm gap-2;

  &__title {
    @apply font-semibold text-gray-600;
  }

  &__description {
    @apply text-neutral-500;
  }
}
</style>