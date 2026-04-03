import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';

// DATA
const lineData = [
  { name: 'Oct', balance: 400000 },
  { name: 'Nov', balance: 450000 },
  { name: 'Dec', balance: 520000 },
  { name: 'Jan', balance: 610000 },
  { name: 'Feb', balance: 750000 },
  { name: 'Mar', balance: 865550 },
];

const pieData = [
  { name: 'Rent', value: 45 },
  { name: 'Food', value: 25 },
  { name: 'Shopping', value: 15 },
  { name: 'Others', value: 15 },
];

const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b'];

/* =======================
   BALANCE TREND CHART
======================= */
export const BalanceTrend = ({ darkMode }) => {

  const strokeColor = "#6366f1";
  const gridColor = darkMode ? "#334155" : "#e2e8f0";
  const textColor = "#94a3b8";

  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={lineData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={gridColor}
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: textColor, fontSize: 11 }}
            dy={8}
          />

          {/*  FIXED DOMAIN BUG */}
          <YAxis
            hide
            domain={[0, 'auto']}
          />

          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: 'none',
              backgroundColor: darkMode ? '#1e293b' : '#fff',
              fontSize: '12px',
              padding: '8px'
            }}
            formatter={(value) => [`₹${value.toLocaleString()}`, 'Balance']}
          />

          <Area
            type="monotone"
            dataKey="balance"
            stroke={strokeColor}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorBal)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};


/* =======================
   SPENDING PIE CHART
======================= */
export const SpendingPie = ({ darkMode }) => {

  return (
    <div className="w-full h-[260px] sm:h-[300px] md:h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <Pie
            data={pieData}
            dataKey="value"
            innerRadius={50}   
            outerRadius={80}
            paddingAngle={5}
            stroke="none"
            animationDuration={1200}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: '10px',
              border: 'none',
              backgroundColor: darkMode ? '#0f172a' : '#fff',
              fontSize: '11px'
            }}
            formatter={(value) => [`${value}%`, 'Share']}
          />

          {/* RESPONSIVE LEGEND */}
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: '10px',
              paddingTop: '10px',
              textTransform: 'uppercase'
            }}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};