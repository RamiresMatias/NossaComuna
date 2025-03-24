<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-[1380px]">
        <div class="flex items-center">
          <NuxtLink to="/" :prefetch="false">
            <Logo size="default" />
          </NuxtLink>
        </div>
        <div class="flex items-center gap-2">
          <Skeleton width="6rem" height="2rem" class="px-4 py-3"></Skeleton>
          <Skeleton width="40px" height="40px" shape="circle"></Skeleton>
        </div>
      </div>
    </nav>
  </header>
</template>