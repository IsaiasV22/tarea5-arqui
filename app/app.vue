<template>
  <div>
    <NuxtRouteAnnouncer />
    <header class="site-header">
      <NuxtLink to="/" class="site-title">Historia de los Mundiales</NuxtLink>
      <nav>
        <NuxtLink to="/blog">Blog</NuxtLink>
      </nav>
    </header>
    <main class="site-main">
      <NuxtPage />
    </main>
    <footer class="site-footer">
      Tarea 5 · EIF-511 Arquitectura de Información · UNA
    </footer>
  </div>
</template>
