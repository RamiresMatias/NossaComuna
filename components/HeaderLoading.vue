<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-[1380px]">
        <div class="flex items-center">
          <NuxtLink to="/posts">
            <Logo size="default" />
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <Skeleton width="6rem" height="2rem"></Skeleton>
          <Skeleton width="2rem" height="2rem" shape="circle"></Skeleton>
        </div>
      </div>
    </nav>
  </header>
</template>