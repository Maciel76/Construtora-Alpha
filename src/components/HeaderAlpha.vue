<template>
  <header class="header-alpha" :class="{ scrolled: isScrolled }">
    <div class="container">
      <!-- Logo com animação -->
      <a href="#" class="logo" @click.prevent="scrollToTop">
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
      </a>

      <!-- Menu principal -->
      <nav class="main-nav" :class="{ active: menuOpen }">
        <ul>
          <li v-for="(item, index) in navItems" :key="index">
            <a
              :href="item.path"
              class="nav-link"
              @click.prevent="scrollToSection(item.path)"
              @mouseenter="startHover(index)"
              @mouseleave="endHover(index)"
            >
              <span class="link-text">{{ item.text }}</span>
              <span
                class="link-underline"
                :style="underlineStyle(index)"
              ></span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Menu mobile -->
      <button class="mobile-toggle" @click="toggleMenu" aria-label="Menu">
        <div class="hamburger" :class="{ active: menuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>

    <!-- Efeito de hover dinâmico -->
    <div class="hover-effect" :style="hoverEffectStyle"></div>
  </header>
</template>

<script>
export default {
  name: "HeaderAlpha",
  data() {
    return {
      isScrolled: false,
      menuOpen: false,
      hoverIndex: null,
      hoverProgress: 0,
      navItems: [
        { text: "Início", path: "#home" },
        { text: "Portfólio", path: "#portfolio" },
        { text: "Lançamentos", path: "#launches" },
        { text: "Tour Virtual", path: "#virtual-tour" },
        { text: "Carreiras", path: "#careers" },
      ],
    };
  },
  computed: {
    hoverEffectStyle() {
      if (this.hoverIndex === null) return { opacity: 0 };

      const width = 100 / this.navItems.length;
      const left = width * this.hoverIndex;

      return {
        width: `${width}%`,
        left: `${left}%`,
        opacity: 1,
        transform: `scaleX(${this.hoverProgress})`,
      };
    },
  },
  methods: {
    startHover(index) {
      this.hoverIndex = index;
      this.hoverProgress = 1;
    },
    endHover(index) {
      this.hoverProgress = 0;
      setTimeout(() => {
        if (this.hoverIndex === index) {
          this.hoverIndex = null;
        }
      }, 300);
    },
    underlineStyle(index) {
      return {
        transform: this.hoverIndex === index ? "scaleX(1)" : "scaleX(0)",
        transitionDelay: this.hoverIndex === index ? "0.1s" : "0s",
      };
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    resetMenu() {
      this.menuOpen = false;
      this.hoverIndex = null;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    scrollToSection(sectionId) {
      this.closeMenu();

      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    scrollToTop() {
      this.resetMenu();
      window.scrollTo({ top: 0, behavior: "smooth" });
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

.header-alpha {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    height: 100px;

    .logo-container {
      transform: scale(0.9);
    }
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  transition: height 0.4s ease;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 1100;

  &-container {
    display: flex;
    align-items: center;
    transition: transform 0.4s ease;
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
    color: $primary-color;
    text-transform: uppercase;
  }

  &-sub {
    font-size: 24px;
    font-weight: 900;
    color: $dark-color;
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
    border: 2px solid $primary-color;

    &.front {
      transform: rotateY(0deg) translateZ(20px);
      background: rgba($primary-color, 0.1);
    }
    &.back {
      transform: rotateY(180deg) translateZ(20px);
      background: rgba($primary-color, 0.1);
    }
    &.left {
      transform: rotateY(-90deg) translateZ(20px);
      background: rgba($primary-color, 0.1);
    }
    &.right {
      transform: rotateY(90deg) translateZ(20px);
      background: rgba($primary-color, 0.1);
    }
    &.top {
      transform: rotateX(90deg) translateZ(20px);
      background: rgba($primary-color, 0.1);
    }
    &.bottom {
      transform: rotateX(-90deg) translateZ(20px);
      background: rgba($primary-color, 0.1);
    }
  }
}

.main-nav {
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0 15px;
    position: relative;
  }

  .nav-link {
    position: relative;
    display: block;
    padding: 10px 5px;
    text-decoration: none;
    color: $dark-color;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;

    &:hover {
      color: $primary-color;
    }
  }

  .link-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: $primary-color;
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.hover-effect {
  position: absolute;
  bottom: 0;
  height: 100%;
  background: rgba($primary-color, 0.05);
  z-index: -1;
  border-radius: 8px;
  transform-origin: left center;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1100;
}

.hamburger {
  position: relative;
  width: 30px;
  height: 20px;

  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: $dark-color;
    transition: all 0.3s ease;

    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
    }
    &:nth-child(3) {
      bottom: 0;
    }
  }

  &.active {
    span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
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

/* Responsividade */
@media (max-width: 992px) {
  .container {
    padding: 0 25px;
    height: 80px;
  }

  .main-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.77, 0.2, 0.05, 1);

    &.active {
      transform: translateY(0);
      opacity: 1;
    }

    ul {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    li {
      margin: 15px 0;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s ease;

      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 0.1s;
        }
      }
    }

    &.active li {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mobile-toggle {
    display: block;
  }

  .hover-effect {
    display: none;
  }
}

@media (max-width: 576px) {
  .logo {
    &-main {
      font-size: 12px;
    }
    &-sub {
      font-size: 20px;
    }
  }

  .container {
    padding: 0 15px;
  }
}
</style>
