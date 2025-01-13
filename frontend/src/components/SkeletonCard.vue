<template>
  <div class="skeleton-card">
    <div class="skeleton-image pulse"></div>
    <div class="skeleton-content">
      <div class="skeleton-title pulse"></div>
      <div class="skeleton-text pulse"></div>
      <div class="skeleton-text pulse"></div>
    </div>
  </div>
</template>
<style scoped>
.skeleton-card {
  background-color: #152433;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.skeleton-image {
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
}

.skeleton-content {
  padding: 1.5rem;
}

.skeleton-title {
  height: 24px;
  width: 70%;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 1rem;
  border-radius: 4px;
}

.skeleton-text {
  height: 16px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 0.5rem;
  border-radius: 4px;
  
  &:last-child {
    width: 80%;
  }
}

.pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
