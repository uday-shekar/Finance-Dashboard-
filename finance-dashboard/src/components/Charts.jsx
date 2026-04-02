import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';

// Time-based Data (Last 6 Months)
const lineData = [
  { name: 'Oct', balance: 400000 },
  { name: 'Nov', balance: 450000 },
  { name: 'Dec', balance: 520000 },
  { name: 'Jan', balance: 610000 },
  { name: 'Feb', balance: 750000 },
  { name: 'Mar', balance: 865550 },
];

// Categorical Data (Percentage based)
const pieData = [
  { name: 'Rent', value: 45 },
  { name: 'Food', value: 25 },
  { name: 'Shopping', value: 15 },
  { name: 'Others', value: 15 },
];

const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b'];

/**
 * Balance Trend Area Chart
 * Requirement: Time-based visualization
 */
export const BalanceTrend = ({ darkMode }) => {
  const strokeColor = "#6366f1";
  const gridColor = darkMode ? "#334155" : "#f1f5f9";
  const textColor = "#94a3b8";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
            <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: textColor, fontSize: 12, fontWeight: 500 }} 
          dy={10}
        />
        <YAxis hide domain={['dataMin - 100000', 'auto']} />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '16px', 
            border: 'none', 
            backgroundColor: darkMode ? '#1e293b' : '#fff',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            padding: '12px'
          }}
          itemStyle={{ fontWeight: 'bold', color: strokeColor }}
          formatter={(value) => [`₹${value.toLocaleString()}`, 'Balance']}
        />
        <Area 
          type="monotone" 
          dataKey="balance" 
          stroke={strokeColor} 
          strokeWidth={4} 
          fillOpacity={1} 
          fill="url(#colorBal)" 
          animationDuration={2000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

/**
 * Spending Breakdown Pie Chart
 * Requirement: Categorical visualization
 */
export const SpendingPie = ({ darkMode }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie 
          data={pieData} 
          innerRadius={70} 
          outerRadius={95} 
          paddingAngle={10} 
          dataKey="value"
          stroke="none"
          animationBegin={0}
          animationDuration={1500}
        >
          {pieData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
              style={{ filter: `drop-shadow(0px 4px 6px ${COLORS[index % COLORS.length]}33)` }}
            />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            backgroundColor: darkMode ? '#0f172a' : '#fff',
            fontSize: '12px'
          }}
          formatter={(value) => [`${value}%`, 'Share']}
        />
        <Legend 
          verticalAlign="bottom" 
          iconType="circle" 
          iconSize={8}
          wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};