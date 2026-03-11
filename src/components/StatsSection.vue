<template>
  <section class="stats">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-icon"><i class="fas fa-eye"></i></div>
          <h3>+1800</h3>
          <p>visitas/mês</p>
        </div>
        <div class="stat-item">
          <div class="stat-icon"><i class="fas fa-user-plus"></i></div>
          <h3>+60</h3>
          <p>leads/mês</p>
        </div>
        <div class="stat-item">
          <div class="stat-icon"><i class="fas fa-clock"></i></div>
          <h3>30 dias</h3>
          <p>prazo médio</p>
        </div>
        <div class="stat-item">
          <div class="stat-icon"><i class="fas fa-building"></i></div>
          <h3>+100</h3>
          <p>projetos concluídos</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "StatsSection",
};
</script>

<style scoped>
.stats {
  background-color: var(--primary, #1a3a6e);
  color: white;
  padding: 60px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: var(--secondary, #e9b949);
  border: 2px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.stat-item:hover .stat-icon {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
  border-color: var(--secondary, #e9b949);
}

.stat-item h3 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--secondary, #e9b949);
}

.stat-item p {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
