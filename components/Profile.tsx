
import React, { useContext, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { SettingsContext } from '../contexts/SettingsContext';

const mockProfileData = {
    name: 'NitroTypeHuman',
    testsStarted: 8369,
    testsCompleted: 7787,
    timeTyping: '32:40:12',
    stats: [
        { label: 'all time high', value: 112, sub: '100%' },
        { label: 'avg speed', value: 93, sub: '93%' },
        { label: 'avg raw', value: 84, sub: '94%' },
        { label: 'avg acc', value: 73, sub: '94%' },
        { label: 'consistency', value: 132, sub: '100%' },
        { label: 'last 10 avg', value: 105, sub: '92%' },
        { label: 'last 50 avg', value: 92, sub: '94%' },
    ],
    speedChartData: [
        { name: '1h', speed: 85 }, { name: '2h', speed: 92 }, { name: '3h', speed: 88 },
        { name: '4h', speed: 95 }, { name: '5h', speed: 101 }, { name: '6h', speed: 94 },
    ],
    tests: [
      { wpm: 79.20, acc: '95.59%', raw: 92.73, date: '24 Sep 2025' },
      { wpm: 80.63, acc: '90.19%', raw: 79.80, date: '24 Sep 2025' },
      { wpm: 83.99, acc: '97.25%', raw: 71.81, date: '24 Sep 2025' },
      { wpm: 81.99, acc: '95.37%', raw: 65.54, date: '24 Sep 2025' },
    ]
};

const Profile: React.FC = () => {
    const { settings } = useContext(SettingsContext);
    const [themeColors, setThemeColors] = useState({
        primary: '#000', text: '#000', secondary: '#000', bg: '#fff'
    });

     useEffect(() => {
        const timer = setTimeout(() => {
            const rootStyle = getComputedStyle(document.documentElement);
            const primaryColor = rootStyle.getPropertyValue('--primary-color').trim();
            if (primaryColor) {
                setThemeColors({
                    primary: primaryColor,
                    text: rootStyle.getPropertyValue('--text-color').trim(),
                    secondary: rootStyle.getPropertyValue('--secondary-color').trim(),
                    bg: rootStyle.getPropertyValue('--bg-color').trim(),
                });
            }
        }, 0);
        return () => clearTimeout(timer);
    }, [settings.theme]);

    return (
        <div className="w-full max-w-5xl flex flex-col gap-8 text-theme-text">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-theme-secondary rounded-full"></div>
                    <div>
                        <h2 className="text-2xl text-theme-primary">{mockProfileData.name}</h2>
                        <p>Joined 24 Sep 2025</p>
                    </div>
                </div>
                <div className="flex gap-4 text-center">
                    <div><p className="text-2xl font-bold text-theme-primary">{mockProfileData.testsStarted}</p><p>tests started</p></div>
                    <div><p className="text-2xl font-bold text-theme-primary">{mockProfileData.testsCompleted}</p><p>tests completed</p></div>
                    <div><p className="text-2xl font-bold text-theme-primary">{mockProfileData.timeTyping}</p><p>time typing</p></div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
                {mockProfileData.stats.map(stat => (
                    <div key={stat.label} className="bg-theme-secondary/20 p-4 rounded">
                        <p className="text-3xl font-bold text-theme-primary">{stat.value}</p>
                        <p>{stat.label}</p>
                        <p className="text-sm">{stat.sub}</p>
                    </div>
                ))}
            </div>

            <div className="w-full h-64 mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockProfileData.speedChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={themeColors.secondary} />
                        <XAxis dataKey="name" stroke={themeColors.text} />
                        <YAxis stroke={themeColors.text} />
                        <Tooltip contentStyle={{ backgroundColor: themeColors.bg, border: `1px solid ${themeColors.secondary}` }} itemStyle={{ color: themeColors.primary }}/>
                        <Line type="monotone" dataKey="speed" stroke={themeColors.primary} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-theme-secondary">
                            <th className="p-2">wpm</th>
                            <th className="p-2">acc</th>
                            <th className="p-2">raw</th>
                            <th className="p-2">date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockProfileData.tests.map((test, i) => (
                             <tr key={i} className="border-b border-theme-secondary/50">
                                <td className="p-2 text-theme-primary font-bold">{test.wpm}</td>
                                <td className="p-2">{test.acc}</td>
                                <td className="p-2">{test.raw}</td>
                                <td className="p-2">{test.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Profile;
