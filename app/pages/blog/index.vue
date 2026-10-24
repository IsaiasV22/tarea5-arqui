<!-- app/pages/blog/index.vue -->
<script setup>
import { joinURL } from 'ufo'

const baseURL = useRuntimeConfig().app.baseURL

const { data: posts } = await useAsyncData('blog-list', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'author', 'date', 'image')
    .all()
})

useSeoMeta({ title: 'Blog · Historia de los Mundiales' })

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-CR', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  })
}
</script>

<template>
  <div>
    <h1>Blog</h1>
    <ul class="post-list">
      <li v-for="post in posts" :key="post.path" class="post-card">
        <NuxtLink :to="post.path">
          <img :src="joinURL(baseURL, post.image)" :alt="post.title" loading="lazy">
          <div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.description }}</p>
            <p class="post-meta">{{ post.author }} · {{ formatDate(post.date) }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
