<template>
  <section id="blog" class="snap-start min-h-screen py-20 px-4 sm:px-6 overflow-y-auto">
    <div class="max-w-5xl mx-auto">
      <div
        :class="[
          'rounded-[2rem] border p-8 sm:p-10 mb-10 transition-colors duration-500',
          isDark ? 'bg-[#181825] border-[#313244]' : 'bg-[#e6e9ef] border-[#ccd0da]'
        ]"
      >
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl">
            <span
              :class="[
                'inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold mb-4',
                isDark ? 'bg-[#cba6f7]/15 text-[#cba6f7]' : 'bg-[#8839ef]/10 text-[#8839ef]'
              ]"
            >
              Latest Writing
            </span>
            <h2 class="text-3xl sm:text-4xl font-bold mb-4">
              <span :class="isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]'">Blog</span>
              <span :class="isDark ? 'text-[#cdd6f4]' : 'text-[#4c4f69]'"> & Notes</span>
            </h2>
            <p :class="['text-base sm:text-lg leading-relaxed', isDark ? 'text-[#bac2de]' : 'text-[#5c5f77]']">
              Thoughts on frontend craft, interface systems, and the workflow patterns I use to ship polished products.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-full lg:min-w-[420px]">
            <div
              v-for="stat in stats"
              :key="stat.label"
              :class="[
                'rounded-2xl border px-5 py-4 transition-colors duration-500',
                isDark ? 'bg-[#1e1e2e] border-[#313244]' : 'bg-[#eff1f5] border-[#ccd0da]'
              ]"
            >
              <p :class="['text-xs uppercase tracking-[0.2em] mb-2', isDark ? 'text-[#6c7086]' : 'text-[#9ca0b0]']">
                {{ stat.label }}
              </p>
              <p :class="['text-xl font-bold', isDark ? 'text-[#cdd6f4]' : 'text-[#4c4f69]']">
                {{ stat.value }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <article
          v-for="post in posts"
          :key="post.title"
          :class="[
            'rounded-3xl border p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
            isDark
              ? 'bg-[#181825] border-[#313244] hover:border-[#89dceb] hover:shadow-[#89dceb]/10'
              : 'bg-[#e6e9ef] border-[#ccd0da] hover:border-[#04a5e5] hover:shadow-[#04a5e5]/10'
          ]"
        >
          <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-3 mb-4 text-sm">
                <span :class="isDark ? 'text-[#89dceb]' : 'text-[#04a5e5]'">{{ post.date }}</span>
                <span :class="isDark ? 'text-[#6c7086]' : 'text-[#9ca0b0]'">•</span>
                <span :class="isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]'">{{ post.readingTime }}</span>
              </div>

              <h3 :class="['text-2xl font-bold mb-3', isDark ? 'text-[#cdd6f4]' : 'text-[#4c4f69]']">
                {{ post.title }}
              </h3>
              <p :class="['text-base leading-7 mb-5', isDark ? 'text-[#bac2de]' : 'text-[#5c5f77]']">
                {{ post.excerpt }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2 lg:max-w-[220px] lg:justify-end">
              <span
                v-for="tag in post.tags"
                :key="tag"
                :class="[
                  'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
                  isDark ? 'bg-[#313244] text-[#f5c2e7]' : 'bg-[#ccd0da] text-[#ea76cb]'
                ]"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  tags: string[];
}

const props = defineProps<{
  isDark: boolean;
}>();

const posts = ref<BlogPost[]>([
  {
    title: 'Designing a Catppuccin-First Dashboard Experience',
    date: '2026-04-18',
    excerpt: 'How I turn a color palette into a consistent product language by combining semantic surfaces, accent roles, and motion restraint across dashboards.',
    readingTime: '6 min read',
    tags: ['design-system', 'tailwind', 'catppuccin']
  },
  {
    title: 'Composable Vue Patterns for Content-Heavy Interfaces',
    date: '2026-03-09',
    excerpt: 'A practical approach to splitting complex page sections into smaller Vue building blocks without losing readability, reuse, or visual coherence.',
    readingTime: '8 min read',
    tags: ['vue', 'architecture', 'ui']
  },
  {
    title: 'Shipping Better UI States With Small Interaction Details',
    date: '2026-01-27',
    excerpt: 'Empty states, hover cues, and metadata hierarchy often make the difference between a functional interface and one that feels carefully crafted.',
    readingTime: '5 min read',
    tags: ['ux', 'frontend', 'product']
  }
]);

const stats = computed(() => [
  { label: 'Posts', value: posts.value.length.toString().padStart(2, '0') },
  { label: 'Topics', value: 'Vue · UI · DX' },
  { label: 'Theme', value: props.isDark ? 'Mocha' : 'Latte' }
]);
</script>
