// Expense Chart to display expenses and an a pie chart by category 
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getChartData } from '../utils/chartHelper';

const ExpenseChart = ({ expenses }) => {
    const data = getChartData(expenses);

    // If no expenses, show a message
    if (!expenses || expenses.length === 0) {
        return (
            <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">No expenses for this period</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-8 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4 text-center">Spending by Category</h3>

            <div className="relative w-full h-64">
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `$${value.toFixed(2)}`}
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderColor: '#e5e7eb',
                                    borderRadius: '8px',
                                    color: '#1f2937'
                                }}
                                itemStyle={{ color: '#1f2937' }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ExpenseChart;
