<template>
  <footer class="footer-alpha">
    <!-- Efeito de onda no topo do footer -->
    <div class="footer-wave">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
          fill="currentColor"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
          fill="currentColor"
        ></path>
        <path
          d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>

    <div class="container">
      <div class="footer-content">
        <!-- Coluna Sobre com Logo 3D -->
        <div class="footer-about" data-aos="fade-up">
          <router-link to="/" class="logo" @click="resetMenu">
            <div class="logo-container">
              <div class="logo-icon">
                <div class="cube">
                  <div class="face front"></div>
                  <div class="face back"></div>
                  <div class="face left"></div>
                  <div class="face right"></div>
                  <div class="face top"></div>
                  <div class="face bottom"></div>
                </div>
              </div>
              <div class="logo-text">
                <span class="logo-main">CONSTRUTORA</span>
                <span class="logo-sub">ALFA</span>
              </div>
            </div>
          </router-link>

          <p>
            Construindo sonhos, criando legados desde 1990. Excelência em
            construção civil com inovação e qualidade.
          </p>

          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <!-- Coluna Links -->
        <div class="footer-links" data-aos="fade-up" data-aos-delay="100">
          <h4 class="footer-title">Links Rápidos</h4>
          <ul>
            <li>
              <a href="#portfolio"
                ><i class="fas fa-chevron-right"></i> Portfólio</a
              >
            </li>
            <li>
              <a href="#launches"
                ><i class="fas fa-chevron-right"></i> Lançamentos</a
              >
            </li>
            <li>
              <a href="#virtual-tour"
                ><i class="fas fa-chevron-right"></i> Tour Virtual</a
              >
            </li>
            <li>
              <a href="#careers"
                ><i class="fas fa-chevron-right"></i> Trabalhe Conosco</a
              >
            </li>
          </ul>
        </div>

        <!-- Coluna Contato -->
        <div class="footer-contact" data-aos="fade-up" data-aos-delay="150">
          <h4 class="footer-title">Contato</h4>
          <ul>
            <li>
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="contact-info">
                <span>Av. Paulista, 1000</span>
                <span>São Paulo, SP - 01310-100</span>
              </div>
            </li>
            <li>
              <div class="contact-icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div class="contact-info">
                <span>(11) 1234-5678</span>
                <span>(11) 98765-4321</span>
              </div>
            </li>
            <li>
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-info">
                <span>contato@construtoraalfa.com.br</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Coluna Newsletter -->
        <div class="footer-newsletter" data-aos="fade-up" data-aos-delay="200">
          <h4 class="footer-title">Newsletter</h4>
          <p>Receba nossas atualizações e lançamentos em primeira mão</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Seu melhor e-mail" required />
            <button type="submit">
              <i class="fas fa-paper-plane"></i> Assinar
            </button>
          </form>
        </div>
      </div>

      <!-- Rodapé inferior -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>
            &copy; {{ new Date().getFullYear() }} Construtora Alfa. Todos os
            direitos reservados.
          </p>
        </div>

        <div class="footer-legal">
          <a href="#"
            ><i class="fas fa-shield-alt"></i> Política de Privacidade</a
          >
          <a href="#"><i class="fas fa-file-contract"></i> Termos de Uso</a>
        </div>
      </div>
    </div>

    <!-- Botão de voltar ao topo -->
    <button
      class="back-to-top"
      @click="scrollToTop"
      aria-label="Voltar ao topo"
      :class="{ visible: showBackToTop }"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </footer>
</template>

<script>
export default {
  name: "PremiumFooterAlpha",
  data() {
    return {
      showBackToTop: false,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    resetMenu() {
      // Método para consistência com o header
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 300;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.footer-alpha {
  position: relative;
  background-color: $dark-color;
  color: white;
  padding-top: 120px;
  overflow: hidden;

  .footer-wave {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 120px;
    color: $primary-color;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}

.container {
  position: relative;
  max-width: $max-width;
  margin: 0 auto;
  padding: 0 $spacing-unit * 2;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $spacing-unit * 5;
  margin-bottom: $spacing-unit * 6;
}

/* Estilos da Logo 3D (consistentes com o header) */
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: $spacing-unit * 3;

  &-container {
    display: flex;
    align-items: center;
  }

  &-icon {
    position: relative;
    width: 40px;
    height: 40px;
    margin-right: 15px;
    perspective: 1000px;
  }

  &-text {
    display: flex;
    flex-direction: column;
  }

  &-main {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    color: white;
    text-transform: uppercase;
  }

  &-sub {
    font-size: 24px;
    font-weight: 900;
    color: $secondary-color;
    line-height: 1;
    letter-spacing: 1px;
  }
}

.cube {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: rotate 12s infinite linear;

  .face {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid $secondary-color;

    &.front {
      transform: rotateY(0deg) translateZ(20px);
      background: rgba($secondary-color, 0.1);
    }
    &.back {
      transform: rotateY(180deg) translateZ(20px);
      background: rgba($secondary-color, 0.1);
    }
    &.left {
      transform: rotateY(-90deg) translateZ(20px);
      background: rgba($secondary-color, 0.1);
    }
    &.right {
      transform: rotateY(90deg) translateZ(20px);
      background: rgba($secondary-color, 0.1);
    }
    &.top {
      transform: rotateX(90deg) translateZ(20px);
      background: rgba($secondary-color, 0.1);
    }
    &.bottom {
      transform: rotateX(-90deg) translateZ(20px);
      background: rgba($secondary-color, 0.1);
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotateX(-15deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(-15deg) rotateY(360deg);
  }
}

.footer-about {
  p {
    margin-bottom: $spacing-unit * 3;
    line-height: 1.7;
    color: rgba(white, 0.7);
  }
}

.social-links {
  display: flex;
  gap: $spacing-unit * 1.5;
  margin-bottom: $spacing-unit * 4;

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $spacing-unit * 5;
    height: $spacing-unit * 5;
    background-color: rgba(white, 0.08);
    border-radius: 50%;
    color: white;
    font-size: $spacing-unit * 2;
    transition: all 0.3s ease;

    &:hover {
      background-color: $secondary-color;
      color: $dark-color;
      transform: translateY(-3px);
    }
  }
}

.footer-title {
  font-size: 1.3rem;
  margin-bottom: $spacing-unit * 3;
  color: $secondary-color;
  position: relative;
  padding-bottom: $spacing-unit;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: $spacing-unit * 4;
    height: 2px;
    background: linear-gradient(to right, $secondary-color, transparent);
  }
}

.footer-links {
  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: $spacing-unit * 1.5;

      a {
        display: flex;
        align-items: center;
        gap: $spacing-unit;
        color: rgba(white, 0.7);
        text-decoration: none;
        transition: all 0.3s ease;

        i {
          font-size: 0.7rem;
          color: $secondary-color;
          transition: all 0.3s ease;
        }

        &:hover {
          color: white;
          transform: translateX($spacing-unit);

          i {
            color: white;
          }
        }
      }
    }
  }
}

.footer-contact {
  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      gap: $spacing-unit * 1.5;
      margin-bottom: $spacing-unit * 2;

      .contact-icon {
        width: $spacing-unit * 4;
        height: $spacing-unit * 4;
        background-color: rgba($secondary-color, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $secondary-color;
        font-size: $spacing-unit * 1.5;
        flex-shrink: 0;
      }

      .contact-info {
        display: flex;
        flex-direction: column;
        color: rgba(white, 0.7);
        font-size: 0.95rem;

        span {
          line-height: 1.5;
        }
      }
    }
  }
}

.footer-newsletter {
  p {
    color: rgba(white, 0.7);
    margin-bottom: $spacing-unit * 2;
    line-height: 1.6;
  }

  .newsletter-form {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-unit;

    input {
      flex: 1;
      min-width: 200px;
      padding: $spacing-unit * 2;
      border: none;
      border-radius: $spacing-unit/2;
      font-family: inherit;

      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px $secondary-color;
      }
    }

    button {
      padding: $spacing-unit * 2 $spacing-unit * 3;
      background-color: $secondary-color;
      color: $dark-color;
      border: none;
      border-radius: $spacing-unit/2;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: $spacing-unit;

      &:hover {
        background-color: darken($secondary-color, 10%);
      }
    }
  }
}

.footer-bottom {
  border-top: 1px solid rgba(white, 0.1);
  padding: $spacing-unit * 3 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: $spacing-unit * 2;
  color: rgba(white, 0.5);
  font-size: 0.9rem;
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-unit * 2;

  a {
    display: flex;
    align-items: center;
    gap: $spacing-unit;
    color: rgba(white, 0.5);
    text-decoration: none;
    transition: all 0.3s ease;

    i {
      color: $secondary-color;
      font-size: 0.9rem;
    }

    &:hover {
      color: white;
    }
  }
}

.back-to-top {
  position: fixed;
  bottom: $spacing-unit * 3;
  right: $spacing-unit * 3;
  width: $spacing-unit * 5;
  height: $spacing-unit * 5;
  background-color: $secondary-color;
  color: $dark-color;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $spacing-unit * 1.5;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: 0 $spacing-unit $spacing-unit * 2 rgba(0, 0, 0, 0.2);

  &.visible {
    opacity: 1;
    visibility: visible;
  }

  &:hover {
    background-color: darken($secondary-color, 10%);
    transform: translateY(-3px);
  }
}

@media (max-width: $breakpoint-lg) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-unit * 3;
  }

  .footer-about {
    grid-column: 1 / -1;
    text-align: center;

    .logo {
      justify-content: center;
    }

    .social-links {
      justify-content: center;
    }
  }
}

@media (max-width: $breakpoint-md) {
  .footer-alpha {
    padding-top: 80px;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: $spacing-unit * 3;

    .footer-legal {
      justify-content: center;
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-links,
  .footer-contact,
  .footer-newsletter {
    text-align: center;

    .footer-title::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .footer-contact {
    ul li {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: $spacing-unit;
    }
  }

  .back-to-top {
    width: $spacing-unit * 4;
    height: $spacing-unit * 4;
    bottom: $spacing-unit * 2;
    right: $spacing-unit * 2;
  }
}
</style>
