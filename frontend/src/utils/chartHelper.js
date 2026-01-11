// Chart Helper used to generate chart data from expenses and used to map the colors of the chart to match the ones from the expenses list
export const CATEGORY_COLORS = {
    Food: '#FFBB28',
    Transport: '#0088FE',
    Utilities: '#00C49F',
    Entertainment: '#FF8042',
    Health: '#AF19FF',
    Other: '#FF4560',
};

export const getChartData = (expenses) => {
    const categoryMap = {};

    expenses.forEach((expense) => {
        if (categoryMap[expense.category]) {
            categoryMap[expense.category] += expense.amount;
        } else {
            categoryMap[expense.category] = expense.amount;
        }
    });

    return Object.keys(categoryMap).map((category) => ({
        name: category,
        value: categoryMap[category],
        color: CATEGORY_COLORS[category] || '#999',
    }));
};