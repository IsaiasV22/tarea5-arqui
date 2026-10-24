<!-- app/pages/blog/[...slug].vue -->
<script setup>
import { joinURL, withoutTrailingSlash } from 'ufo'

const route = useRoute()
const baseURL = useRuntimeConfig().app.baseURL

// GitHub Pages redirige /blog/x a /blog/x/; se normaliza para que la consulta
// y el hilo de comentarios sean los mismos con o sin barra final.
const articlePath = withoutTrailingSlash(route.path)

const { data: post } = await useAsyncData(articlePath, () => {
  return queryCollection('blog').path(articlePath).first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description
})

const formattedDate = new Date(post.value.date).toLocaleDateString('es-CR', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
})
</script>

<template>
  <article class="post">
    <header>
      <h1>{{ post.title }}</h1>
      <p class="post-meta">
        Por <strong>{{ post.author }}</strong> · <time :datetime="post.date">{{ formattedDate }}</time>
      </p>
      <ul class="tags">
        <li v-for="tag in post.tags" :key="tag">#{{ tag }}</li>
      </ul>
    </header>

    <figure class="post-image">
      <img :src="joinURL(baseURL, post.image)" :alt="post.title">
      <figcaption>{{ post.imageCredit }}</figcaption>
    </figure>

    <ContentRenderer :value="post" class="post-body" />

    <p><NuxtLink to="/blog">← Volver al blog</NuxtLink></p>

    <section class="comments-section">
      <h2>Comentarios</h2>
      <CommentsUtterances repo="IsaiasV22/tarea5-arqui-comentarios" :issue-term="articlePath" />
    </section>
  </article>
</template>
