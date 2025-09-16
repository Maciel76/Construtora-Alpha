<template>
  <section id="portfolio" class="portfolio-section">
    <!-- Efeito de partículas como background -->
    <Particles id="portfolio-particles" :options="particleOptions" />

    <div class="container">
      <!-- Cabeçalho com efeito parallax -->
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Nossas <span>Obras</span> Iconicas</h2>
        <p class="section-subtitle">
          Explore nosso portfólio de projetos que redefiniram horizontes
        </p>
      </div>

      <!-- Filtro 3D -->
      <div class="filter-controls" data-aos="fade-up" data-aos-delay="100">
        <button
          v-for="(filter, index) in filters"
          :key="index"
          :class="{ active: activeFilter === filter.value }"
          @click="activeFilter = filter.value"
          class="filter-btn"
        >
          <span class="filter-icon" :class="filter.icon"></span>
          {{ filter.label }}
        </button>
      </div>

      <!-- Grid de projetos com efeito masonry -->
      <div class="portfolio-grid">
        <transition-group name="staggered-fade">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="portfolio-item"
            @click="openProject(project.id)"
          >
            <div class="project-card">
              <div class="card-face front">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="project-image"
                />
                <div class="project-overlay">
                  <div class="overlay-content">
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.location }}</p>
                    <div class="overlay-actions">
                      <button class="quick-view-btn">
                        <i class="fas fa-eye"></i> Visualizar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="project-badge"
              :style="{ backgroundColor: getCategoryColor(project.category) }"
            >
              {{ getCategoryLabel(project.category) }}
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Controle de carregamento -->
      <div class="load-more" v-if="showLoadMore" data-aos="fade-up">
        <button class="load-btn" @click="loadMoreProjects">
          Carregar Mais
          <div class="loading-dots" v-if="loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Overlay de detalhes do projeto -->
    <transition name="overlay-fade">
      <div
        v-if="overlayOpen && selectedProject && selectedProject.title"
        class="project-overlay-detail"
      >
        <div class="overlay-backdrop" @click="closeOverlay"></div>
        <div class="overlay-content" :class="{ expanded: overlayExpanded }">
          <button class="close-overlay" @click="closeOverlay">
            <i class="fas fa-times"></i>
          </button>

          <div class="overlay-body">
            <!-- Galeria de imagens -->
            <div class="project-gallery">
              <div class="main-image">
                <img :src="selectedImage" :alt="selectedProject.title" />
                <button class="expand-toggle" @click="toggleOverlayExpansion">
                  <i
                    class="fas"
                    :class="overlayExpanded ? 'fa-compress' : 'fa-expand'"
                  ></i>
                </button>
              </div>
              <div class="image-thumbnails">
                <div
                  v-for="(img, idx) in selectedProject.gallery"
                  :key="idx"
                  class="thumbnail"
                  :class="{ active: selectedImage === img }"
                  @click="selectedImage = img"
                >
                  <img
                    :src="img"
                    :alt="`${selectedProject.title} - Imagem ${idx + 1}`"
                  />
                </div>
              </div>
            </div>

            <!-- Detalhes do projeto -->
            <div class="project-details">
              <h2>{{ selectedProject.title }}</h2>
              <div class="project-meta">
                <div class="meta-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ selectedProject.location }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-calendar-alt"></i>
                  <span>{{ selectedProject.year }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-ruler-combined"></i>
                  <span>{{ selectedProject.area }}</span>
                </div>
              </div>

              <p class="project-description">
                {{ selectedProject.description }}
              </p>

              <div class="project-features">
                <h3>Características Principais</h3>
                <ul>
                  <li
                    v-for="(feature, idx) in selectedProject.features"
                    :key="idx"
                  >
                    <i class="fas fa-check"></i> {{ feature }}
                  </li>
                </ul>
              </div>

              <div class="project-actions">
                <button class="cta-btn primary">
                  <i class="fas fa-envelope"></i> Solicitar Orçamento
                </button>
                <button class="cta-btn secondary">
                  <i class="fas fa-download"></i> Baixar Portfólio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "PortfolioSection",
  setup() {
    // Configuração das partículas
    const particleOptions = {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: "#e9b949" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 4, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#1a3a6e",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
        },
      },
    };

    // Dados dos projetos
    // Dados dos projetos
    const projects = ref([
      // RESIDENCIAL (8 projetos)
      {
        id: 1,
        title: "Residencial Solaris",
        category: "residencial",
        location: "São Paulo, SP",
        year: "2023",
        area: "12.000 m²",
        description:
          "Conjunto residencial de luxo com 3 torres e área de lazer completa. Projeto arquitetônico inovador com foco em sustentabilidade e conforto, integrando áreas verdes e tecnologia de ponta para oferecer a melhor experiência em moradia urbana.",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Piscina olímpica",
          "Academia premium",
          "Jardim vertical",
          "Segurança 24h",
          "Espaço gourmet",
          "Cinema privativo",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 2,
        title: "Villas da Serra",
        category: "residencial",
        location: "Gramado, RS",
        year: "2022",
        area: "8.500 m²",
        description:
          "Condomínio de chalés em área montanhosa com vista panorâmica. Projeto que harmoniza arquitetura contemporânea com o ambiente natural, criando refúgios aconchegantes com máximo conforto e integração com a natureza.",
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Lareira central",
          "Spa exclusivo",
          "Jardins temáticos",
          "Varandas com vista",
          "Sauna a vapor",
          "Trilhas privativas",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 11,
        title: "Corporate Business Tower",
        category: "comercial",
        location: "São Paulo, SP",
        year: "2023",
        area: "18.500 m²",
        description:
          "Arranha-céu corporativo com tecnologia de ponta, design inteligente e infraestrutura completa para empresas de grande porte.",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Heliponto",
          "Data center",
          "Restaurante executivo",
          "Centro de convenções",
          "Estacionamento robotizado",
          "Fachada inteligente",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 21,
        title: "Indústria 4.0 Delta",
        category: "industrial",
        location: "Joinville, SC",
        year: "2023",
        area: "28.000 m²",
        description:
          "Fábrica inteligente com conceito Industry 4.0, integrando IoT, IA e automação completa para manufatura avançada de componentes automotivos.",
        image: "https://images.unsplash.com/photo-1547895749-888a559fc2a7?q=80",
        features: [
          "Linhas robotizadas",
          "Digital twin",
          "Manutenção predictiva",
          "Controle qualidade AI",
          "Logística autônoma",
          "Energy harvesting",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1542274368-443d694d79aa?w=500&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1473876637954-4b493d59fd97?w=500&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1717386255773-1e3037c81788?q=80",
          "https://images.unsplash.com/photo-1468787737698-f5c03f0570dd?q=80",
        ],
      },
      {
        id: 27,
        title: "Hospital Municipal",
        category: "publico",
        location: "Recife, PE",
        year: "2023",
        area: "18.000 m²",
        description:
          "Hospital geral com equipamentos de última geração e arquitetura humanizada, priorizando o conforto dos pacientes e eficiência dos profissionais de saúde.",
        image:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Centro cirúrgico",
          "UTI neonatal",
          "Diagnóstico por imagem",
          "Heliponto médico",
          "Farmacia hospitalar",
          "Área de reabilitação",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 15,
        title: "Hotel Premium Suites",
        category: "comercial",
        location: "Salvador, BA",
        year: "2023",
        area: "16.800 m²",
        description:
          "Hotel 5 estrelas com arquitetura contemporânea e vista para o mar, oferecendo luxo, conforto e serviços exclusivos para hóspedes exigentes.",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Spa completo",
          "Piscina infinita",
          "Restaurante gourmet",
          "Sky bar",
          "Suites master",
          "Centro de eventos",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 3,
        title: "Residencial Golden Heights",
        category: "residencial",
        location: "Belo Horizonte, MG",
        year: "2023",
        area: "9.200 m²",
        description:
          "Edifício residencial de alto padrão com arquitetura moderna e design interior sofisticado. Foca no conforto e bem-estar dos residentes com áreas comuns premium.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Piscina infinita",
          "Academia completa",
          "Salão de festas",
          "Portaria 24h",
          "Pet place",
          "Playground",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 4,
        title: "Jardins de Alhambra",
        category: "residencial",
        location: "Goiânia, GO",
        year: "2022",
        area: "15.000 m²",
        description:
          "Condomínio fechado com inspiração mediterrânea, casas espaçosas com jardins privativos e arquitetura que remete às vilas espanholas.",
        image:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Área verde preservada",
          "Quadra poliesportiva",
          "Clube social",
          "Piscina adulto e infantil",
          "Salão gourmet",
          "Security house",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 5,
        title: "Skyline Residence",
        category: "residencial",
        location: "Curitiba, PR",
        year: "2023",
        area: "11.500 m²",
        description:
          "Torres gêmeas com apartamentos de luxo e vista panorâmica da cidade. Design contemporâneo com foco em eficiência energética e sustentabilidade.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Vista panorâmica",
          "Terraço gourmet",
          "Home office integrado",
          "Energia solar",
          "Automação residencial",
          "Academia premium",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 8,
        title: "Ocean View Residences",
        category: "residencial",
        location: "Santos, SP",
        year: "2022",
        area: "10.500 m²",
        description:
          "Edifício à beira-mar com apartamentos de frente para o oceano, design inspirado na arquitetura náutica e ampla área de lazer.",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Vista para o mar",
          "Piscina infinita",
          "Deck molhado",
          "Sauna úmida",
          "Restaurante panorâmico",
          "Marina privativa",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
        ],
      },

      // COMERCIAL (8 projetos)
      {
        id: 9,
        title: "Edifício Alpha Offices",
        category: "comercial",
        location: "Rio de Janeiro, RJ",
        year: "2023",
        area: "15.000 m²",
        description:
          "Centro empresarial com auditório e salas de reunião modulares. Projeto que redefine o conceito de workspace, combinando eficiência, tecnologia e bem-estar para criar um ambiente inspirador e produtivo.",
        image:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Auditório para 200 pessoas",
          "Coworking",
          "Café interno",
          "Estação de recarga elétrica",
          "Terraço gourmet",
          "Conectividade fibra óptica",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 12,
        title: "Tech Park Innovation",
        category: "comercial",
        location: "Campinas, SP",
        year: "2022",
        area: "25.000 m²",
        description:
          "Parque tecnológico com espaços colaborativos, laboratórios de pesquisa e ambiente propício para startups e empresas de tecnologia.",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Laboratórios de P&D",
          "Incubadora de startups",
          "Auditório multiuso",
          "Espaços colaborativos",
          "Cafeteria tech",
          "Áreas de descompressão",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 14,
        title: "Executive Business Center",
        category: "comercial",
        location: "Porto Alegre, RS",
        year: "2022",
        area: "12.500 m²",
        description:
          "Centro empresarial premium com escritórios corporativos, salas de reunião executivas e serviços de alto nível para empresas.",
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Salas boardroom",
          "Business lounge",
          "Concierge service",
          "Centro de mídia",
          "Serviços executivos",
          "Valet parking",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 15,
        title: "Hotel Premium Suites",
        category: "comercial",
        location: "Salvador, BA",
        year: "2023",
        area: "16.800 m²",
        description:
          "Hotel 5 estrelas com arquitetura contemporânea e vista para o mar, oferecendo luxo, conforto e serviços exclusivos para hóspedes exigentes.",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Spa completo",
          "Piscina infinita",
          "Restaurante gourmet",
          "Sky bar",
          "Suites master",
          "Centro de eventos",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 16,
        title: "Financial District Tower",
        category: "comercial",
        location: "São Paulo, SP",
        year: "2022",
        area: "20.000 m²",
        description:
          "Edifício no coração do distrito financeiro, projetado para instituições bancárias e financeiras com máxima segurança e tecnologia.",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Sistema segurança nível 3",
          "Data center tier 3",
          "Salas cofre",
          "Sistema backup completo",
          "Conectividade redundante",
          "Geradores próprios",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1350&q=80",
        ],
      },

      // INDUSTRIAL (8 projetos)
      {
        id: 17,
        title: "Fábrica de Processos Alfa",
        category: "industrial",
        location: "Campinas, SP",
        year: "2021",
        area: "30.000 m²",
        description:
          "Complexo industrial para manufatura e logística integrada. Projeto que combina eficiência operacional, segurança e sustentabilidade, criando um ambiente industrial de última geração com tecnologia de ponta.",
        image:
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Docas automatizadas",
          "Armazém refrigerado",
          "Centro de controle",
          "Sistema energia solar",
          "Estação tratamento água",
          "Logística robotizada",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 21,
        title: "Indústria 4.0 Delta",
        category: "industrial",
        location: "Joinville, SC",
        year: "2023",
        area: "28.000 m²",
        description:
          "Fábrica inteligente com conceito Industry 4.0, integrando IoT, IA e automação completa para manufatura avançada de componentes automotivos.",
        image: "https://images.unsplash.com/photo-1547895749-888a559fc2a7?q=80",
        features: [
          "Linhas robotizadas",
          "Digital twin",
          "Manutenção predictiva",
          "Controle qualidade AI",
          "Logística autônoma",
          "Energy harvesting",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1542274368-443d694d79aa?w=500&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1473876637954-4b493d59fd97?w=500&auto=format&fit=crop&q=60",
          "https://images.unsplash.com/photo-1717386255773-1e3037c81788?q=80",
          "https://images.unsplash.com/photo-1468787737698-f5c03f0570dd?q=80",
        ],
      },
      {
        id: 22,
        title: "Terminal Portuário Epsilon",
        category: "industrial",
        location: "Santos, SP",
        year: "2022",
        area: "45.000 m²",
        description:
          "Terminal portuário especializado em contêineres com operação automatizada e sistemas de movimentação de carga de última geração.",
        image:
          "https://images.unsplash.com/photo-1565108404384-2919e47c07c1?q=80",
        features: [
          "Guindastes automatizados",
          "Pátio inteligente",
          "Sistema OCR",
          "Operação 24/7",
          "Controle alfandegário",
          "Logística integrada",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1561380263-46623ae537fb?q=80",
          "https://images.unsplash.com/photo-1527997427307-32502931c675?q=80",
          "https://plus.unsplash.com/premium_photo-1661501562127-a8bb26defb35?q=80",
          "https://images.unsplash.com/photo-1596723806060-dc72ec1ca0d7?q=80",
        ],
      },
      {
        id: 25,
        title: "Biblioteca Central",
        category: "publico",
        location: "Porto Seguro, BA",
        year: "2022",
        area: "5.000 m²",
        description:
          "Biblioteca municipal com salão de leitura e auditório cultural. Projeto que reinventa o conceito de biblioteca pública, criando um espaço de convivência, aprendizado e cultura acessível a toda comunidade.",
        image:
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Sala multimídia",
          "Acervo digital",
          "Programação cultural",
          "Acessibilidade universal",
          "Jardim de leitura",
          "Espaço infantil",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 27,
        title: "Hospital Municipal",
        category: "publico",
        location: "Recife, PE",
        year: "2023",
        area: "18.000 m²",
        description:
          "Hospital geral com equipamentos de última geração e arquitetura humanizada, priorizando o conforto dos pacientes e eficiência dos profissionais de saúde.",
        image:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Centro cirúrgico",
          "UTI neonatal",
          "Diagnóstico por imagem",
          "Heliponto médico",
          "Farmacia hospitalar",
          "Área de reabilitação",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1350&q=80",
        ],
      },
      {
        id: 32,
        title: "Delegacia Modernizada",
        category: "publico",
        location: "Campo Grande, MS",
        year: "2022",
        area: "4.200 m²",
        description:
          "Unidade policial com tecnologia de segurança avançada, salas de interrogatório modernas e áreas administrativas eficientes para atendimento à população.",
        image:
          "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1350&q=80",
        features: [
          "Centro de comando",
          "Sala de situação",
          "Células modernas",
          "Área de atendimento",
          "Tecnologia biometrica",
          "Comunicação integrada",
        ],
        gallery: [
          "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=1350&q=80",
        ],
      },
    ]);

    const filters = ref([
      { label: "Todos", value: "all", icon: "fas fa-layer-group" },
      { label: "Residencial", value: "residencial", icon: "fas fa-home" },
      { label: "Comercial", value: "comercial", icon: "fas fa-building" },
      { label: "Industrial", value: "industrial", icon: "fas fa-industry" },
      { label: "Público", value: "publico", icon: "fas fa-university" },
    ]);

    const activeFilter = ref("all");
    const overlayOpen = ref(false);
    const overlayExpanded = ref(false);
    const selectedProject = ref({}); // Inicializado como objeto vazio
    const selectedImage = ref("");
    const visibleProjects = ref(6);
    const loading = ref(false);

    const filteredProjects = computed(() => {
      const filtered =
        activeFilter.value === "all"
          ? projects.value
          : projects.value.filter((p) => p.category === activeFilter.value);
      return filtered.slice(0, visibleProjects.value);
    });

    const showLoadMore = computed(() => {
      return (
        visibleProjects.value <
        (activeFilter.value === "all"
          ? projects.value.length
          : projects.value.filter((p) => p.category === activeFilter.value)
              .length)
      );
    });

    function openProject(id) {
      const project = projects.value.find((p) => p.id === id);
      if (project) {
        selectedProject.value = project;
        selectedImage.value = project.image;
        overlayOpen.value = true;
        document.body.style.overflow = "hidden";
      } else {
        console.error("Projeto não encontrado com ID:", id);
      }
    }

    function closeOverlay() {
      overlayOpen.value = false;
      overlayExpanded.value = false;
      document.body.style.overflow = "auto";
    }

    function toggleOverlayExpansion() {
      overlayExpanded.value = !overlayExpanded.value;
    }

    async function loadMoreProjects() {
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      visibleProjects.value += 3;
      loading.value = false;
    }

    function getCategoryColor(category) {
      const colors = {
        residencial: "#1a3a6e",
        comercial: "#e9b949",
        industrial: "#2c7d59",
        publico: "#9c3d54",
      };
      return colors[category] || "#1a3a6e";
    }

    function getCategoryLabel(category) {
      return filters.value.find((f) => f.value === category)?.label || category;
    }

    // Fechar overlay com tecla ESC
    const handleKeydown = (e) => {
      if (e.key === "Escape" && overlayOpen.value) {
        closeOverlay();
      }
    };

    // Adicionar event listener para tecla ESC
    window.addEventListener("keydown", handleKeydown);

    return {
      particleOptions,
      projects,
      filters,
      activeFilter,
      filteredProjects,
      overlayOpen,
      overlayExpanded,
      selectedProject,
      selectedImage,
      visibleProjects,
      loading,
      showLoadMore,
      openProject,
      closeOverlay,
      toggleOverlayExpansion,
      loadMoreProjects,
      getCategoryColor,
      getCategoryLabel,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.portfolio-section {
  position: relative;
  padding: 100px 0;
  background: linear-gradient(135deg, #f9f9f9 0%, #f0f4f8 100%);
  overflow: hidden;

  #portfolio-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
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
    font-size: 3.5rem;
    font-weight: 800;
    color: $dark-color;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;

    span {
      color: $primary-color;
      position: relative;
      z-index: 1;

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
    margin: 0 auto;
    line-height: 1.6;
  }
}

.filter-controls {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 50px;

  .filter-btn {
    background: white;
    border: 2px solid transparent;
    padding: 14px 28px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      transition: left 0.5s ease;
    }

    &:hover::before {
      left: 100%;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
      border-color: $primary-color;
    }

    &.active {
      background: $primary-color;
      color: white;
      box-shadow: 0 8px 25px rgba($primary-color, 0.3);

      .filter-icon {
        color: $secondary-color;
        transform: scale(1.1);
      }
    }

    .filter-icon {
      font-size: 1.2rem;
      transition: all 0.3s ease;
    }
  }
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.portfolio-item {
  position: relative;
  height: 420px;
  perspective: 1000px;
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);

    .project-overlay {
      opacity: 1;
      transform: translateY(0);
    }

    .project-image {
      transform: scale(1.1);
    }
  }
}

.project-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;

  &.front {
    .project-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s ease;
    }

    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to top,
        rgba($dark-color, 0.85) 0%,
        rgba($dark-color, 0.4) 50%,
        transparent 100%
      );
      display: flex;
      align-items: flex-end;
      padding: 30px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s ease;

      .overlay-content {
        color: white;
        width: 100%;

        h3 {
          font-size: 1.8rem;
          margin-bottom: 8px;
          font-weight: 700;
        }

        p {
          font-size: 1.1rem;
          margin-bottom: 20px;
          opacity: 0.9;
        }

        .overlay-actions {
          .quick-view-btn {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 12px 25px;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;

            &:hover {
              background: $primary-color;
              transform: translateX(5px);
            }
          }
        }
      }
    }
  }
}

.project-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 22px;
  border-radius: 20px;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  z-index: 3;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.load-more {
  text-align: center;
  margin-top: 40px;

  .load-btn {
    background: linear-gradient(
      135deg,
      $primary-color 0%,
      darken($primary-color, 10%) 100%
    );
    color: white;
    border: none;
    padding: 16px 45px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 0 auto;
    box-shadow: 0 10px 25px rgba($primary-color, 0.3);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba($primary-color, 0.4);
    }
  }

  .loading-dots {
    display: flex;
    gap: 5px;

    span {
      display: block;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out;

      &:nth-child(1) {
        animation-delay: -0.32s;
      }
      &:nth-child(2) {
        animation-delay: -0.16s;
      }
    }
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Overlay de detalhes do projeto */
.project-overlay-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.overlay-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
}

.overlay-content {
  position: relative;
  background: white;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}

.overlay-content.expanded {
  width: 98%;
  height: 98vh;
  flex-direction: row;
}
.overlay-fade-enter-active .overlay-content,
.overlay-fade-leave-active .overlay-content {
  transition: all 0.4s ease;
}

.overlay-fade-enter-from .overlay-content,
.overlay-fade-leave-to .overlay-content {
  transform: scale(0.95);
  opacity: 0;
}

.overlay-fade-enter-to .overlay-content,
.overlay-fade-leave-from .overlay-content {
  transform: scale(1);
  opacity: 1;
}

.close-overlay {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: $primary-color;
    transform: rotate(90deg);
  }
}

.overlay-body {
  display: flex;
  width: 100%;
  height: 100%;

  .project-gallery {
    flex: 0 0 60%;
    position: relative;

    .main-image {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .expand-toggle {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: $primary-color;
          transform: scale(1.1);
        }
      }
    }

    .image-thumbnails {
      position: absolute;
      bottom: 20px;
      left: 20px;
      display: flex;
      gap: 10px;

      .thumbnail {
        width: 70px;
        height: 70px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        border: 3px solid transparent;
        transition: all 0.3s ease;

        &.active {
          border-color: $primary-color;
          transform: scale(1.1);
        }

        &:hover {
          transform: scale(1.1);
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }

  .project-details {
    flex: 1;
    padding: 40px;
    overflow-y: auto;

    h2 {
      font-size: 2.5rem;
      color: $dark-color;
      margin-bottom: 20px;
      font-weight: 800;
    }

    .project-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: $gray-color;
        font-weight: 500;

        i {
          color: $primary-color;
          font-size: 1.1rem;
        }
      }
    }

    .project-description {
      font-size: 1.1rem;
      line-height: 1.7;
      color: lighten($dark-color, 20%);
      margin-bottom: 30px;
    }

    .project-features {
      margin-bottom: 40px;

      h3 {
        font-size: 1.4rem;
        margin-bottom: 15px;
        color: $dark-color;
        font-weight: 700;
      }

      ul {
        list-style: none;

        li {
          padding: 10px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #f5f5f5;

          i {
            color: $primary-color;
          }
        }
      }
    }

    .project-actions {
      display: flex;
      gap: 15px;

      .cta-btn {
        flex: 1;
        padding: 16px 25px;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 1rem;

        &.primary {
          background: $primary-color;
          color: white;
          border: none;
          box-shadow: 0 8px 20px rgba($primary-color, 0.3);

          &:hover {
            background: darken($primary-color, 10%);
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba($primary-color, 0.4);
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
    }
  }
}

/* Efeitos de transição */
.staggered-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.staggered-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.staggered-fade-enter-from,
.staggered-fade-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

/* Responsividade */
@media (max-width: 1200px) {
  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }

  .overlay-body {
    flex-direction: column;

    .project-gallery {
      flex: 0 0 400px;
    }
  }
}

@media (max-width: 992px) {
  .section-header .section-title {
    font-size: 2.8rem;
  }

  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .portfolio-item {
    height: 380px;
  }

  .overlay-content.expanded {
    width: 98%;
    height: 98vh;

    .project-gallery {
      flex: 0 0 350px;
    }
  }
}

@media (max-width: 768px) {
  .portfolio-section {
    padding: 70px 0;
  }

  .section-header .section-title {
    font-size: 2.3rem;
  }

  .section-header .section-subtitle {
    font-size: 1.1rem;
  }

  .filter-controls {
    gap: 10px;

    .filter-btn {
      padding: 12px 20px;
      font-size: 0.9rem;
    }
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .portfolio-item {
    height: 350px;
  }

  .project-overlay-detail {
    padding: 20px;
  }

  .overlay-content {
    width: 95%;
    flex-direction: column;

    &.expanded {
      height: auto;
      max-height: 90vh;
    }
  }

  .overlay-body .project-gallery {
    flex: 0 0 300px;

    .image-thumbnails {
      position: relative;
      bottom: auto;
      left: auto;
      padding: 15px;
      justify-content: center;
      background: rgba(0, 0, 0, 0.8);

      .thumbnail {
        width: 60px;
        height: 60px;
      }
    }
  }

  .project-details {
    padding: 25px;

    h2 {
      font-size: 2rem;
    }

    .project-actions {
      flex-direction: column;
    }
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 15px;
  }

  .section-header .section-title {
    font-size: 2rem;
  }

  .filter-controls {
    gap: 8px;

    .filter-btn {
      padding: 10px 16px;
      font-size: 0.8rem;

      .filter-icon {
        font-size: 1rem;
      }
    }
  }

  .portfolio-item {
    height: 300px;
  }

  .card-face.front .project-overlay .overlay-content {
    padding: 20px;

    h3 {
      font-size: 1.5rem;
    }
  }

  .project-overlay-detail {
    padding: 10px;
  }

  .overlay-content {
    width: 100%;
    border-radius: 15px;
  }

  .overlay-body .project-gallery {
    flex: 0 0 250px;
  }

  .project-details {
    padding: 20px;

    h2 {
      font-size: 1.7rem;
    }

    .project-meta {
      flex-direction: column;
      gap: 10px;
    }
  }

  .load-btn {
    padding: 14px 30px;
    font-size: 1rem;
  }
}
</style>
