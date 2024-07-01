<template>
  <div 
    class="w-full p-4 bg-white flex gap-2 border-b border-solid justify-center border-b-gray-200 last:border-b-0 rounded-md shadow-sm"
  >
    <Skeleton shape="circle" size="2.5rem"></Skeleton>
    <div class="w-full h-full flex flex-col gap-3">
      <div class="flex w-full justify-between items-center gap-4">
        <div class="w-full h-full flex flex-col flex-1 gap-2">
          <Skeleton width="6rem" height="1rem"></Skeleton>
          <Skeleton width="6rem" height="1rem"></Skeleton>
        </div>
      </div>
      <div class="w-full text-balance font-bold  text-xl lg:text-xl mb-2">
        <Skeleton width="30rem" height="2rem"></Skeleton>
      </div>
      <div class="w-full flex gap-2">
        <Skeleton shape="circle" size="1rem"></Skeleton>
        <Skeleton shape="circle" size="1rem"></Skeleton>
      </div>
    </div>
  </div>
</template>
