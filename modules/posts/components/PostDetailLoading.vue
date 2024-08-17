<template>
  <div class="grid grid-cols-12 w-full max-w-[1380px] px-4 lg:px-0 gap-y-6">
    <div class="col-span-1 hidden lg:flex flex-col items-center m-0 p-0 gap-4">
      <Skeleton animation="wave" shape="circle" size="2rem"></Skeleton>
      <Skeleton animation="wave" shape="circle" size="2rem"></Skeleton>
    </div>
    <article class="w-full h-full mx-auto bg-white rounded-md flex flex-col col-span-full lg:col-span-8 shadow-sm">
      <Skeleton animation="wave" width="100%" height="44rem"></Skeleton>
      <section class="w-full h-full flex flex-col max-w-[90%] mx-auto">
        <div class="flex w-full py-4 gap-2">
          <Skeleton animation="wave" shape="circle" size="4rem"></Skeleton>
          <div class="w-full h-full flex flex-col flex-1 gap-2">
            <Skeleton animation="wave" width="8rem" height="1rem"></Skeleton>
            <Skeleton animation="wave" width="4rem" height="1rem"></Skeleton>
          </div>
        </div>
        <div class="w-full flex gap-4 mb-10 mt-4">
          <Skeleton animation="wave" width="2rem" height="1rem"></Skeleton>
          <Skeleton animation="wave" width="2rem" height="1rem"></Skeleton>
        </div>
        <Skeleton animation="wave" width="100%" height="4rem" class="mb-4"></Skeleton>
        <Skeleton animation="wave" width="100%" height="12rem"></Skeleton>
      </section>
      <div class="w-full h-[2px] bg-gray-200 mt-6"></div>
      <!-- <section class="w-full h-full flex flex-col max-w-[90%] mx-auto py-6 gap-10">
        <h2 class="text-2xl font-semibold">Comentários ({{ comments.length }})</h2>
        <CommentLoading v-if="loadingComments" v-for="item in 4" :key="item" />
        <CreateComment 
          v-if="!loadingComments" 
          v-model="myComment" 
          :profile-pic="user?.avatarUrl" 
          :loading="loadingComments" 
          @submit-comment="() => createComment(myComment)" 
        />
        <Comment
          v-if="!loadingComments"
          v-for="comment in comments" 
          :key="comment.id"
          :description="comment.description"
          :profile="comment.profile"
          :created-at="comment.createdAt"
          :id="comment.id"
          :is-author="comment.profile.id === user.id"
          :comments="comment.comments"
          :liked="comment.liked"
          :likes="comment.likes"
          @delete="(id) => deleteComment(id)"
          @on-reply="({comment, commentId}) => onReply({comment, commentId})"
          @on-like="(commentId) => likeComment({comments, commentId})"
        ></Comment>
      </section> -->
    </article>
    <div class="col-span-full lg:col-span-3 lg:ml-4">
      <Skeleton animation="wave" width="100%" height="18rem"></Skeleton>
    </div>
  </div>
</template>