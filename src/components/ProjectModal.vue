<template>
  <transition name="modal-fade">
    <div class="modal-overlay" v-if="isOpen" @click.self="close">
      <div class="modal-container">
        <button class="modal-close" @click="close">
          <i class="fas fa-times"></i>
        </button>

        <div class="modal-content">
          <div class="modal-image">
            <img :src="project.image" :alt="project.title" />
          </div>

          <div class="modal-details">
            <h2>{{ project.title }}</h2>
            <div class="project-meta">
              <span
                ><i class="fas fa-map-marker-alt"></i>
                {{ project.location }}</span
              >
              <span
                ><i class="fas fa-calendar-alt"></i> {{ project.year }}</span
              >
              <span><i class="fas fa-expand"></i> {{ project.area }}</span>
            </div>

            <p class="project-description">{{ project.description }}</p>

            <div class="project-features" v-if="project.features">
              <h3>Destaques:</h3>
              <ul>
                <li v-for="(feature, index) in project.features" :key="index">
                  {{ feature }}
                </li>
              </ul>
            </div>

            <button class="modal-cta" @click="close">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ProjectModal",
  props: {
    isOpen: Boolean,
    project: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background: white;
  border-radius: 10px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;

  &:hover {
    color: #333;
    transform: rotate(90deg);
  }
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 40px;
}

.modal-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-details h2 {
  color: #1a3a6e;
  margin-bottom: 20px;
  font-size: 2rem;
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  color: #666;
  font-size: 0.9rem;

  i {
    color: #e9b949;
    margin-right: 5px;
  }
}

.project-description {
  line-height: 1.6;
  margin-bottom: 20px;
  color: #444;
}

.project-features {
  margin-bottom: 30px;

  h3 {
    margin-bottom: 10px;
    color: #1a3a6e;
  }

  ul {
    list-style: none;
    padding-left: 0;

    li {
      position: relative;
      padding-left: 25px;
      margin-bottom: 8px;

      &::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #e9b949;
        font-weight: bold;
      }
    }
  }
}

.modal-cta {
  background: #1a3a6e;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: darken(#1a3a6e, 10%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

/* Animações */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Responsivo */
@media (max-width: 768px) {
  .modal-content {
    grid-template-columns: 1fr;
    padding: 30px 20px;
  }

  .modal-image {
    margin-bottom: 20px;
  }
}
</style>
