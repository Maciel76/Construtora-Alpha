<template>
  <section class="stats">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <h3>+1800</h3>
          <p>visitas/mês</p>
        </div>
        <div class="stat-item">
          <h3>+60</h3>
          <p>leads/mês</p>
        </div>
        <div class="stat-item">
          <h3>30 dias</h3>
          <p>prazo médio</p>
        </div>
        <div class="stat-item">
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
  background-color: var(--primary);
  color: white;
  padding: 60px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  text-align: center;
}

.stat-item h3 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--secondary);
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
