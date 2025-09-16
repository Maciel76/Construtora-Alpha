<template>
  <section
    id="home"
    class="hero-banner"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
    aria-label="Banner com destaque de textos"
  >
    <!-- Overlay gradiente -->
    <div class="overlay"></div>

    <!-- Slider de textos -->
    <div class="text-slider-container">
      <transition :name="transitionDirection" mode="out-in">
        <div
          :key="currentIndex"
          class="text-slide"
          :aria-hidden="textTransitioning"
        >
          <div class="slide-content">
            <div class="slide-badge">{{ currentSlide.badge }}</div>
            <h2 class="slide-title" v-html="currentSlide.title"></h2>
            <p class="slide-description">{{ currentSlide.description }}</p>

            <div class="slide-buttons">
              <button
                class="btn btn-primary"
                @click="navigateTo(currentSlide.ctaLink)"
                :aria-label="currentSlide.ctaText"
              >
                {{ currentSlide.ctaText }}
              </button>
              <button
                class="btn btn-outline"
                @click="openVideo(currentSlide.videoId)"
                :aria-label="'Assistir tour virtual'"
              >
                <i class="fas fa-play" aria-hidden="true"></i> Contato
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Controles do slider (apenas paginação) -->
    <div class="slider-controls">
      <div class="pagination">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
          :aria-label="`Ir para texto ${index + 1}`"
          :aria-current="currentIndex === index"
        >
          <span class="progress-bar" v-if="currentIndex === index">
            <span class="progress-fill" :style="progressStyle"></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Indicador de autoplay -->
    <div class="autoplay-control">
      <button
        @click="toggleAutoplay"
        :aria-label="autoplay ? 'Pausar slideshow' : 'Reproduzir slideshow'"
        class="autoplay-btn"
      >
        <i :class="autoplay ? 'fas fa-pause' : 'fas fa-play'"></i>
      </button>
    </div>

    <!-- Video Modal -->
    <transition name="fade">
      <div
        v-if="showVideo"
        class="video-modal"
        @click.self="closeVideo"
        role="dialog"
        aria-modal="true"
        :aria-label="'Reproduzindo vídeo'"
      >
        <div class="modal-content">
          <button
            class="close-btn"
            @click="closeVideo"
            aria-label="Fechar vídeo"
            ref="closeButton"
          >
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
          <div class="video-container" v-if="videoId && showVideo">
            <iframe
              :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
              title="Tour virtual"
              ref="videoIframe"
            >
            </iframe>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "HeroBannerTextSlider",
  data() {
    return {
      currentIndex: 0,
      showVideo: false,
      videoId: "",
      autoplay: true,
      progress: 0,
      textTransitioning: false,
      transitionDirection: "slide-left",
      backgroundImage:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      slides: [
        {
          title: "Construindo o <span>futuro</span> com excelência",
          description:
            "Empreendimentos residenciais que combinam luxo, conforto e tecnologia",
          badge: "Novo Lançamento",
          ctaText: "Conheça o Residencial Solaris",
          ctaLink: "#launches",
          videoId: "XqZsoesa55w",
        },
        {
          title: "Design arquitetônico <span>inovador</span>",
          description:
            "Soluções criativas para projetos comerciais de grande porte",
          badge: "Destaque",
          ctaText: "Explore nossos projetos",
          ctaLink: "#portfolio",
          videoId: "XqZsoesa55w",
        },
        {
          title: "30 anos <span>transformando</span> sonhos",
          description:
            "Trajetória marcada por obras icônicas e satisfação dos clientes",
          badge: "Nossa História",
          ctaText: "Saiba mais sobre nós",
          ctaLink: "#about",
          videoId: "XqZsoesa55w",
        },
      ],
      autoPlayInterval: null,
      progressInterval: null,
    };
  },
  computed: {
    currentSlide() {
      return this.slides[this.currentIndex];
    },
    progressStyle() {
      return {
        width: `${this.progress}%`,
      };
    },
  },
  methods: {
    nextSlide() {
      this.transitionDirection = "slide-left";
      this.textTransitioning = true;
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.textTransitioning = false;
        this.resetProgress();
        this.resetAutoplay();
      }, 300);
    },
    prevSlide() {
      this.transitionDirection = "slide-right";
      this.textTransitioning = true;
      setTimeout(() => {
        this.currentIndex =
          (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.textTransitioning = false;
        this.resetProgress();
        this.resetAutoplay();
      }, 300);
    },
    goToSlide(index) {
      this.transitionDirection =
        index > this.currentIndex ? "slide-left" : "slide-right";
      this.textTransitioning = true;
      setTimeout(() => {
        this.currentIndex = index;
        this.textTransitioning = false;
        this.resetProgress();
        this.resetAutoplay();
      }, 300);
    },
    navigateTo(link) {
      // Implemente a navegação conforme seu router
      this.$router && this.$router.push(link);
    },
    openVideo(id) {
      this.videoId = id;
      this.showVideo = true;
      document.body.style.overflow = "hidden";

      // Foco no botão de fechar para acessibilidade
      this.$nextTick(() => {
        this.$refs.closeButton?.focus();
      });
    },
    closeVideo() {
      this.showVideo = false;
      this.videoId = "";
      document.body.style.overflow = "auto";

      // Pausa o vídeo ao fechar
      if (this.$refs.videoIframe) {
        this.$refs.videoIframe.src = "";
      }
    },
    startAutoplay() {
      if (!this.autoplay) return;

      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 6000);

      // Inicia a barra de progresso
      this.startProgress();
    },
    startProgress() {
      const duration = 6000; // 6 segundos
      const steps = 100;
      const interval = duration / steps;
      this.progress = 0;

      clearInterval(this.progressInterval);
      this.progressInterval = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          clearInterval(this.progressInterval);
        }
      }, interval);
    },
    resetProgress() {
      clearInterval(this.progressInterval);
      this.progress = 0;
    },
    resetAutoplay() {
      clearInterval(this.autoPlayInterval);
      this.startAutoplay();
    },
    toggleAutoplay() {
      this.autoplay = !this.autoplay;
      if (this.autoplay) {
        this.startAutoplay();
      } else {
        clearInterval(this.autoPlayInterval);
        clearInterval(this.progressInterval);
      }
    },
    handleKeydown(e) {
      // Navegação por teclado
      if (this.showVideo) {
        if (e.key === "Escape") this.closeVideo();
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          this.prevSlide();
          break;
        case "ArrowRight":
          e.preventDefault();
          this.nextSlide();
          break;
        case " ":
          e.preventDefault();
          this.toggleAutoplay();
          break;
      }
    },
  },
  mounted() {
    this.startAutoplay();
    document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    clearInterval(this.autoPlayInterval);
    clearInterval(this.progressInterval);
    document.removeEventListener("keydown", this.handleKeydown);
  },
};
</script>

<style scoped>
.hero-banner {
  position: relative;
  height: 100vh;
  min-height: 700px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: -90px; /* Compensa o header */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 1;
}

.text-slider-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.text-slide {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 10%;
}

.slide-content {
  max-width: 700px;
  color: white;
  text-align: center;
}

.slide-badge {
  display: inline-block;
  background: #ffd700;
  color: #1a1a1a;
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.slide-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.slide-title span {
  color: #ffd700;
}

.slide-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 40px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.slide-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn {
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn:focus-visible {
  outline: 2px solid #ffd700;
  outline-offset: 2px;
}

.btn i {
  margin-right: 8px;
}

.btn-primary {
  background: #2c3e50;
  border: 2px solid #2c3e50;
  color: white;
}

.btn-primary:hover {
  background: #1e2a36;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-outline {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.btn-outline:hover {
  background: white;
  color: #1a1a1a;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.slider-controls {
  position: absolute;
  bottom: 120px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10%;
  z-index: 3;
}

.pagination {
  display: flex;
  gap: 15px;
}

.pagination button {
  position: relative;
  width: 40px;
  height: 4px;
  border-radius: 2px;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  overflow: hidden;
}

.pagination button.active {
  background: rgba(255, 255, 255, 0.3);
}

.pagination button.active .progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #ffd700;
  transition: width 0.1s linear;
}

.pagination button:focus-visible {
  outline: 2px solid #ffd700;
  outline-offset: 2px;
}

.autoplay-control {
  position: absolute;
  bottom: 40px;
  right: 20px;
  z-index: 3;
}

.autoplay-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.autoplay-btn:hover {
  background: #2c3e50;
}

.autoplay-btn:focus-visible {
  outline: 2px solid #ffd700;
  outline-offset: 2px;
}

.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  width: 80%;
  max-width: 1000px;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* Aspect ratio 16:9 */
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
}

.close-btn:hover {
  color: #ffd700;
}

.close-btn:focus-visible {
  outline: 2px solid #ffd700;
  outline-offset: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Animações para transição de textos */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

/* Responsividade */
@media (max-width: 1200px) {
  .text-slide {
    padding: 0 5%;
  }

  .slide-title {
    font-size: 2.8rem;
  }

  .slider-controls {
    padding: 0 5%;
  }
}

@media (max-width: 992px) {
  .hero-banner {
    min-height: 600px;
  }

  .slide-title {
    font-size: 2.2rem;
  }

  .slide-description {
    font-size: 1rem;
    max-width: 100%;
  }

  .slide-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .slider-controls {
    bottom: 100px;
  }

  .pagination {
    gap: 10px;
  }

  .pagination button {
    width: 30px;
  }

  .autoplay-control {
    bottom: 20px;
    right: 20px;
  }
}

@media (max-width: 576px) {
  .slide-title {
    font-size: 1.8rem;
  }

  .slide-badge {
    font-size: 12px;
  }

  .slider-controls {
    bottom: 80px;
  }

  .video-modal .modal-content {
    width: 95%;
  }

  .close-btn {
    top: -40px;
    right: -10px;
  }
}

/* Estilos de redução de movimento para acessibilidade */
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }

  .btn:hover {
    transform: none;
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: none;
  }
}
</style>
