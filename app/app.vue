<template>
  <UApp>
    <div class="flex min-h-screen flex-col">
      <header class="border-b border-default bg-default">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 class="text-lg font-semibold text-highlighted">
            Mock Data Generator
          </h1>
          <ColorModeToggle />
        </div>
      </header>

      <main class="flex flex-1">
        <NuxtRouteAnnouncer />
        <NuxtPage />
      </main>
    </div>
  </UApp>
</template>