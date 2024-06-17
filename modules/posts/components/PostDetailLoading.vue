<template>
  <div class="w-full h-full mx-auto max-w-3xl bg-white rounded-md flex flex-col">
    <Skeleton width="100%" height="20rem"></Skeleton>
    <div class="w-full h-full flex flex-col max-w-[80%] mx-auto mt-8">
      <div class="flex w-full py-4 gap-2">
        <Skeleton shape="circle" size="2.5rem"></Skeleton>
        <div class="w-full h-full flex flex-col flex-1 gap-2">
          <Skeleton width="6rem" height="1rem"></Skeleton>
          <Skeleton width="6rem" height="1rem"></Skeleton>
        </div>
      </div>
      <div class="w-full flex gap-4 mb-10">
        <Skeleton shape="circle" size="1rem"></Skeleton>
        <Skeleton shape="circle" size="1rem"></Skeleton>
      </div>
      <Skeleton width="30rem" height="2rem" class="mb-8"></Skeleton>
      <Skeleton width="100%" height="50rem"></Skeleton>
    </div>
  </div>
</template>