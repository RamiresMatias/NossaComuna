<template>
  <div class="grid grid-cols-12 w-full max-w-[1380px] px-4 lg:px-0 gap-y-6">
    <div class="col-span-full lg:col-start-3 lg:col-end-4 hidden lg:flex flex-col items-center m-0 p-0 gap-4">
      <Skeleton animation="wave" shape="circle" size="2rem"></Skeleton>
      <Skeleton animation="wave" shape="circle" size="2rem"></Skeleton>
    </div>
    <article class="w-full h-full bg-white rounded-md flex flex-col col-span-full lg:col-start-4 lg:col-end-10 shadow-sm">
      <Skeleton animation="wave" width="100%" height="44rem" class="mb-8"></Skeleton>
      <section class="w-full h-full flex flex-col max-w-[90%] mx-auto">
        <div class="flex w-full gap-2 flex-col min-[300px]:flex-row">
          <Skeleton animation="wave" shape="circle" size="4rem" class="mb-8"></Skeleton>
          <div class="w-full h-full flex flex-col flex-1 gap-1">
            <Skeleton animation="wave" width="8rem" height="1rem"></Skeleton>
            <Skeleton animation="wave" width="4rem" height="1rem"></Skeleton>
          </div>
        </div>
        <div class="w-full flex gap-4">
          <Skeleton animation="wave" width="3rem" height="2rem"></Skeleton>
          <Skeleton animation="wave" width="3rem" height="2rem"></Skeleton>
        </div>
        <div class="w-full flex gap-4 mb-10 mt-4">
          <Skeleton animation="wave" width="4rem" height="2rem"></Skeleton>
          <Skeleton animation="wave" width="4rem" height="2rem"></Skeleton>
        </div>
        <Skeleton animation="wave" width="100%" height="4rem" class="mb-4"></Skeleton>
        <Skeleton animation="wave" width="100%" height="24rem"></Skeleton>
      </section>
      <div class="w-full h-[2px] bg-gray-200 mt-6"></div>
    </article>
  </div>
</template>