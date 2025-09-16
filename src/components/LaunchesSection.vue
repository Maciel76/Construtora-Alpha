<template>
  <section id="launches" class="launches-section">
    <!-- Efeito de partículas animadas -->
    <div class="animated-particles">
      <div
        class="particle"
        v-for="i in 15"
        :key="i"
        :style="particleStyle(i)"
      ></div>
    </div>

    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">
          Nossos <span>Lançamentos</span> Exclusivos
        </h2>
        <p class="section-subtitle">
          Descubra o futuro da construção civil de alto padrão
        </p>
        <div class="section-decoration">
          <div class="decoration-line"></div>
          <div class="decoration-dot"></div>
          <div class="decoration-line"></div>
        </div>
      </div>

      <!-- Filtro de categorias -->
      <div class="category-filter" data-aos="fade-up" data-aos-delay="100">
        <button
          v-for="category in categories"
          :key="category"
          :class="{ active: activeCategory === category }"
          @click="activeCategory = category"
          class="filter-btn"
        >
          {{ category }}
        </button>
      </div>

      <!-- Slider 3D de lançamentos -->
      <div
        class="launches-slider"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="slider-track" :style="trackStyle">
          <div
            v-for="(launch, index) in filteredLaunches"
            :key="launch.id"
            class="launch-card"
            :class="{
              active: centerIndex === index,
              left: Math.abs(centerIndex - index) === 1 && index < centerIndex,
              right: Math.abs(centerIndex - index) === 1 && index > centerIndex,
              far: Math.abs(centerIndex - index) > 1,
            }"
            @click="centerIndex = index"
          >
            <div class="card-inner">
              <!-- Imagem com efeito parallax e loading otimizado -->
              <div class="image-container" :style="parallaxStyle(index)">
                <img
                  :src="launch.image"
                  :alt="launch.title"
                  class="launch-image"
                  loading="lazy"
                  @load="handleImageLoad"
                />
                <div class="image-overlay"></div>

                <!-- Badge animado melhorado -->
                <div class="status-badge" :class="launch.status.toLowerCase()">
                  <span>{{ launch.status }}</span>
                  <div class="pulse-effect"></div>
                  <div class="shine-effect"></div>
                </div>

                <!-- Contador de imagens -->
                <div class="gallery-count">
                  <i class="fas fa-images"></i>
                  {{ launch.gallery.length }} fotos
                </div>

                <!-- Preço do empreendimento -->
                <div class="price-tag">
                  <span class="from">A partir de</span>
                  <span class="amount">{{ launch.price }}</span>
                </div>
              </div>

              <!-- Conteúdo -->
              <div class="launch-content">
                <h3>{{ launch.title }}</h3>

                <div class="location">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ launch.location }}</span>
                  <small class="delivery-date"
                    >Entrega: {{ launch.deliveryDate }}</small
                  >
                </div>

                <p class="description">{{ launch.description }}</p>

                <!-- Progresso de vendas com animação -->
                <div class="sales-progress" v-if="launch.salesProgress">
                  <div class="progress-info">
                    <span class="available"
                      >{{ launch.salesProgress.available }} unidades
                      restantes</span
                    >
                    <span class="sold"
                      >{{ launch.salesProgress.percent }}% vendido</span
                    >
                  </div>
                  <div class="progress-bar">
                    <div
                      class="progress-fill"
                      :style="{ width: launch.salesProgress.percent + '%' }"
                      :class="{
                        animated:
                          centerIndex === filteredLaunches.indexOf(launch),
                      }"
                    ></div>
                  </div>
                </div>

                <!-- Destaques do empreendimento -->
                <div class="highlights">
                  <div class="highlight-item">
                    <i class="fas fa-ruler-combined"></i>
                    <span>{{ launch.area }}m²</span>
                  </div>
                  <div class="highlight-item">
                    <i class="fas fa-bed"></i>
                    <span>{{ launch.rooms }} dorm.</span>
                  </div>
                  <div class="highlight-item">
                    <i class="fas fa-car"></i>
                    <span>{{ launch.parking }} vagas</span>
                  </div>
                </div>

                <!-- Features com tooltip -->
                <div class="features-grid">
                  <div
                    v-for="(feature, i) in launch.features.slice(0, 6)"
                    :key="i"
                    class="feature-item"
                    @mouseenter="
                      activeFeature = { index: i, launchId: launch.id }
                    "
                    @mouseleave="activeFeature = null"
                  >
                    <div class="feature-icon-wrapper">
                      <div
                        class="feature-icon"
                        :class="{
                          highlight:
                            activeFeature?.index === i &&
                            activeFeature?.launchId === launch.id,
                        }"
                      >
                        {{ feature.icon }}
                      </div>
                    </div>
                    <div class="feature-text">
                      {{ feature.text }}
                    </div>
                  </div>
                </div>

                <!-- Botão com efeito magnético melhorado -->
                <button
                  class="cta-button magnetic-button"
                  @click="openModal(launch)"
                  @mouseenter="handleButtonHover"
                >
                  <span class="btn-text">Reserve sua unidade</span>
                  <span class="btn-arrow">→</span>
                  <span class="btn-hover-effect"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Controles de navegação melhorados -->
        <button
          class="slider-nav prev"
          @click="prevLaunch"
          v-if="filteredLaunches.length > 1"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          class="slider-nav next"
          @click="nextLaunch"
          v-if="filteredLaunches.length > 1"
        >
          <i class="fas fa-chevron-right"></i>
        </button>

        <!-- Indicador de posição -->
        <div class="slider-position" v-if="filteredLaunches.length > 1">
          {{ centerIndex + 1 }} / {{ filteredLaunches.length }}
        </div>
      </div>

      <!-- Indicadores com miniaturas -->
      <div class="slider-dots" v-if="filteredLaunches.length > 1">
        <button
          v-for="(launch, index) in filteredLaunches"
          :key="index"
          :class="{ active: centerIndex === index }"
          @click="centerIndex = index"
        >
          <img :src="launch.image" :alt="'Miniatura ' + launch.title" />
        </button>
      </div>

      <!-- Estado vazio -->
      <div v-if="filteredLaunches.length === 0" class="empty-state">
        <i class="fas fa-building"></i>
        <h3>Nenhum lançamento encontrado</h3>
        <p>Em breve teremos novidades nesta categoria</p>
      </div>

      <!-- Call to action principal -->
      <div class="cta-container" data-aos="fade-up">
        <button class="primary-cta-button" @click="scrollToContact">
          <i class="fas fa-calendar-check"></i>
          Agende uma visita personalizada
        </button>
      </div>
    </div>

    <!-- Modal de detalhes -->
    <LaunchModal
      :launch="selectedLaunch"
      :is-open="modalOpen"
      @close="modalOpen = false"
    />
  </section>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "LaunchesSection",
  data() {
    return {
      centerIndex: 0,
      activeFeature: null,
      modalOpen: false,
      selectedLaunch: null,
      activeCategory: "Todos",
      touchStartX: 0,
      touchEndX: 0,
      categories: ["Todos", "Residencial", "Comercial", "Lazer"],
      launches: [
        {
          id: 1,
          title: "Residencial Skyline Premium",
          location: "São Paulo, SP - Jardins",
          description:
            "Torres gêmeas com vista panorâmica para a cidade, apartamentos de 2 a 4 dormitórios com lazer completo e tecnologia smart home. Acabamentos em mármore e porcelanato.",
          image:
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1350&q=80",
          status: "Pré-Lançamento",
          category: "Residencial",
          price: "R$ 1.2M",
          area: "75-95m²",
          rooms: "2-4",
          parking: "1-2",
          salesProgress: { available: 42, percent: 65 },
          features: [
            { icon: "🏢", text: "2 Torres" },
            { icon: "🏠", text: "120 unidades" },
            { icon: "🛏️", text: "2-4 dorm." },
            { icon: "🏊", text: "Piscina infinita" },
            { icon: "🏋️", text: "Academia premium" },
            { icon: "🌿", text: "Área verde 5.000m²" },
            { icon: "🎬", text: "Cinema privativo" },
            { icon: "🍷", text: "Adega climatizada" },
          ],
          gallery: [
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1350&q=80",
          ],
          floorPlans: [
            { type: "2 dormitórios", area: "75m²", price: "R$ 1.2M" },
            { type: "3 dormitórios", area: "95m²", price: "R$ 1.8M" },
          ],
          deliveryDate: "4º Trimestre 2024",
        },
        {
          id: 2,
          title: "Business Tower Corporate",
          location: "Rio de Janeiro, RJ - Barra da Tijuca",
          description:
            "Edifício corporativo classe A+ com tecnologia de ponta, certificação LEED Platinum e localização privilegiada. Salas from 50m² a andares corporativos completos.",
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
          status: "Lançamento",
          category: "Comercial",
          price: "R$ 3.5M",
          area: "50-1000m²",
          rooms: "Variável",
          parking: "2-20",
          salesProgress: { available: 18, percent: 82 },
          features: [
            { icon: "🏢", text: "30 andares" },
            { icon: "🖥️", text: "Smart Office" },
            { icon: "🍽️", text: "Restaurante" },
            { icon: "🅿️", text: "Estacionamento" },
            { icon: "🌿", text: "Green Building" },
            { icon: "🌐", text: "Fibra óptica" },
            { icon: "🚁", text: "Heliponto" },
            { icon: "🏦", text: "Banco integrado" },
          ],
          gallery: [
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1350&q=80",
          ],
          floorPlans: [
            { type: "Salas comerciais", area: "50-200m²", price: "R$ 3.5M" },
            { type: "Andares corporativos", area: "1.000m²", price: "R$ 15M" },
          ],
          deliveryDate: "2º Trimestre 2025",
        },
        {
          id: 3,
          title: "Villas da Montanha Resort",
          location: "Campos do Jordão, SP - Capivari",
          description:
            "Condomínio de luxo com chalés personalizados, spa premium e vista para as montanhas. Conforto alpino com requinte brasileiro. Lazer completo para toda família.",
          image:
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1350&q=80",
          status: "Em Obras",
          category: "Lazer",
          price: "R$ 2.8M",
          area: "220-350m²",
          rooms: "3-5",
          parking: "2-4",
          salesProgress: { available: 7, percent: 88 },
          features: [
            { icon: "🏔️", text: "Vista montanha" },
            { icon: "🛖", text: "15 chalés" },
            { icon: "♨️", text: "Spa premium" },
            { icon: "🍷", text: "Adega climatizada" },
            { icon: "🚗", text: "Garagem aquecida" },
            { icon: "🛎️", text: "Concierge 24h" },
            { icon: "🎣", text: "Lago com pesca" },
            { icon: "🔥", text: "Lareira interna" },
          ],
          gallery: [
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1350&q=80",
          ],
          floorPlans: [
            { type: "Chalé 3 suítes", area: "220m²", price: "R$ 2.8M" },
            { type: "Chalé master", area: "350m²", price: "R$ 4.2M" },
          ],
          deliveryDate: "3º Trimestre 2024",
        },
        {
          id: 4,
          title: "Green Life Residencial",
          location: "Florianópolis, SC - Jurerê",
          description:
            "Condomínio sustentável com certificação verde, energia solar e áreas comuns integradas à natureza. Apartamentos de 2 e 3 dormitórios com varanda gourmet.",
          image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
          status: "Pré-Lançamento",
          category: "Residencial",
          price: "R$ 950K",
          area: "68-92m²",
          rooms: "2-3",
          parking: "1-2",
          salesProgress: { available: 56, percent: 45 },
          features: [
            { icon: "🌞", text: "Energia solar" },
            { icon: "💧", text: "Reuso água" },
            { icon: "🍃", text: "Certificação verde" },
            { icon: "🏃", text: "Trilha ecológica" },
            { icon: "🧘", text: "Espaço wellness" },
            { icon: "🚴", text: "Bicicletário" },
          ],
          gallery: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1350&q=80",
          ],
          floorPlans: [
            { type: "2 dormitórios", area: "68m²", price: "R$ 950K" },
            { type: "3 dormitórios", area: "92m²", price: "R$ 1.3M" },
          ],
          deliveryDate: "1º Trimestre 2025",
        },
      ],
    };
  },
  computed: {
    filteredLaunches() {
      if (this.activeCategory === "Todos") return this.launches;
      return this.launches.filter(
        (launch) => launch.category === this.activeCategory
      );
    },
    trackStyle() {
      return {
        transform: `translateX(calc(50% - ${this.centerIndex * 420}px))`,
        transition: "transform 0.7s cubic-bezier(0.33, 1, 0.68, 1)",
      };
    },
  },
  methods: {
    particleStyle(i) {
      const size = Math.random() * 6 + 2;
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 10 + 10}s`,
        opacity: Math.random() * 0.3 + 0.1,
      };
    },
    parallaxStyle(index) {
      const offset = (this.centerIndex - index) * 15;
      return {
        transform: `translateY(${offset}px) scale(${
          1 - Math.abs(this.centerIndex - index) * 0.05
        })`,
        opacity: 1 - Math.abs(this.centerIndex - index) * 0.3,
      };
    },
    nextLaunch() {
      if (this.centerIndex < this.filteredLaunches.length - 1) {
        this.centerIndex++;
      } else {
        this.centerIndex = 0;
      }
    },
    prevLaunch() {
      if (this.centerIndex > 0) {
        this.centerIndex--;
      } else {
        this.centerIndex = this.filteredLaunches.length - 1;
      }
    },
    openModal(launch) {
      this.selectedLaunch = launch;
      this.modalOpen = true;
      document.body.style.overflow = "hidden";
    },
    handleImageLoad(e) {
      gsap.to(e.target, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    handleButtonHover(e) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(button.querySelector(".btn-hover-effect"), {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        scale: 10,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
    },
    handleTouchMove(e) {
      this.touchEndX = e.touches[0].clientX;
    },
    handleTouchEnd() {
      const diff = this.touchStartX - this.touchEndX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.nextLaunch();
        } else {
          this.prevLaunch();
        }
      }
    },
    scrollToContact() {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    setupMagneticEffects() {
      const magneticButtons = document.querySelectorAll(".magnetic-button");
      magneticButtons.forEach((button) => {
        button.addEventListener("mousemove", (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          gsap.to(button, {
            x: (x - centerX) * 0.2,
            y: (y - centerY) * 0.2,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });
    },
  },
  watch: {
    activeCategory() {
      this.centerIndex = 0;
    },
  },
  mounted() {
    this.setupMagneticEffects();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.launches-section {
  position: relative;
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  overflow: hidden;
}

.animated-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  border-radius: 50%;
  animation: floatParticle linear infinite;

  @keyframes floatParticle {
    0% {
      transform: translateY(100vh) rotate(0deg);
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
    }
  }
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;

  .section-title {
    font-size: 3.2rem;
    font-weight: 800;
    color: $dark-color;
    margin-bottom: 15px;

    span {
      color: $primary-color;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 12px;
        background: rgba($secondary-color, 0.4);
        z-index: -1;
        transform: skewX(-15deg);
      }
    }
  }

  .section-subtitle {
    font-size: 1.3rem;
    color: lighten($gray-color, 10%);
    max-width: 700px;
    margin: 0 auto 30px;
    line-height: 1.6;
  }

  .section-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

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
      width: 10px;
      height: 10px;
      background: $secondary-color;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
  }
}

.category-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 50px;

  .filter-btn {
    background: white;
    border: 2px solid transparent;
    padding: 12px 25px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-color: $primary-color;
    }

    &.active {
      background: $primary-color;
      color: white;
      box-shadow: 0 8px 25px rgba($primary-color, 0.3);
    }
  }
}

.launches-slider {
  position: relative;
  width: 100%;
  height: 600px;
  margin: 0 auto;
  perspective: 1000px;
}

.slider-track {
  display: flex;
  gap: 40px;
  position: absolute;
  left: 0;
  top: 0;
}

.launch-card {
  width: 400px;
  height: 550px;
  position: relative;
  transition: all 0.5s ease;

  &.active {
    transform: translateY(-20px) scale(1.05);
    z-index: 10;
  }

  &.left {
    transform: translateX(-100px) scale(0.9);
    opacity: 0.8;
    z-index: 5;
    filter: brightness(0.9);
  }

  &.right {
    transform: translateX(100px) scale(0.9);
    opacity: 0.8;
    z-index: 5;
    filter: brightness(0.9);
  }

  &.far {
    opacity: 0.4;
    filter: blur(2px);
  }
}

.card-inner {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;

  .active & {
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.2);
  }
}

.image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.launch-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  opacity: 0;

  .active &:hover {
    transform: scale(1.1);
  }
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba($dark-color, 0.8), transparent 70%);
}

.status-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 22px;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  z-index: 2;
  overflow: hidden;

  &.pré-lançamento {
    background: $secondary-color;
    color: $dark-color;
  }

  &.lançamento {
    background: $primary-color;
  }

  &.em-obras {
    background: #2c7d59;
  }

  .pulse-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    animation: pulse 2s infinite;
    opacity: 0.7;
    z-index: -1;
  }

  .shine-effect {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    animation: shine 3s infinite;
  }
}

.gallery-count {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  backdrop-filter: blur(10px);
}

.price-tag {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 15px;
  border-radius: 15px;
  text-align: right;
  backdrop-filter: blur(10px);

  .from {
    display: block;
    font-size: 0.7rem;
    color: $gray-color;
  }

  .amount {
    display: block;
    font-weight: 700;
    color: $primary-color;
    font-size: 1.1rem;
  }
}

.launch-content {
  padding: 25px;
  height: calc(100% - 250px);
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.6rem;
    color: $primary-color;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .location {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $gray-color;
    margin-bottom: 15px;
    font-size: 0.9rem;

    i {
      color: $secondary-color;
    }

    .delivery-date {
      margin-left: auto;
      font-size: 0.8rem;
    }
  }

  .description {
    color: lighten($dark-color, 20%);
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
    font-size: 0.95rem;
  }
}

.highlights {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  .highlight-item {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba($primary-color, 0.1);
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.8rem;
    color: $primary-color;

    i {
      font-size: 0.9rem;
    }
  }
}

.sales-progress {
  margin-bottom: 20px;

  .progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: $gray-color;
    margin-bottom: 8px;

    .available {
      color: $primary-color;
    }

    .sold {
      color: $secondary-color;
      font-weight: 600;
    }
  }

  .progress-bar {
    height: 8px;
    background: #eee;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, $secondary-color, $primary-color);
    transition: width 1s ease;

    &.animated {
      animation: progressFill 1.5s ease-out;
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 25px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;

  .feature-icon {
    width: 40px;
    height: 40px;
    background: rgba($primary-color, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;

    &.highlight {
      background: $primary-color;
      color: white;
      transform: scale(1.2);
    }
  }

  .feature-text {
    font-size: 0.7rem;
    text-align: center;
    margin-top: 5px;
    font-weight: 500;
    color: $gray-color;
  }
}

.cta-button {
  background: $primary-color;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      $primary-color,
      darken($primary-color, 10%)
    );
    z-index: -1;
    transition: transform 0.5s ease;
  }

  &:hover::before {
    transform: scaleX(1.1);
  }

  .btn-text {
    flex-grow: 1;
    text-align: center;
  }

  .btn-arrow {
    width: 30px;
    height: 30px;
    background: $secondary-color;
    color: $dark-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  &:hover .btn-arrow {
    transform: rotate(45deg);
  }

  .btn-hover-effect {
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
  }
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: $primary-color;
  transition: all 0.3s ease;

  &:hover {
    background: $primary-color;
    color: white;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 12px 30px rgba($primary-color, 0.3);
  }

  &.prev {
    left: -25px;
  }

  &.next {
    right: -25px;
  }
}

.slider-position {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: $primary-color;
  color: white;
  padding: 6px 18px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 50px;

  button {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    border: 3px solid transparent;
    cursor: pointer;
    padding: 0;
    overflow: hidden;
    transition: all 0.3s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &.active {
      border-color: $primary-color;
      transform: scale(1.1);

      img {
        transform: scale(1.1);
      }
    }

    &:hover:not(.active) {
      border-color: rgba($primary-color, 0.5);
    }
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: $gray-color;

  i {
    font-size: 4rem;
    color: lighten($gray-color, 20%);
    margin-bottom: 20px;
    display: block;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: $dark-color;
  }

  p {
    font-size: 1.1rem;
  }
}

.cta-container {
  text-align: center;
  margin-top: 60px;
}

.primary-cta-button {
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  color: white;
  border: none;
  padding: 18px 35px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba($primary-color, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba($primary-color, 0.4);
  }

  i {
    margin-right: 10px;
  }
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

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

@keyframes progressFill {
  from {
    width: 0%;
  }
}

@keyframes floatParticle {
  0% {
    transform: translateY(100vh) rotate(0deg);
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
  }
}

/* Responsividade */
@media (max-width: 1200px) {
  .launch-card {
    width: 360px;
    height: 520px;

    &.left {
      transform: translateX(-80px) scale(0.9);
    }

    &.right {
      transform: translateX(80px) scale(0.9);
    }
  }

  .slider-track {
    gap: 30px;
  }
}

@media (max-width: 992px) {
  .launches-section {
    padding: 80px 0;
  }

  .launches-slider {
    height: 500px;
  }

  .launch-card {
    width: 320px;
    height: 480px;
  }

  .section-header .section-title {
    font-size: 2.5rem;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .launch-card {
    width: 280px;
    height: 450px;

    &.active {
      transform: translateY(-10px) scale(1.03);
    }

    &.left,
    &.right {
      display: none;
    }
  }

  .slider-nav {
    width: 40px;
    height: 40px;
    font-size: 1rem;

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }

  .section-header .section-title {
    font-size: 2rem;
  }

  .slider-dots button {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 576px) {
  .launches-slider {
    height: 420px;
  }

  .launch-card {
    width: 260px;
    height: 400px;
  }

  .image-container {
    height: 180px;
  }

  .launch-content {
    padding: 15px;
  }

  .cta-button {
    padding: 12px;
    font-size: 0.9rem;
  }

  .highlights {
    flex-wrap: wrap;
    gap: 8px;
  }

  .highlight-item {
    flex: 1;
    min-width: calc(50% - 8px);
    justify-content: center;
  }
}
</style>
