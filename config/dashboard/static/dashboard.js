document.addEventListener("DOMContentLoaded", function() {
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const sentimentTiles = document.getElementById("sentimentTiles");
    const donutChart = document.getElementById("donutChart").getContext("2d");

    // Sample data
    const data = [
        { text: "Sample text 1", sentiment: "positive" },
        { text: "Sample text 1.1", sentiment: "positive" },
        { text: "Sample text 2", sentiment: "neutral" },
        { text: "Sample text 3", sentiment: "negative" },
    ];

    // Function to render sentiment tiles based on selected category
    function renderSentimentTiles(category) {
        sentimentTiles.innerHTML = "";
        data.forEach(item => {
            if (category === "all" || item.sentiment === category) {
                const tile = document.createElement("div");
                tile.classList.add("tile", item.sentiment);
                tile.textContent = item.text;
                sentimentTiles.appendChild(tile);
            }
        });
    }

    // Initial render
    renderSentimentTiles("all");

    // Function to calculate sentiment percentages
    function calculateSentimentPercentages() {
        const sentimentCounts = { positive: 0, neutral: 0, negative: 0 };
        data.forEach(item => {
            sentimentCounts[item.sentiment]++;
        });
        const total = data.length;
        return {
            positive: (sentimentCounts.positive / total) * 100,
            neutral: (sentimentCounts.neutral / total) * 100,
            negative: (sentimentCounts.negative / total) * 100,
        };
    }

    // Function to update donut chart
    function updateDonutChart() {
        const sentimentPercentages = calculateSentimentPercentages();
        const donutChartInstance = new Chart(donutChart, {
            type: "doughnut",
            data: {
                labels: ["Positive", "Neutral", "Negative"],
                datasets: [{
                    data: [sentimentPercentages.positive, sentimentPercentages.neutral, sentimentPercentages.negative],
                    backgroundColor: ["lightgreen", "lightgrey", "lightcoral"],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });
    }

    // Initial update of donut chart
    updateDonutChart();

    // Event listener for category change
    categoryRadios.forEach(radio => {
        radio.addEventListener("change", function() {
            const selectedCategory = this.value;
            renderSentimentTiles(selectedCategory);
            updateDonutChart();
        });
    });
});
