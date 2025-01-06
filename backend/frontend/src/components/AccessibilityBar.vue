<template>
  <div class="accessibility-bar">
    <button class="a11y-btn" @click="increaseTextSize">
      <span>A+</span>
    </button>
    <button class="a11y-btn" @click="decreaseTextSize">
      <span>A-</span>
    </button>
    <button class="a11y-btn" @click="toggleTextToSpeech">
      <span>🔊</span>
    </button>
  </div>
</template>
