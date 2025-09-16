<template>
  <section id="careers" class="careers-section">
    <div class="animated-bg"></div>

    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">
          <span class="title-word">Trabalhe</span>
          <span class="title-word">Conosco</span>
        </h2>
        <p class="section-subtitle">
          Faça parte da nossa equipe <span class="typing-text"></span>
        </p>
        <div class="section-decoration">
          <div class="decoration-line"></div>
          <div class="decoration-dot"></div>
          <div class="decoration-line"></div>
        </div>
      </div>

      <div class="careers-content">
        <div class="careers-info-card" data-aos="fade-right">
          <div class="card-inner" :class="{ flipped: isCardFlipped }">
            <div class="card-front">
              <h3>Oportunidades</h3>
              <p>
                Na Construtora Alfa, valorizamos talentos e oferecemos um
                ambiente de trabalho dinâmico com oportunidades de crescimento.
              </p>
              <div class="flip-trigger" @click="flipCard">
                <i class="fas fa-sync-alt"></i> Ver benefícios
              </div>
            </div>
            <div class="card-back">
              <div class="benefits">
                <h4>Nossos Benefícios</h4>
                <ul>
                  <li
                    v-for="(benefit, index) in benefits"
                    :key="index"
                    :style="{ transitionDelay: `${index * 0.1}s` }"
                  >
                    <i :class="benefit.icon"></i>
                    {{ benefit.text }}
                  </li>
                </ul>
              </div>
              <div class="flip-trigger" @click="flipCard">
                <i class="fas fa-sync-alt"></i> Voltar
              </div>
            </div>
          </div>
        </div>

        <div class="careers-form-wrapper" data-aos="fade-left">
          <div class="form-container">
            <h3>Envie seu currículo</h3>

            <form @submit.prevent="submitForm" class="careers-form">
              <div class="form-group floating-label">
                <input type="text" id="name" v-model="form.name" required />
                <label for="name">Nome completo</label>
                <div class="underline"></div>
              </div>

              <div class="form-group floating-label">
                <input type="email" id="email" v-model="form.email" required />
                <label for="email">E-mail profissional</label>
                <div class="underline"></div>
              </div>

              <div class="form-group floating-label">
                <input type="tel" id="phone" v-model="form.phone" required />
                <label for="phone">Telefone</label>
                <div class="underline"></div>
              </div>

              <div class="form-group select-wrapper">
                <select id="position" v-model="form.position" required>
                  <option value="" disabled selected></option>
                  <option
                    v-for="position in positions"
                    :key="position.value"
                    :value="position.value"
                  >
                    {{ position.label }}
                  </option>
                </select>
                <label for="position">Cargo desejado</label>
                <div class="select-arrow"></div>
              </div>

              <div class="form-group floating-label">
                <textarea id="message" v-model="form.message"></textarea>
                <label for="message">Por que quer trabalhar conosco?</label>
                <div class="underline"></div>
              </div>

              <div class="form-group file-upload">
                <input
                  type="file"
                  id="resume"
                  @change="handleFileUpload"
                  accept=".pdf,.doc,.docx"
                />
                <label for="resume">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>{{
                    form.resume
                      ? form.resume.name
                      : "Anexar currículo (PDF ou DOC)"
                  }}</span>
                </label>
              </div>

              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">Enviar Candidatura</span>
                <span v-else class="loading-spinner"></span>
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <transition name="modal">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <div class="modal-icon" :class="modalStatus">
            <i
              :class="
                modalStatus === 'success'
                  ? 'fas fa-check-circle'
                  : 'fas fa-times-circle'
              "
            ></i>
          </div>
          <h3>{{ modalTitle }}</h3>
          <p>{{ modalMessage }}</p>
          <button @click="closeModal" class="modal-close-btn">Fechar</button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "PremiumCareersSection",
  data() {
    return {
      isCardFlipped: false,
      isSubmitting: false,
      showModal: false,
      modalStatus: "success",
      modalTitle: "",
      modalMessage: "",
      form: {
        name: "",
        email: "",
        phone: "",
        position: "",
        message: "",
        resume: null,
      },
      positions: [
        { value: "engenheiro-civil", label: "Engenheiro Civil" },
        { value: "arquiteto", label: "Arquiteto" },
        { value: "mestre-obra", label: "Mestre de Obras" },
        { value: "auxiliar", label: "Auxiliar de Construção" },
        { value: "estagiario", label: "Estagiário" },
        { value: "outros", label: "Outros" },
      ],
      benefits: [
        { icon: "fas fa-chart-line", text: "Plano de carreira estruturado" },
        { icon: "fas fa-utensils", text: "Vale-refeição/alimentação" },
        { icon: "fas fa-heartbeat", text: "Assistência médica e odontológica" },
        { icon: "fas fa-hand-holding-usd", text: "Participação nos lucros" },
        {
          icon: "fas fa-graduation-cap",
          text: "Programa de capacitação contínua",
        },
      ],
      typingTexts: ["Contratando "],
      currentTypingIndex: 0,
    };
  },
  mounted() {
    this.initTypingEffect();
    this.initCardAnimations();
  },
  methods: {
    initTypingEffect() {
      this.typeText();
    },
    typeText() {
      const typingElement = document.querySelector(".typing-text");
      const text = this.typingTexts[this.currentTypingIndex];
      let i = 0;

      typingElement.textContent = "";
      typingElement.style.width = "0";

      const typingInterval = setInterval(() => {
        if (i < text.length) {
          typingElement.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => this.eraseText(), 1500);
        }
      }, 100);
    },
    eraseText() {
      const typingElement = document.querySelector(".typing-text");
      const text = typingElement.textContent;

      const erasingInterval = setInterval(() => {
        if (text.length > 0) {
          typingElement.textContent = text.substring(0, text.length - 1);
        } else {
          clearInterval(erasingInterval);
          this.currentTypingIndex =
            (this.currentTypingIndex + 1) % this.typingTexts.length;
          setTimeout(() => this.typeText(), 500);
        }
      }, 50);
    },
    initCardAnimations() {
      const benefitsItems = document.querySelectorAll(".card-back li");
      benefitsItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        }, index * 100);
      });
    },
    flipCard() {
      this.isCardFlipped = !this.isCardFlipped;
      if (this.isCardFlipped) {
        setTimeout(this.initCardAnimations, 300);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const validTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        const maxSize = 5 * 1024 * 1024;

        if (!validTypes.includes(file.type)) {
          this.showFeedbackModal(
            "error",
            "Formato inválido",
            "Por favor, envie apenas arquivos PDF ou Word."
          );
          event.target.value = "";
          return;
        }

        if (file.size > maxSize) {
          this.showFeedbackModal(
            "error",
            "Arquivo muito grande",
            "O arquivo deve ser menor que 5MB."
          );
          event.target.value = "";
          return;
        }

        this.form.resume = file;
      }
    },
    async submitForm() {
      this.isSubmitting = true;

      if (!this.validateForm()) {
        this.isSubmitting = false;
        return;
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.showFeedbackModal(
          "success",
          "Candidatura enviada!",
          "Agradecemos seu interesse. Nossa equipe entrará em contato em breve."
        );
        this.resetForm();
      } catch (error) {
        this.showFeedbackModal(
          "error",
          "Erro no envio",
          "Ocorreu um erro ao enviar sua candidatura. Por favor, tente novamente mais tarde."
        );
      } finally {
        this.isSubmitting = false;
      }
    },
    validateForm() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.form.name.trim()) {
        this.showFeedbackModal(
          "error",
          "Campo obrigatório",
          "Por favor, preencha seu nome completo."
        );
        return false;
      }

      if (!emailRegex.test(this.form.email)) {
        this.showFeedbackModal(
          "error",
          "E-mail inválido",
          "Por favor, insira um e-mail válido."
        );
        return false;
      }

      if (!this.form.phone || this.form.phone.replace(/\D/g, "").length < 10) {
        this.showFeedbackModal(
          "error",
          "Telefone inválido",
          "Por favor, insira um telefone válido com DDD."
        );
        return false;
      }

      if (!this.form.position) {
        this.showFeedbackModal(
          "error",
          "Campo obrigatório",
          "Por favor, selecione o cargo desejado."
        );
        return false;
      }

      if (!this.form.resume) {
        this.showFeedbackModal(
          "error",
          "Anexo obrigatório",
          "Por favor, anexe seu currículo."
        );
        return false;
      }

      return true;
    },
    showFeedbackModal(status, title, message) {
      this.modalStatus = status;
      this.modalTitle = title;
      this.modalMessage = message;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    resetForm() {
      this.form = {
        name: "",
        email: "",
        phone: "",
        position: "",
        message: "",
        resume: null,
      };
      document.getElementById("resume").value = "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.careers-section {
  position: relative;
  padding: 100px 0;
  background-color: $light-color;
  overflow: hidden;

  .animated-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      -45deg,
      $light-color,
      lighten($primary-color, 75%),
      $light-color,
      lighten($primary-color, 75%)
    );
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    z-index: 0;
    opacity: 0.5;
  }
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
    font-size: 2.8rem;
    font-weight: 700;
    color: $dark-color;
    margin-bottom: $spacing-unit * 2;

    .title-word {
      display: inline-block;

      &:first-child {
        color: $primary-color;
        margin-right: $spacing-unit * 2;

        &::after {
          content: "";
          position: absolute;
          bottom: $spacing-unit;
          left: 0;
          width: 100%;
          height: $spacing-unit;
          background: rgba($secondary-color, 0.3);
          z-index: -1;
          transform: skewX(-15deg);
        }
      }
    }
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: $gray-color;
    margin-bottom: $spacing-unit * 4;

    .typing-text {
      color: $primary-color;
      font-weight: 400;
      display: inline-block;
      min-width: 180px;
      text-align: left;
      border-right: 2px solid $primary-color;
      animation: blinkCursor 0.7s infinite;
    }
  }

  .section-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-unit * 2;

    .decoration-line {
      width: 60px;
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

.careers-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: $spacing-unit * 5;
}

.careers-info-card {
  perspective: 1000px;
  height: 450px;

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    box-shadow: 0 $spacing-unit * 2 $spacing-unit * 4 rgba(0, 0, 0, 0.1);
    border-radius: $spacing-unit * 1.5;
    background: white;

    &.flipped {
      transform: rotateY(180deg);
    }
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    padding: $spacing-unit * 4;
    display: flex;
    flex-direction: column;
  }

  .card-front {
    h3 {
      font-size: 1.8rem;
      color: $primary-color;
      margin-bottom: $spacing-unit * 3;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -$spacing-unit;
        left: 0;
        width: $spacing-unit * 6;
        height: $spacing-unit/2;
        background: $secondary-color;
      }
    }

    p {
      color: $gray-color;
      line-height: 1.7;
      margin-bottom: $spacing-unit * 4;
      flex-grow: 1;
    }
  }

  .card-back {
    transform: rotateY(180deg);

    .benefits {
      h4 {
        font-size: 1.5rem;
        color: $primary-color;
        margin-bottom: $spacing-unit * 3;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: -$spacing-unit;
          left: 0;
          width: $spacing-unit * 6;
          height: $spacing-unit/2;
          background: $secondary-color;
        }
      }

      ul {
        list-style: none;
        padding: 0;
        flex-grow: 1;

        li {
          margin-bottom: $spacing-unit * 2;
          padding-left: $spacing-unit * 4;
          position: relative;
          color: $dark-color;
          opacity: 0;
          transform: translateX(-$spacing-unit * 2.5);
          transition: all 0.5s ease;

          i {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            color: $secondary-color;
            font-size: 1.1rem;
            width: $spacing-unit * 3;
            text-align: center;
          }
        }
      }
    }
  }

  .flip-trigger {
    display: inline-flex;
    align-items: center;
    gap: $spacing-unit;
    color: $primary-color;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: $spacing-unit * 1.5 0;

    &:hover {
      color: darken($primary-color, 10%);

      i {
        transform: rotate(180deg);
      }
    }

    i {
      transition: transform 0.5s ease;
    }
  }
}

.careers-form-wrapper {
  .form-container {
    background: white;
    padding: $spacing-unit * 4;
    border-radius: $spacing-unit * 1.5;
    box-shadow: 0 $spacing-unit * 2 $spacing-unit * 4 rgba(0, 0, 0, 0.1);
    height: 100%;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: $spacing-unit/2;
      height: 100%;
      background: linear-gradient(to bottom, $primary-color, $secondary-color);
    }

    h3 {
      font-size: 1.6rem;
      color: $primary-color;
      margin-bottom: $spacing-unit * 3;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -$spacing-unit;
        left: 0;
        width: $spacing-unit * 5;
        height: $spacing-unit/2;
        background: $secondary-color;
      }
    }
  }
}

.careers-form {
  .form-group {
    margin-bottom: $spacing-unit * 3;
    position: relative;

    &.floating-label {
      label {
        position: absolute;
        top: $spacing-unit * 2;
        left: 0;
        color: $gray-color;
        transition: all 0.3s ease;
        pointer-events: none;
      }

      input:focus ~ label,
      input:not(:placeholder-shown) ~ label,
      textarea:focus ~ label,
      textarea:not(:placeholder-shown) ~ label {
        top: -$spacing-unit * 2;
        left: 0;
        font-size: 0.8rem;
        color: $primary-color;
      }

      .underline {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: $primary-color;
        transition: width 0.5s ease;
      }

      input:focus ~ .underline,
      textarea:focus ~ .underline {
        width: 100%;
      }
    }

    input,
    textarea {
      width: 100%;
      padding: $spacing-unit * 2 0;
      border: none;
      border-bottom: 1px solid darken($light-color, 10%);
      background: transparent;
      font-size: 1rem;

      &:focus {
        outline: none;
      }
    }

    textarea {
      min-height: $spacing-unit * 12;
      resize: vertical;
    }

    &.select-wrapper {
      position: relative;

      select {
        width: 100%;
        padding: $spacing-unit * 2 0;
        border: none;
        border-bottom: 1px solid darken($light-color, 10%);
        background: transparent;
        appearance: none;
        font-size: 1rem;
        color: $dark-color;

        &:focus {
          outline: none;
          border-bottom-color: $primary-color;
        }

        &:valid ~ label {
          top: -$spacing-unit * 2;
          left: 0;
          font-size: 0.8rem;
          color: $primary-color;
        }
      }

      label {
        position: absolute;
        top: $spacing-unit * 2;
        left: 0;
        color: $gray-color;
        transition: all 0.3s ease;
        pointer-events: none;
      }

      .select-arrow {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: $spacing-unit solid transparent;
        border-right: $spacing-unit solid transparent;
        border-top: $spacing-unit solid $gray-color;
        pointer-events: none;
      }
    }

    &.file-upload {
      input[type="file"] {
        display: none;
      }

      label {
        display: flex;
        align-items: center;
        gap: $spacing-unit;
        padding: $spacing-unit * 2;
        border: 2px dashed darken($light-color, 10%);
        border-radius: $spacing-unit;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          border-color: $primary-color;
          background: rgba($primary-color, 0.05);

          i {
            color: $primary-color;
          }
        }

        i {
          font-size: 1.3rem;
          color: $gray-color;
          transition: all 0.3s ease;
        }

        span {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .submit-btn {
    width: 100%;
    padding: $spacing-unit * 2;
    background: linear-gradient(to right, $primary-color, $secondary-color);
    color: white;
    border: none;
    border-radius: $spacing-unit * 6;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-unit;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    margin-top: $spacing-unit * 2;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 $spacing-unit $spacing-unit * 2 rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .loading-spinner {
      width: $spacing-unit * 2.5;
      height: $spacing-unit * 2.5;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($dark-color, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-container {
    background: white;
    padding: $spacing-unit * 4;
    border-radius: $spacing-unit * 2;
    max-width: 450px;
    width: 90%;
    text-align: center;
    animation: modalEnter 0.4s ease-out;

    .modal-icon {
      font-size: 3.5rem;
      margin-bottom: $spacing-unit * 3;

      &.success {
        color: darken($secondary-color, 10%);
      }

      &.error {
        color: #e74c3c;
      }
    }

    h3 {
      font-size: 1.6rem;
      margin-bottom: $spacing-unit * 2;
      color: $dark-color;
    }

    p {
      color: $gray-color;
      line-height: 1.6;
      margin-bottom: $spacing-unit * 3;
    }

    .modal-close-btn {
      padding: $spacing-unit * 1.5 $spacing-unit * 3;
      background: $primary-color;
      color: white;
      border: none;
      border-radius: $spacing-unit * 6;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: darken($primary-color, 10%);
      }
    }
  }
}

/* Animações */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: translateY($spacing-unit * 4);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blinkCursor {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: $primary-color;
  }
}

/* Responsividade */
@media (max-width: $breakpoint-lg) {
  .careers-content {
    grid-template-columns: 1fr;
  }

  .careers-info-card {
    height: auto;
    margin-bottom: $spacing-unit * 5;

    .card-inner {
      transform: none !important;
      height: auto;
    }

    .card-front,
    .card-back {
      position: relative;
      height: auto;
      backface-visibility: visible;
      transform: none;
    }

    .card-back {
      display: none;
    }

    &.flipped {
      .card-front {
        display: none;
      }
      .card-back {
        display: flex;
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .section-header {
    margin-bottom: $spacing-unit * 6;

    .section-title {
      font-size: 2.2rem;
    }
  }

  .careers-form-wrapper .form-container {
    padding: $spacing-unit * 3 $spacing-unit * 2;
  }
}

@media (max-width: $breakpoint-sm) {
  .careers-section {
    padding: $spacing-unit * 8 0;
  }

  .section-header {
    .section-title {
      font-size: 1.8rem;
    }

    .section-subtitle {
      font-size: 1rem;
    }
  }

  .careers-info-card,
  .careers-form-wrapper .form-container {
    padding: $spacing-unit * 2 $spacing-unit * 1.5;
  }
}
</style>
