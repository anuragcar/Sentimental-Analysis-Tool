document.addEventListener("DOMContentLoaded", function () {
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const sentimentTiles = document.getElementById("sentimentTiles");
    const donutChart = document.getElementById("donutChart").getContext("2d");

    // Function to fetch data from the API
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // Return an empty array if there's an error
        }
    }

    // Function to render sentiment tiles based on selected category
    function renderSentimentTiles(category, data) {
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

    // Function to calculate sentiment percentages
    function calculateSentimentPercentages(data) {
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
    function updateDonutChart(data) {
        const sentimentPercentages = calculateSentimentPercentages(data);
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

    // Initial fetch and update
    fetchData("/get_sentiment_data/")
        .then(data => {
            renderSentimentTiles("all", data);
            updateDonutChart(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });

    // Event listener for category change
    categoryRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            const selectedCategory = this.value;
            fetchData("/get_sentiment_data/")
                .then(data => {
                    renderSentimentTiles(selectedCategory, data);
                    updateDonutChart(data);
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        });
    });
});
