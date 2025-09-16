<template>
  <section id="virtual-tour" class="virtual-tour-section">
    <!-- Efeito de partículas de fundo -->
    <div class="particles-bg"></div>

    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Tour Virtual <span>360°</span></h2>
        <p class="section-subtitle">
          Explore nossos empreendimentos como se estivesse lá, com nossa
          tecnologia imersiva
        </p>
        <div class="section-decoration">
          <div class="decoration-line"></div>
          <div class="decoration-dot"></div>
          <div class="decoration-line"></div>
        </div>
      </div>

      <div class="tour-grid">
        <!-- Conteúdo de texto -->
        <div class="tour-content" data-aos="fade-right">
          <h3>Experiência <span>Imersiva</span></h3>
          <p>
            Nossa tecnologia de tour virtual permite que você explore cada
            detalhe dos nossos empreendimentos com uma experiência 360°
            interativa, sem sair de casa.
          </p>

          <div class="features-grid">
            <div
              class="feature-card"
              v-for="(feature, index) in features"
              :key="index"
            >
              <div class="feature-icon">
                <i :class="feature.icon"></i>
              </div>
              <div class="feature-text">
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>

          <div class="cta-buttons">
            <button class="cta-button primary" @click="openTour">
              <i class="fas fa-vr-cardboard"></i> Experimente Agora
            </button>
            <button class="cta-button secondary" @click="openVideoModal">
              <i class="fas fa-play-circle"></i> Ver Demonstração
            </button>
          </div>
        </div>

        <!-- Visualizador 3D -->
        <div class="tour-viewer" data-aos="fade-left">
          <div
            class="viewer-container"
            @mousemove="handleParallax"
            @mouseleave="resetParallax"
          >
            <div class="viewer-frame" :style="parallaxStyle">
              <img
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Tour Virtual 360°"
                class="viewer-image"
              />
              <div class="viewer-overlay"></div>
              <div class="play-button" @click="openTour">
                <div class="play-icon">
                  <i class="fas fa-play"></i>
                </div>
                <div class="pulse-effect"></div>
                <span>Iniciar Tour</span>
              </div>
            </div>

            <div class="viewer-controls">
              <button class="control-btn" @click="prevProject">
                <i class="fas fa-chevron-left"></i>
              </button>
              <div class="project-info">
                <h4>{{ currentProject.name }}</h4>
                <p>{{ currentProject.location }}</p>
              </div>
              <button class="control-btn" @click="nextProject">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de demonstração -->
    <transition name="modal-fade">
      <div v-if="showVideoModal" class="video-modal">
        <div class="modal-overlay" @click="closeVideoModal"></div>
        <div class="modal-container">
          <button class="modal-close" @click="closeVideoModal">
            <i class="fas fa-times"></i>
          </button>
          <div class="video-wrapper">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Demonstração Tour Virtual"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "PremiumVirtualTour",
  data() {
    return {
      currentProjectIndex: 0,
      showVideoModal: false,
      parallaxX: 0,
      parallaxY: 0,
      projects: [
        {
          name: "Residencial Skyline",
          location: "São Paulo, SP",
          image:
            "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
          name: "Business Tower",
          location: "Rio de Janeiro, RJ",
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
          name: "Villas da Montanha",
          location: "Campos do Jordão, SP",
          image:
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
      ],
      features: [
        {
          icon: "fas fa-expand",
          title: "Visualização 360°",
          description: "Explore todos os ângulos com navegação fluida",
        },
        {
          icon: "fas fa-vr-cardboard",
          title: "Realidade Virtual",
          description: "Compatível com headsets VR para imersão total",
        },
        {
          icon: "fas fa-mobile-alt",
          title: "Multiplataforma",
          description: "Acessível em qualquer dispositivo",
        },
        {
          icon: "fas fa-highlighter",
          title: "Marcadores Interativos",
          description: "Obtenha informações sobre cada área",
        },
      ],
    };
  },
  computed: {
    currentProject() {
      return this.projects[this.currentProjectIndex];
    },
    parallaxStyle() {
      return {
        transform: `translate(${this.parallaxX * 15}px, ${
          this.parallaxY * 15
        }px)`,
      };
    },
  },
  methods: {
    nextProject() {
      this.currentProjectIndex =
        (this.currentProjectIndex + 1) % this.projects.length;
    },
    prevProject() {
      this.currentProjectIndex =
        (this.currentProjectIndex - 1 + this.projects.length) %
        this.projects.length;
    },
    openTour() {
      // Implementar abertura do tour virtual real
      alert(`Iniciando tour virtual do ${this.currentProject.name}`);
    },
    openVideoModal() {
      this.showVideoModal = true;
      document.body.style.overflow = "hidden";
    },
    closeVideoModal() {
      this.showVideoModal = false;
      document.body.style.overflow = "auto";
    },
    handleParallax(e) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      this.parallaxX = (x - centerX) / centerX;
      this.parallaxY = (y - centerY) / centerY;
    },
    resetParallax() {
      this.parallaxX = 0;
      this.parallaxY = 0;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.virtual-tour-section {
  position: relative;
  padding: 120px 0;
  background-color: $light-color;
  overflow: hidden;
}

.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1350&q=80")
    no-repeat center center;
  background-size: cover;
  opacity: 0.05;
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
  max-width: $max-width;
  margin: 0 auto;
  padding: 0 $spacing-unit * 2;
}

.section-header {
  text-align: center;
  margin-bottom: $spacing-unit * 8;

  .section-title {
    font-size: 3rem;
    font-weight: 800;
    color: $dark-color;
    margin-bottom: $spacing-unit * 2;

    span {
      color: $primary-color;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 10px;
        background: rgba($secondary-color, 0.4);
        z-index: -1;
      }
    }
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: $gray-color;
    max-width: 700px;
    margin: 0 auto $spacing-unit * 4;
  }

  .section-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-unit * 2;

    .decoration-line {
      width: 80px;
      height: 2px;
      background: linear-gradient(
        to right,
        transparent,
        $primary-color,
        transparent
      );
    }

    .decoration-dot {
      width: $spacing-unit;
      height: $spacing-unit;
      background: $secondary-color;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
  }
}

.tour-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $spacing-unit * 5;
  align-items: center;
}

.tour-content {
  h3 {
    font-size: 2.2rem;
    color: $dark-color;
    margin-bottom: $spacing-unit * 3;
    line-height: 1.3;

    span {
      color: $primary-color;
    }
  }

  p {
    color: $gray-color;
    margin-bottom: $spacing-unit * 4;
    line-height: 1.8;
    font-size: 1.1rem;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-unit * 3;
  margin-bottom: $spacing-unit * 5;
}

.feature-card {
  display: flex;
  gap: $spacing-unit * 2;
  padding: $spacing-unit * 2;
  border-radius: $spacing-unit;
  transition: all 0.3s ease;
  background: rgba($primary-color, 0.03);

  &:hover {
    transform: translateY(-5px);
    background: rgba($primary-color, 0.1);

    .feature-icon {
      background: $primary-color;
      color: white;
    }
  }
}

.feature-icon {
  width: $spacing-unit * 6;
  height: $spacing-unit * 6;
  background: rgba($primary-color, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $spacing-unit * 2;
  color: $primary-color;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.feature-text {
  h4 {
    font-size: 1.1rem;
    color: $dark-color;
    margin-bottom: $spacing-unit;
  }

  p {
    font-size: 0.9rem;
    color: $gray-color;
    margin: 0;
    line-height: 1.6;
  }
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-unit * 2;
  margin-top: $spacing-unit * 4;
}

.cta-button {
  padding: $spacing-unit * 2 $spacing-unit * 3;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: $spacing-unit;
  transition: all 0.3s ease;
  cursor: pointer;

  i {
    font-size: 1.2rem;
  }

  &.primary {
    background: $primary-color;
    color: white;
    border: none;

    &:hover {
      background: darken($primary-color, 10%);
      transform: translateY(-3px);
      box-shadow: 0 $spacing-unit $spacing-unit * 2 rgba($primary-color, 0.3);
    }
  }

  &.secondary {
    background: transparent;
    color: $primary-color;
    border: 2px solid $primary-color;

    &:hover {
      background: rgba($primary-color, 0.1);
      transform: translateY(-3px);
    }
  }
}

.tour-viewer {
  position: relative;
  perspective: 1000px;
}

.viewer-container {
  position: relative;
  border-radius: $spacing-unit;
  overflow: hidden;
  box-shadow: 0 $spacing-unit * 3 $spacing-unit * 5 rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    .viewer-overlay {
      opacity: 0.3;
    }

    .play-button {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
}

.viewer-frame {
  position: relative;
  height: 500px;
  transition: transform 0.5s ease-out;
}

.viewer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.viewer-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba($dark-color, 0.7), transparent 70%);
  opacity: 0.2;
  transition: opacity 0.3s ease;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;

  .play-icon {
    width: $spacing-unit * 8;
    height: $spacing-unit * 8;
    background: rgba(white, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: $spacing-unit * 2;

    i {
      color: $primary-color;
      font-size: $spacing-unit * 3;
      margin-left: $spacing-unit;
    }
  }

  span {
    color: white;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .pulse-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(white, 0.4);
    border-radius: 50%;
    animation: pulse 2s infinite;
    z-index: -1;
  }
}

.viewer-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba($dark-color, 0.7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-unit * 2;
  z-index: 2;
}

.control-btn {
  width: $spacing-unit * 6;
  height: $spacing-unit * 6;
  background: rgba(white, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: $spacing-unit * 1.5;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: $primary-color;
    transform: scale(1.1);
  }
}

.project-info {
  text-align: center;
  color: white;

  h4 {
    font-size: 1.2rem;
    margin-bottom: $spacing-unit/2;
  }

  p {
    font-size: 0.9rem;
    color: rgba(white, 0.8);
    margin: 0;
  }
}

.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($dark-color, 0.8);
    backdrop-filter: blur(5px);
  }

  .modal-container {
    position: relative;
    width: 90%;
    max-width: 900px;
    background: white;
    border-radius: $spacing-unit;
    padding: $spacing-unit * 4;
    z-index: 2;
    animation: modalEnter 0.4s ease-out;
  }

  .modal-close {
    position: absolute;
    top: $spacing-unit * 2;
    right: $spacing-unit * 2;
    width: $spacing-unit * 4;
    height: $spacing-unit * 4;
    background: rgba($dark-color, 0.1);
    border: none;
    border-radius: 50%;
    color: $dark-color;
    font-size: $spacing-unit * 1.5;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: $primary-color;
      color: white;
    }
  }

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
    height: 0;
    overflow: hidden;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      border-radius: $spacing-unit/2;
    }
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.4;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: translateY($spacing-unit * 2);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: $breakpoint-md) {
  .virtual-tour-section {
    padding: $spacing-unit * 8 0;
  }

  .section-header {
    margin-bottom: $spacing-unit * 6;

    .section-title {
      font-size: 2.2rem;
    }
  }

  .tour-grid {
    grid-template-columns: 1fr;
    gap: $spacing-unit * 4;
  }

  .viewer-frame {
    height: 400px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    justify-content: center;
  }
}

@media (max-width: $breakpoint-sm) {
  .section-header {
    .section-title {
      font-size: 1.8rem;
    }

    .section-subtitle {
      font-size: 1rem;
    }
  }

  .viewer-frame {
    height: 300px;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
