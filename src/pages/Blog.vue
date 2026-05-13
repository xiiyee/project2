<template>
  <section
    id="blog"
    :class="[
      'snap-start min-h-screen py-20 px-4 sm:px-6 overflow-y-auto transition-colors duration-500',
      isDark ? 'bg-[#1e1e2e]' : 'bg-[#eff1f5]'
    ]"
  >
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          <span :class="isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]'">Blog</span>
          <span :class="isDark ? 'text-[#cdd6f4]' : 'text-[#4c4f69]'"> & </span>
          <span :class="isDark ? 'text-[#a6e3a1]' : 'text-[#40a02b]'">Articles</span>
        </h2>
        <p :class="['text-lg max-w-xl mx-auto', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">
          Thoughts, tutorials, and insights on software development, design, and technology.
        </p>
      </div>

      <div class="space-y-6">
        <article
          v-for="(article, index) in articles"
          :key="index"
          :class="[
            'group rounded-xl border p-6 sm:p-8 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg cursor-pointer',
            isDark
              ? 'bg-[#181825] border-[#313244] hover:border-[#cba6f7] hover:shadow-[#cba6f7]/10'
              : 'bg-[#e6e9ef] border-[#ccd0da] hover:border-[#8839ef] hover:shadow-[#8839ef]/10'
          ]"
        >
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span
              :class="[
                'text-sm font-medium px-3 py-1 rounded-full',
                isDark ? 'bg-[#cba6f7]/20 text-[#cba6f7]' : 'bg-[#8839ef]/20 text-[#8839ef]'
              ]"
            >
              {{ article.date }}
            </span>
            <span
              :class="[
                'text-sm flex items-center gap-1',
                isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]'
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ article.readingTime }}
            </span>
          </div>

          <h3
            :class="[
              'text-xl sm:text-2xl font-bold mb-3 transition-colors duration-300',
              isDark ? 'text-[#cdd6f4] group-hover:text-[#cba6f7]' : 'text-[#4c4f69] group-hover:text-[#8839ef]'
            ]"
          >
            {{ article.title }}
          </h3>

          <p
            :class="[
              'mb-4 leading-relaxed',
              isDark ? 'text-[#bac2de]' : 'text-[#5c5f77]'
            ]"
          >
            {{ article.summary }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag, tagIndex) in article.tags"
              :key="tagIndex"
              :class="[
                'text-xs font-medium px-2.5 py-1 rounded-full border transition-colors duration-300',
                isDark
                  ? 'border-[#313244] text-[#89dceb] bg-[#89dceb]/10'
                  : 'border-[#ccd0da] text-[#04a5e5] bg-[#04a5e5]/10'
              ]"
            >
              {{ tag }}
            </span>
          </div>

          <div class="mt-5 flex items-center gap-2">
            <span
              :class="[
                'text-sm font-medium transition-colors duration-300',
                isDark ? 'text-[#a6e3a1] group-hover:text-[#94e2d5]' : 'text-[#40a02b] group-hover:text-[#179299]'
              ]"
            >
              Read article
            </span>
            <svg
              :class="[
                'w-4 h-4 transition-all duration-300 group-hover:translate-x-1',
                isDark ? 'text-[#a6e3a1]' : 'text-[#40a02b]'
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </article>
      </div>

      <div class="text-center mt-12">
        <p
          :class="[
            'text-sm',
            isDark ? 'text-[#6c7086]' : 'text-[#9ca0b0]'
          ]"
        >
          More articles coming soon...
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Article {
  title: string;
  date: string;
  summary: string;
  readingTime: string;
  tags: string[];
}

defineProps<{
  isDark: boolean;
}>();

const articles = ref<Article[]>([
  {
    title: 'Building Scalable Web Applications with Vue 3 Composition API',
    date: '2026-05-01',
    summary: 'Explore how the Composition API transforms the way we structure Vue applications. Learn about composables, reactive state management, and patterns for building maintainable large-scale projects.',
    readingTime: '8 min read',
    tags: ['Vue.js', 'Composition API', 'Architecture'],
  },
  {
    title: 'The Art of Clean Code: Best Practices for Modern Development',
    date: '2026-04-15',
    summary: 'Clean code is not just about aesthetics — it is about maintainability, collaboration, and long-term productivity. Discover practical techniques to write code that your future self will thank you for.',
    readingTime: '6 min read',
    tags: ['Clean Code', 'Best Practices', 'TypeScript'],
  },
  {
    title: 'Mastering TypeScript: From Basics to Advanced Patterns',
    date: '2026-03-28',
    summary: 'TypeScript has become an essential tool in modern web development. This article covers generics, conditional types, template literal types, and other advanced patterns that elevate your type safety.',
    readingTime: '12 min read',
    tags: ['TypeScript', 'JavaScript', 'Type System'],
  },
  {
    title: 'Designing with Catppuccin: A Developer\'s Guide to Beautiful Themes',
    date: '2026-03-10',
    summary: 'Catppuccin is more than just a color palette — it is a design system crafted for developers who care about aesthetics. Learn how to integrate this soothing theme into your projects and tools.',
    readingTime: '5 min read',
    tags: ['Design', 'Catppuccin', 'UI/UX'],
  },
  {
    title: 'Performance Optimization Techniques for Vue Applications',
    date: '2026-02-20',
    summary: 'Slow applications frustrate users. Dive into practical performance optimization strategies including lazy loading, virtual scrolling, memoization, and bundle analysis for Vue applications.',
    readingTime: '10 min read',
    tags: ['Vue.js', 'Performance', 'Optimization'],
  },
]);
</script>