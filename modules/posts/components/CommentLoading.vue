<template>
  <div class="w-full flex gap-2">
    <Skeleton width="2rem" height="2rem" shape="circle"></Skeleton>
    <div class="w-full flex flex-col">
      <div class="w-full border border-solid border-gray-200 rounded-md flex flex-col p-2">
        <div class="flex gap-2 w-full items-center justify-start mb-4">
          <Skeleton width="6rem" height="1rem"></Skeleton>
        </div>
        <Skeleton width="20rem" height="3rem"></Skeleton>
      </div>
      <div class="flex items-center gap-2 justify-start py-2 flex-wrap">
        <Skeleton width="6rem" height="2rem"></Skeleton>
        <Skeleton width="6rem" height="2rem"></Skeleton>
      </div>
    </div>
  </div>
</template>
