// =====================
// MESSAGE D'ACCUEIL
// =====================
window.onload = function () {
    const banner = document.getElementById("welcome-banner");
    if (banner) {
        banner.style.opacity = "1";
        setTimeout(() => {
            banner.style.opacity = "0";
        }, 3000);
    }

    // Initialiser le radar interactif
    initInteractiveRadar();
};

// =====================
// RADAR INTERACTIF AVEC CHART.JS
// =====================
function initInteractiveRadar() {
    const ctx = document.getElementById("skillsChart").getContext("2d");

    const data = {
        datasets: [{
            label: 'Niveau d’expertise (%)',
            data: [90,85,80,75,85,90],
            fill: true,
            backgroundColor: 'rgba(0, 119, 182, 0.2)',
            borderColor: '#0077b6',
            borderWidth: 3,
            pointBackgroundColor: '#023e8a',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#0077b6',
            pointRadius: 0, // démarrage à 0 pour animation
            pointHoverRadius: 7
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: { color: '#0077b6', font: { size: 14, weight: 'bold' } }
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#0077b6',
                titleColor: '#fff',
                bodyColor: '#fff',
                cornerRadius: 4
            }
        },
        scales: {
            r: {
                angleLines: { color: '#cccccc' },
                grid: { color: '#e0e0e0' },
                suggestedMin: 50,
                suggestedMax: 100,
                pointLabels: { color: '#023e8a', font: { size: 13, weight: 'bold' } }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeOutBounce',
            onProgress: function(animation) {
                const dataset = this.data.datasets[0];
                const progress = animation.currentStep / animation.numSteps;

                // Effet rebond pour les points
                dataset.pointRadius = dataset.data.map(() => 5 + 5*progress);
            },
            onComplete: function() {
                // Faire apparaître les labels après le tracé
                const chart = this;
                chart.data.labels.forEach((label, i) => {
                    const meta = chart.getDatasetMeta(0);
                    const point = meta.data[i];
                    // animation d'opacité
                    point.custom = point.custom || {};
                    point.custom.opacity = 1;
                });
                chart.update();
            }
        }
    };


}
document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".progress-bar");

  bars.forEach(bar => {
    const level = bar.getAttribute("data-level");
    bar.style.width = level + "%";
  });
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".fade-in").forEach(section => {
  observer.observe(section);
});