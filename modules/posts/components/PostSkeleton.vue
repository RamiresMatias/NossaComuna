<template>
  <div 
    class="p-4 bg-white flex gap-2 border-b border-solid border-b-gray-200 last:border-b-0 rounded-md shadow-sm"
  >
    <div>
      <Skeleton shape="circle" size="2.5rem"></Skeleton>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex justify-between items-center gap-4">
        <div class="h-full flex flex-col flex-1 gap-2">
          <Skeleton width="8rem" height="1rem"></Skeleton>
          <Skeleton width="4rem" height="1rem"></Skeleton>
        </div>
      </div>
      <div class="text-balance font-bold  text-xl lg:text-xl mb-2">
        <Skeleton width="32rem" height="1.8rem"></Skeleton>
      </div>
      <div class="flex gap-2">
        <Skeleton width="5rem" height="1rem"></Skeleton>
        <Skeleton width="5rem" height="1rem"></Skeleton>
        <Skeleton width="5rem" height="1rem"></Skeleton>
      </div>
      <div class="flex gap-2">
        <Skeleton width="7rem" height="1rem"></Skeleton>
        <Skeleton width="7rem" height="1rem"></Skeleton>
      </div>
    </div>
  </div>
</template>
