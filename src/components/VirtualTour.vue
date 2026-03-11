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
              :style="{ animationDelay: index * 0.15 + 's' }"
            >
              <div class="feature-icon-wrapper">
                <div class="feature-icon">
                  <i :class="feature.icon"></i>
                </div>
                <div class="icon-ring"></div>
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

        <!-- Visualizador 360° interativo -->
        <div class="tour-viewer" data-aos="fade-left">
          <div class="viewer-container">
            <!-- Viewer 360 com drag -->
            <div
              class="viewer-frame"
              :style="viewerTransformStyle"
              @mousedown="startDrag"
              @mousemove="onDrag"
              @mouseup="stopDrag"
              @mouseleave="stopDrag"
              @touchstart="startDragTouch"
              @touchmove="onDragTouch"
              @touchend="stopDrag"
            >
              <img
                :src="currentProject.image"
                :alt="'Tour Virtual 360° - ' + currentProject.name"
                class="viewer-image"
                draggable="false"
              />
              <div class="viewer-overlay"></div>

              <!-- Compass 360° indicator -->
              <div class="compass-indicator">
                <div class="compass-ring" :style="{ transform: `rotate(${-dragAngleX}deg)` }">
                  <span class="compass-n">N</span>
                  <span class="compass-e">L</span>
                  <span class="compass-s">S</span>
                  <span class="compass-w">O</span>
                </div>
                <div class="compass-needle"></div>
              </div>

              <!-- Drag hint -->
              <div class="drag-hint" v-if="!hasDragged">
                <i class="fas fa-hand-pointer"></i>
                <span>Arraste para explorar em 360°</span>
              </div>

              <div class="play-button" @click.stop="openTour" v-if="!isDragging">
                <div class="play-icon">
                  <i class="fas fa-street-view"></i>
                </div>
                <div class="pulse-effect"></div>
                <span>Tour Completo</span>
              </div>

              <!-- Hotspots interativos -->
              <div
                v-for="(hotspot, i) in currentProject.hotspots"
                :key="i"
                class="hotspot"
                :style="{ top: hotspot.y + '%', left: hotspot.x + '%' }"
                @click.stop="activeHotspot = activeHotspot === i ? null : i"
              >
                <div class="hotspot-dot">
                  <i :class="hotspot.icon"></i>
                </div>
                <div class="hotspot-pulse"></div>
                <transition name="tooltip">
                  <div class="hotspot-tooltip" v-if="activeHotspot === i">
                    <strong>{{ hotspot.title }}</strong>
                    <p>{{ hotspot.description }}</p>
                  </div>
                </transition>
              </div>
            </div>

            <div class="viewer-controls">
              <button class="control-btn" @click="prevProject">
                <i class="fas fa-chevron-left"></i>
              </button>
              <div class="project-info">
                <span class="project-counter">{{ currentProjectIndex + 1 }} / {{ projects.length }}</span>
                <h4>{{ currentProject.name }}</h4>
                <p>{{ currentProject.location }}</p>
              </div>
              <button class="control-btn" @click="nextProject">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>

            <!-- Thumbnails dos projetos -->
            <div class="project-thumbnails">
              <button
                v-for="(project, idx) in projects"
                :key="idx"
                class="thumb-btn"
                :class="{ active: currentProjectIndex === idx }"
                @click="currentProjectIndex = idx"
              >
                <img :src="project.image" :alt="project.name" />
                <span>{{ project.name }}</span>
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
      isDragging: false,
      hasDragged: false,
      dragStartX: 0,
      dragStartY: 0,
      dragAngleX: 0,
      dragAngleY: 0,
      lastDragX: 0,
      lastDragY: 0,
      activeHotspot: null,
      projects: [
        {
          name: "Residencial Skyline",
          location: "São Paulo, SP",
          image:
            "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          hotspots: [
            { x: 25, y: 40, icon: "fas fa-couch", title: "Sala de Estar", description: "Ampla sala com 45m² e pé-direito duplo" },
            { x: 65, y: 30, icon: "fas fa-utensils", title: "Cozinha Gourmet", description: "Integrada com ilha central em granito" },
            { x: 80, y: 60, icon: "fas fa-bed", title: "Suíte Master", description: "Com closet e banheira de hidromassagem" },
          ],
        },
        {
          name: "Business Tower",
          location: "Rio de Janeiro, RJ",
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          hotspots: [
            { x: 30, y: 35, icon: "fas fa-desktop", title: "Escritório Open Space", description: "Layout flexível para 50+ posições" },
            { x: 70, y: 50, icon: "fas fa-users", title: "Sala de Reuniões", description: "Equipada com videoconferência 4K" },
          ],
        },
        {
          name: "Villas da Montanha",
          location: "Campos do Jordão, SP",
          image:
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          hotspots: [
            { x: 20, y: 45, icon: "fas fa-fire", title: "Lareira Central", description: "Lareira a lenha com revestimento em pedra" },
            { x: 55, y: 35, icon: "fas fa-mountain", title: "Varanda Panorâmica", description: "Vista 180° para Serra da Mantiqueira" },
            { x: 80, y: 55, icon: "fas fa-hot-tub", title: "Spa Privativo", description: "Ofurô e sauna com vista para o vale" },
          ],
        },
      ],
      features: [
        {
          icon: "fas fa-expand-arrows-alt",
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
          icon: "fas fa-map-marker-alt",
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
    viewerTransformStyle() {
      return {
        transform: `perspective(800px) rotateY(${this.dragAngleX * 0.3}deg) rotateX(${-this.dragAngleY * 0.15}deg)`,
        cursor: this.isDragging ? 'grabbing' : 'grab',
      };
    },
  },
  methods: {
    nextProject() {
      this.currentProjectIndex =
        (this.currentProjectIndex + 1) % this.projects.length;
      this.activeHotspot = null;
      this.resetDrag();
    },
    prevProject() {
      this.currentProjectIndex =
        (this.currentProjectIndex - 1 + this.projects.length) %
        this.projects.length;
      this.activeHotspot = null;
      this.resetDrag();
    },
    startDrag(e) {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      this.lastDragX = this.dragAngleX;
      this.lastDragY = this.dragAngleY;
    },
    startDragTouch(e) {
      this.isDragging = true;
      this.dragStartX = e.touches[0].clientX;
      this.dragStartY = e.touches[0].clientY;
      this.lastDragX = this.dragAngleX;
      this.lastDragY = this.dragAngleY;
    },
    onDrag(e) {
      if (!this.isDragging) return;
      this.hasDragged = true;
      const dx = e.clientX - this.dragStartX;
      const dy = e.clientY - this.dragStartY;
      this.dragAngleX = this.lastDragX + dx * 0.5;
      this.dragAngleY = Math.max(-30, Math.min(30, this.lastDragY + dy * 0.3));
    },
    onDragTouch(e) {
      if (!this.isDragging) return;
      this.hasDragged = true;
      const dx = e.touches[0].clientX - this.dragStartX;
      const dy = e.touches[0].clientY - this.dragStartY;
      this.dragAngleX = this.lastDragX + dx * 0.5;
      this.dragAngleY = Math.max(-30, Math.min(30, this.lastDragY + dy * 0.3));
    },
    stopDrag() {
      this.isDragging = false;
    },
    resetDrag() {
      this.dragAngleX = 0;
      this.dragAngleY = 0;
      this.lastDragX = 0;
      this.lastDragY = 0;
    },
    openTour() {
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
  padding: $spacing-unit * 2.5;
  border-radius: $spacing-unit * 1.5;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: rgba($primary-color, 0.03);
  border: 1px solid transparent;
  animation: featureSlideIn 0.6s ease-out both;

  &:hover {
    transform: translateY(-5px);
    background: rgba($primary-color, 0.08);
    border-color: rgba($primary-color, 0.15);
    box-shadow: 0 10px 30px rgba($primary-color, 0.1);

    .feature-icon-wrapper {
      .feature-icon {
        background: $primary-color;
        color: white;
        transform: scale(1.1);
      }
      .icon-ring {
        transform: scale(1.3);
        opacity: 1;
      }
    }
  }
}

@keyframes featureSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.feature-icon-wrapper {
  position: relative;
  flex-shrink: 0;
}

.feature-icon {
  width: $spacing-unit * 6;
  height: $spacing-unit * 6;
  background: rgba($primary-color, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $spacing-unit * 2.5;
  color: $primary-color;
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
}

.icon-ring {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px dashed rgba($primary-color, 0.3);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.4s ease;
  animation: spinRing 8s linear infinite;
}

@keyframes spinRing {
  from { transform: scale(1.1) rotate(0deg); }
  to { transform: scale(1.1) rotate(360deg); }
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
  transition: transform 0.15s ease-out;
  user-select: none;
  overflow: hidden;
  border-radius: $spacing-unit $spacing-unit 0 0;
}

.viewer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
  pointer-events: none;
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

/* Compass indicator */
.compass-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.compass-ring {
  position: relative;
  width: 46px;
  height: 46px;
  transition: transform 0.15s ease-out;

  span {
    position: absolute;
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px;
    font-weight: 700;
  }

  .compass-n { top: 0; left: 50%; transform: translateX(-50%); color: $secondary-color; }
  .compass-s { bottom: 0; left: 50%; transform: translateX(-50%); }
  .compass-e { right: 2px; top: 50%; transform: translateY(-50%); }
  .compass-w { left: 2px; top: 50%; transform: translateY(-50%); }
}

.compass-needle {
  position: absolute;
  width: 2px;
  height: 16px;
  background: $secondary-color;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  border-radius: 1px;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 16px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 1px;
  }
}

/* Drag hint */
.drag-hint {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  z-index: 5;
  animation: dragHintPulse 2s ease-in-out infinite;
  pointer-events: none;

  i {
    font-size: 1.2rem;
    animation: dragHintSwing 2s ease-in-out infinite;
  }
}

@keyframes dragHintPulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.5; }
}

@keyframes dragHintSwing {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-15deg); }
  75% { transform: rotate(15deg); }
}

/* Hotspots */
.hotspot {
  position: absolute;
  z-index: 5;
  cursor: pointer;
}

.hotspot-dot {
  width: 40px;
  height: 40px;
  background: rgba($primary-color, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.2);
    background: $primary-color;
  }
}

.hotspot-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  border: 2px solid rgba($primary-color, 0.6);
  border-radius: 50%;
  animation: hotspotPulse 2s infinite;
  pointer-events: none;
}

@keyframes hotspotPulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
}

.hotspot-tooltip {
  position: absolute;
  bottom: 52px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: $dark-color;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  text-align: center;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: white;
  }

  strong {
    display: block;
    font-size: 0.95rem;
    color: $primary-color;
    margin-bottom: 4px;
  }

  p {
    font-size: 0.8rem;
    color: $gray-color;
    margin: 0;
    line-height: 1.4;
  }
}

.tooltip-enter-active, .tooltip-leave-active {
  transition: all 0.25s ease;
}
.tooltip-enter-from, .tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}

/* Project thumbnails */
.project-thumbnails {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: rgba($dark-color, 0.9);
  border-radius: 0 0 $spacing-unit $spacing-unit;
}

.thumb-btn {
  flex: 1;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: all 0.3s ease;
  background: none;

  img {
    width: 100%;
    height: 50px;
    object-fit: cover;
    display: block;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  span {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 0.65rem;
    padding: 3px;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.active {
    border-color: $secondary-color;

    img { opacity: 1; }
    span { opacity: 1; }
  }

  &:hover:not(.active) {
    border-color: rgba(white, 0.3);
    img { opacity: 0.8; }
    span { opacity: 1; }
  }
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
    backdrop-filter: blur(5px);

    i {
      color: $primary-color;
      font-size: $spacing-unit * 3;
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

  .project-counter {
    display: inline-block;
    font-size: 0.7rem;
    color: $secondary-color;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 2px;
  }

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
