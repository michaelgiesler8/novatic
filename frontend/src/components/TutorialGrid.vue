<template>
  <div class="tutorial-grid">
    <div class="search-section mb-4">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search tutorials..." 
        class="search-input"
      />
    </div>
    
    <div class="tutorial-grid">
      <div 
        v-for="tutorial in filteredTutorials" 
        :key="tutorial.id" 
        class="tutorial-card"
        @click="openTutorial(tutorial)"
      >
        <div class="card-content">
          <div class="category-tag">{{ tutorial.title }}</div>
          <h3>{{ tutorial.title }}</h3>
          <p>{{ tutorial.description }}</p>
          <div class="card-footer">
            <span class="duration">{{ tutorial.duration }} min</span>
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TutorialGrid',
  data() {
    return {
      tutorials: [],
      searchQuery: ''
    }
  },
  computed: {
    filteredTutorials() {
      return this.tutorials.filter(tutorial => 
        tutorial.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    openTutorial(tutorial) {
      window.open(tutorial.url, '_blank')
    }
  }
}
</script>

<style>
.tutorial-grid {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.15);
  outline: none;
  box-shadow: 0 0 0 2px rgba(205, 215, 47, 0.3);
}

.tutorial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
}

.tutorial-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tutorial-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.card-content {
  padding: 1.5rem;
}

.category-tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: #CDD72F;
  color: #1E1E1E;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

h3 {
  color: white;
  margin: 0 0 0.8rem 0;
  font-size: 1.2rem;
}

p {
  color: #DBDCDD;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #CDD72F;
  font-size: 0.9rem;
}
</style>
