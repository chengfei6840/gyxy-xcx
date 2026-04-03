/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  User, 
  Search, 
  ChevronDown, 
  Bell, 
  AlertTriangle, 
  Thermometer, 
  BarChart3, 
  Settings, 
  FileText, 
  ClipboardList, 
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Info,
  Bookmark,
  HeartPlus,
  ChevronRight,
  RotateCcw,
  CalendarRange,
  SlidersHorizontal,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  Legend,
  ReferenceLine,
} from 'recharts';
import { cn } from './lib/utils';
import { MOCK_STATIONS, type Station } from './types';

// --- Components ---

const TabBar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-2 px-4 z-50">
    <button 
      onClick={() => setActiveTab('home')}
      className={cn("flex flex-col items-center gap-1", activeTab === 'home' ? "text-teal-600" : "text-gray-400")}
    >
      <LayoutDashboard size={24} />
      <span className="text-[10px]">首页</span>
    </button>
    <button 
      onClick={() => setActiveTab('station')}
      className={cn("flex flex-col items-center gap-1", activeTab === 'station' ? "text-teal-600" : "text-gray-400")}
    >
      <Zap size={24} />
      <span className="text-[10px]">电站</span>
    </button>
    <button 
      onClick={() => setActiveTab('mine')}
      className={cn("flex flex-col items-center gap-1", activeTab === 'mine' ? "text-teal-600" : "text-gray-400")}
    >
      <User size={24} />
      <span className="text-[10px]">我的</span>
    </button>
  </div>
);

const StatItem = ({ label, value, color = "text-gray-900" }: { label: string, value: string | number, color?: string, key?: React.Key }) => (
  <div className="flex flex-col items-center">
    <span className="text-xs text-gray-500 mb-1">{label}</span>
    <span className={cn("text-lg font-semibold", color)}>{value}</span>
  </div>
);

const FunctionIcon = ({ icon: Icon, label, color }: { icon: any, label: string, color: string, key?: React.Key }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm", color)}>
      <Icon size={24} />
    </div>
    <span className="text-xs text-gray-600">{label}</span>
  </div>
);

// --- Pages ---

const STATION_SUBTITLE: Record<'om' | 'monitoring', string> = {
  om: '电站运维',
  monitoring: '配电房监测',
};

const HomePage = ({
  onNavigate,
  onHomeSegmentChange,
}: {
  onNavigate: (page: string, params?: any) => void;
  onHomeSegmentChange?: (segment: 'om' | 'monitoring') => void;
}) => {
  const [activeTopTab, setActiveTopTab] = useState<'om' | 'monitoring'>('monitoring');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    onHomeSegmentChange?.(activeTopTab);
  }, [activeTopTab, onHomeSegmentChange]);

  const stats = [
    { label: '全部', value: 154 },
    { label: '在线', value: 2, color: 'text-teal-600' },
    { label: '离线', value: 151, color: 'text-gray-400' },
    { label: '报警', value: 1, color: 'text-red-500' },
  ];

  const monitoringFunctions = [
    { icon: LayoutDashboard, label: '整站监控', color: 'bg-teal-500', action: () => onNavigate('wholeStationMonitor', { mode: activeTopTab }) },
    {
      icon: Zap,
      label: '单站监控',
      color: 'bg-blue-500',
      action: () => onNavigate('stationDetail', { id: '1', from: 'home', mode: activeTopTab }),
    },
    {
      icon: Bell,
      label: '告警数据',
      color: 'bg-orange-500',
      action: () => onNavigate('alarms', { mode: activeTopTab }),
    },
    {
      icon: BarChart3,
      label: '历史曲线',
      color: 'bg-purple-500',
      action: () => onNavigate('curves', { mode: activeTopTab }),
    },
  ];

  const omFunctions = [
    { icon: ClipboardList, label: '项目概览', color: 'bg-teal-500' },
    { icon: MapPin, label: '电站地图', color: 'bg-blue-500' },
    { icon: Bell, label: '报警中心', color: 'bg-red-500' },
    { icon: FileText, label: '报修申请', color: 'bg-orange-500' },
    { icon: BarChart3, label: '报修进度', color: 'bg-indigo-500' },
    { icon: ClipboardList, label: '巡检任务', color: 'bg-teal-600' },
    { icon: FileText, label: '巡检记录', color: 'bg-blue-600' },
    { icon: AlertTriangle, label: '智能预警', color: 'bg-orange-600' },
    { icon: Bell, label: '组串告警', color: 'bg-red-600' },
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 pt-8 text-center relative">
        <h1 className="text-lg font-medium">首页</h1>
        <div className="absolute right-4 top-8 flex gap-2">
          <div className="bg-black/20 rounded-full px-3 py-1 flex items-center gap-2 text-xs">
            <span>•••</span>
            <div className="w-[1px] h-3 bg-white/30" />
            <div className="w-3 h-3 rounded-full border-2 border-white" />
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="bg-white py-4 grid grid-cols-4 border-b border-gray-50">
        {stats.map(s => <StatItem key={s.label} label={s.label} value={s.value} color={s.color} />)}
      </div>

      {/* Revenue/Power Card */}
      <div className="bg-white p-6 mt-2 relative overflow-hidden">
        <div className="text-xs text-gray-400 mb-2">当日总收益</div>
        <div className="text-4xl font-bold text-gray-900 mb-6">108.00<span className="text-xl ml-1">元</span></div>
        
        <div className="grid grid-cols-3 gap-4 border-t border-dashed border-gray-100 pt-4">
          <div>
            <div className="text-[10px] text-gray-400 mb-1">当月总收益</div>
            <div className="text-sm font-semibold">10359.60 元</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 mb-1">当年总收益</div>
            <div className="text-sm font-semibold">2.90 万元</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 mb-1">累计总收益</div>
            <div className="text-sm font-semibold">2.90 万元</div>
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mt-4">
          <div className={cn("w-1.5 h-1.5 rounded-full", currentSlide === 0 ? "bg-teal-500" : "bg-gray-200")} />
          <div className={cn("w-1.5 h-1.5 rounded-full", currentSlide === 1 ? "bg-teal-500" : "bg-gray-200")} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white mt-2 border-b border-gray-100">
        <button 
          onClick={() => {
            setActiveTopTab('om');
            onHomeSegmentChange?.('om');
          }}
          className={cn("flex-1 py-3 text-sm font-medium relative", activeTopTab === 'om' ? "text-teal-600" : "text-gray-500")}
        >
          电站运维
          {activeTopTab === 'om' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-teal-600" />}
        </button>
        <button 
          onClick={() => {
            setActiveTopTab('monitoring');
            onHomeSegmentChange?.('monitoring');
          }}
          className={cn("flex-1 py-3 text-sm font-medium relative", activeTopTab === 'monitoring' ? "text-teal-600" : "text-gray-500")}
        >
          配电房监测
          {activeTopTab === 'monitoring' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-teal-600" />}
        </button>
      </div>

      {/* Function Grid */}
      <div className="bg-white p-6 min-h-[300px]">
        <div className="grid grid-cols-3 gap-y-8">
          {activeTopTab === 'monitoring' ? (
            monitoringFunctions.map(f => (
              <button key={f.label} onClick={f.action}>
                <FunctionIcon icon={f.icon} label={f.label} color={f.color} />
              </button>
            ))
          ) : (
            omFunctions.map(f => (
              <FunctionIcon key={f.label} icon={f.icon} label={f.label} color={f.color} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const MinePage = () => {
  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="bg-teal-600 text-white px-4 pt-8 pb-20 relative">
        <div className="absolute right-4 top-8 flex gap-2">
          <div className="bg-black/20 rounded-full px-3 py-1 flex items-center gap-2 text-xs">
            <span>•••</span>
            <div className="w-[1px] h-3 bg-white/30" />
            <div className="w-3 h-3 rounded-full border-2 border-white" />
          </div>
        </div>
        <h1 className="text-center text-lg font-medium mb-6">我的</h1>
        <button
          type="button"
          className="flex items-center gap-3 w-full text-left active:opacity-90"
        >
          <img
            src="https://picsum.photos/seed/solar-avatar/120/120"
            alt=""
            className="w-14 h-14 rounded-full object-cover border-2 border-white/40 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-base truncate">轨物通用测试</div>
            <div className="text-sm text-white/85 mt-0.5">超级管理员</div>
          </div>
          <ChevronRight size={22} className="text-white/80 shrink-0" />
        </button>
      </div>

      <div className="px-3 -mt-14 relative z-10 space-y-3">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="px-1">
              <div className="text-base font-semibold text-gray-900 tabular-nums">76.000</div>
              <div className="text-[11px] text-teal-600 mt-1.5 leading-tight">日发电量(kWh)</div>
            </div>
            <div className="px-1 border-l border-r border-gray-100">
              <div className="text-base font-semibold text-gray-900 tabular-nums">8295.000</div>
              <div className="text-[11px] text-teal-600 mt-1.5 leading-tight">月发电量(kWh)</div>
            </div>
            <div className="px-1">
              <div className="text-base font-semibold text-gray-900 tabular-nums">96.543</div>
              <div className="text-[11px] text-teal-600 mt-1.5 leading-tight">年发电量(MWh)</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 active:bg-gray-50"
          >
            <Bookmark className="text-teal-600 shrink-0" size={22} strokeWidth={2} />
            <span className="flex-1 text-left text-sm text-gray-900">电站收藏夹</span>
            <ChevronRight className="text-gray-300 shrink-0" size={20} />
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50"
          >
            <HeartPlus className="text-teal-600 shrink-0" size={22} strokeWidth={2} />
            <span className="flex-1 text-left text-sm text-gray-900">设备收藏夹</span>
            <ChevronRight className="text-gray-300 shrink-0" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const MONITOR_FILTERS = ['全部', '温度异常', '电流不平衡', '电压不平衡'] as const;

function monitorCardFilter(s: Station, filter: (typeof MONITOR_FILTERS)[number]): boolean {
  if (filter === '全部') return true;
  if (filter === '温度异常') return s.maxTemp >= 60 || s.status === '异常';
  if (filter === '电流不平衡') return s.currentUnbalance > 10;
  if (filter === '电压不平衡') return s.voltageUnbalance > 3;
  return true;
}

function cardMetricTempClass(t: number, offline: boolean) {
  if (offline) return 'text-gray-400';
  if (t >= 75) return 'text-red-600 font-semibold';
  if (t >= 60) return 'text-orange-500 font-semibold';
  return 'text-gray-900';
}

function cardMetricUnbalanceClass(v: number, hi: number, offline: boolean) {
  if (offline) return 'text-gray-400';
  if (v >= hi) return 'text-red-600 font-semibold';
  if (v >= hi * 0.55) return 'text-orange-500 font-semibold';
  return 'text-gray-900';
}

const TEMP_HIST_DATA = [
  { range: '20-40℃', count: 45, fill: '#3b82f6' },
  { range: '40-60℃', count: 62, fill: '#3b82f6' },
  { range: '60-75℃', count: 18, fill: '#3b82f6' },
  { range: '75℃+', count: 3, fill: '#ef4444' },
];

const WholeStationMonitorPage = ({
  params,
  onNavigate,
}: {
  params?: { mode?: 'om' | 'monitoring' } | null;
  onNavigate: (page: string, params?: any) => void;
}) => {
  const mode = params?.mode ?? 'monitoring';
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<(typeof MONITOR_FILTERS)[number]>('全部');

  const filtered = MOCK_STATIONS.filter(
    s => s.name.includes(search.trim()) && monitorCardFilter(s, filter),
  );

  const imbalanceRank = [...MOCK_STATIONS]
    .filter(s => s.status !== '离线')
    .sort((a, b) => b.currentUnbalance - a.currentUnbalance)
    .slice(0, 5)
    .map(s => ({ name: s.name, value: s.currentUnbalance }));

  const onlineStations = MOCK_STATIONS.filter(s => s.status !== '离线');
  const totalKw = onlineStations.reduce((a, s) => a + s.currentPower, 0);
  const realtimeMw = (totalKw / 1000).toFixed(1);
  /** 演示用装机规模：按电站数量折算 MWp（与接口对接后可改为真实汇总） */
  const installedMwp = (MOCK_STATIONS.length * 14.23).toFixed(1);
  const alarmLines = MOCK_STATIONS.filter(
    s =>
      s.status === '离线' ||
      s.status === '异常' ||
      s.maxTemp >= 75 ||
      s.currentUnbalance > 15 ||
      s.voltageUnbalance > 3,
  ).map(s => {
    if (s.status === '离线') return `${s.name}通讯中断`;
    if (s.maxTemp >= 75) return `${s.name}温度超限`;
    return `${s.name}运行异常`;
  });

  const renderStationCard = (s: Station) => {
    const offline = s.status === '离线';
    const showAlarmRibbon =
      s.status === '异常' || s.maxTemp >= 75 || s.currentUnbalance > 15;
    const healthy =
      s.status === '正常' &&
      s.maxTemp < 75 &&
      s.currentUnbalance < 15 &&
      s.voltageUnbalance <= 3;

    return (
      <motion.div
        key={s.id}
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="button"
        tabIndex={0}
        onClick={() => onNavigate('stationDetail', { id: s.id, from: 'wholeStationMonitor', mode })}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ')
            onNavigate('stationDetail', { id: s.id, from: 'wholeStationMonitor', mode });
        }}
        className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 relative overflow-hidden text-left w-full cursor-pointer active:opacity-90"
      >
        {showAlarmRibbon && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-medium px-3 py-1 rounded-bl-lg z-10">
            告警
          </div>
        )}
        <div className={cn('flex items-start justify-between gap-2', showAlarmRibbon && 'pr-10')}>
          <h3 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2 flex-1">
            {s.name}
          </h3>
          {healthy && !offline ? (
            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
          ) : offline ? (
            <AlertTriangle size={18} className="text-gray-400 shrink-0" />
          ) : (
            <AlertTriangle size={18} className="text-red-500 shrink-0" />
          )}
        </div>
        <span className="inline-block mt-1.5 text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
          {s.type}
        </span>
        <div className="grid grid-cols-3 gap-1.5 text-center mt-3 mb-2">
          <div>
            <div className="text-[9px] text-gray-400">最高温</div>
            <div className={cn('text-[11px]', cardMetricTempClass(s.maxTemp, offline))}>
              {offline ? '—' : `${s.maxTemp}℃`}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-gray-400">电流不平衡</div>
            <div
              className={cn(
                'text-[11px]',
                cardMetricUnbalanceClass(s.currentUnbalance, 15, offline),
              )}
            >
              {offline ? '—' : `${s.currentUnbalance}%`}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-gray-400">电压不平衡</div>
            <div
              className={cn(
                'text-[11px]',
                cardMetricUnbalanceClass(s.voltageUnbalance, 4, offline),
              )}
            >
              {offline ? '—' : `${s.voltageUnbalance}%`}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-[10px] pt-2 border-t border-gray-50 text-gray-500">
          <span>
            当前功率 <span className="text-blue-600 font-medium">{s.currentPower} kW</span>
          </span>
          <span>
            当日发电 <span className="text-blue-600 font-medium">{s.dailyGeneration} kWh</span>
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <div className="bg-teal-600 p-4 pt-8 flex items-center text-white">
        <button type="button" onClick={() => onNavigate('home')} className="p-1 -ml-1 shrink-0">
          <ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-lg font-medium pr-6">整站监控</h1>
      </div>

      <div className="p-3 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-lg border border-gray-100 p-2 shadow-sm flex items-start gap-1.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
              <Globe className="text-sky-600" size={16} strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] text-gray-500 leading-tight">电站总规模</div>
              <div className="text-sm font-bold text-gray-900 leading-tight mt-0.5">
                {MOCK_STATIONS.length}
                <span className="text-[9px] font-normal text-gray-600">
                  {' '}
                  个 / {installedMwp}MWp
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-2 shadow-sm flex items-start gap-1.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Zap className="text-emerald-600" size={16} strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] text-gray-500 leading-tight">实时总功率</div>
              <div className="text-sm font-bold text-gray-900 leading-tight mt-0.5">
                {realtimeMw}
                <span className="text-[9px] font-normal text-gray-600"> MW</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-2 shadow-sm min-w-0 flex flex-col">
            <div className="text-[9px] text-gray-500 leading-tight mb-1 shrink-0">告警动态</div>
            {alarmLines.length > 0 ? (
              <div className="relative min-h-[2.5rem] max-h-[2.5rem] overflow-hidden">
                <div
                  className="alarm-ticker-track flex flex-col gap-1"
                  style={{
                    animationDuration: `${Math.max(alarmLines.length * 3.5, 6)}s`,
                  }}
                >
                  {[...alarmLines, ...alarmLines].map((line, i) => (
                    <p
                      key={`${line}-${i}`}
                      className="text-[9px] text-red-600 leading-snug shrink-0 line-clamp-2 min-h-[2.25rem]"
                    >
                      <span className="mr-0.5">•</span>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[9px] text-gray-400 leading-snug min-h-[2.5rem] flex items-center">
                暂无告警
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
            <h4 className="text-xs font-bold text-gray-900 mb-2">温升分布直方图</h4>
            <div className="h-44 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TEMP_HIST_DATA} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="range" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {TEMP_HIST_DATA.map((e, i) => (
                      <Cell key={`cell-${i}`} fill={e.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
            <h4 className="text-xs font-bold text-gray-900 mb-2">三相电流不平衡排行榜 Top 5</h4>
            <div className="h-52 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={imbalanceRank}
                  margin={{ top: 4, right: 12, left: 4, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                  <XAxis type="number" tick={{ fontSize: 9 }} domain={[0, 'auto']} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={118}
                    tick={{ fontSize: 9 }}
                    interval={0}
                  />
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                  <Bar dataKey="value" fill="#f97316" radius={[0, 4, 4, 0]} name="%" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="search"
              placeholder="搜索电站名称..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-2 text-xs outline-none focus:border-teal-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {MONITOR_FILTERS.map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  'shrink-0 px-3 py-1.5 rounded-full text-xs border transition-colors',
                  filter === f
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-gray-600 border-gray-200',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {filtered.map(s => renderStationCard(s))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-sm text-gray-400 py-10">暂无符合条件的电站</div>
        )}
      </div>
    </div>
  );
};

const StationListPage = ({
  params,
  onNavigate,
}: {
  params?: { mode?: 'om' | 'monitoring' } | null;
  onNavigate: (page: string, params?: any) => void;
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('全部');

  const filteredStations = MOCK_STATIONS.filter(s => 
    s.name.includes(search) && (filter === '全部' || s.status === filter)
  );

  const mode = params?.mode;
  const subtitle = mode && mode in STATION_SUBTITLE ? STATION_SUBTITLE[mode] : null;
  const isMonitoringList = mode === 'monitoring';

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="bg-teal-600 p-4 pt-8">
        <div className="text-center mb-4">
          <h1 className="text-white text-lg font-medium">电站</h1>
          {subtitle ? (
            <p className="text-white/60 text-xs mt-1 font-normal">{subtitle}</p>
          ) : null}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索" 
            className="w-full bg-white rounded-full py-2 pl-10 pr-4 text-sm outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-4 text-white/80 text-xs px-2">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-white">154</span>
            <span>全部</span>
            <div className="h-0.5 w-full bg-white mt-1" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">2</span>
            <span>在线</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">151</span>
            <span>离线</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">1</span>
            <span>报警</span>
          </div>
        </div>
      </div>

      {!isMonitoringList && (
        <div className="flex gap-2 p-3 bg-white border-b border-gray-100">
          <button className="flex-1 bg-gray-100 rounded py-1.5 px-3 text-xs flex items-center justify-between">
            电站名称... <ChevronDown size={14} />
          </button>
          <button className="flex-1 bg-gray-100 rounded py-1.5 px-3 text-xs flex items-center justify-between">
            当日电量... <ChevronDown size={14} />
          </button>
          <button className="flex-1 bg-gray-100 rounded py-1.5 px-3 text-xs flex items-center justify-between">
            筛选 <ChevronDown size={14} />
          </button>
        </div>
      )}

      <div className="p-3 space-y-3">
        {filteredStations.map(s => (
          <motion.div 
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onNavigate('stationDetail', { id: s.id, from: 'station' })}
            className="bg-white rounded-lg p-4 flex gap-4 shadow-sm relative overflow-hidden"
          >
            {s.status === '异常' && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg">
                异常
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={16} className="text-teal-500" />
                <h3 className="font-bold text-gray-900">{s.name}</h3>
              </div>
              {isMonitoringList ? (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-[10px] text-gray-400">最高温度</div>
                    <div
                      className={cn(
                        'text-xs font-medium',
                        s.status === '离线'
                          ? 'text-gray-400'
                          : s.maxTemp >= 75
                            ? 'text-red-600'
                            : s.maxTemp >= 60
                              ? 'text-orange-500'
                              : 'text-gray-900',
                      )}
                    >
                      {s.status === '离线' ? '—' : `${s.maxTemp}℃`}
                    </div>
                  </div>
                  <div className="border-l border-gray-100 pl-2">
                    <div className="text-[10px] text-gray-400">最大电流不平衡</div>
                    <div
                      className={cn(
                        'text-xs font-medium',
                        s.status === '离线'
                          ? 'text-gray-400'
                          : s.currentUnbalance > 15
                            ? 'text-red-600'
                            : s.currentUnbalance > 8
                              ? 'text-orange-500'
                              : 'text-gray-900',
                      )}
                    >
                      {s.status === '离线' ? '—' : `${s.currentUnbalance}%`}
                    </div>
                  </div>
                  <div className="border-l border-gray-100 pl-2">
                    <div className="text-[10px] text-gray-400">最大电压不平衡</div>
                    <div
                      className={cn(
                        'text-xs font-medium',
                        s.status === '离线'
                          ? 'text-gray-400'
                          : s.voltageUnbalance > 4
                            ? 'text-red-600'
                            : s.voltageUnbalance > 2
                              ? 'text-orange-500'
                              : 'text-gray-900',
                      )}
                    >
                      {s.status === '离线' ? '—' : `${s.voltageUnbalance}%`}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-[10px] text-gray-400">当日电量</div>
                    <div className="text-xs font-medium">{s.dailyGeneration}kWh</div>
                  </div>
                  <div className="border-l border-gray-100 pl-2">
                    <div className="text-[10px] text-gray-400">实时功率</div>
                    <div className="text-xs font-medium">{s.currentPower}KW</div>
                  </div>
                  <div className="border-l border-gray-100 pl-2">
                    <div className="text-[10px] text-gray-400">装机容量</div>
                    <div className="text-xs font-medium">{s.type === '自发自用' ? '6537.20kWp' : '2000.00kWp'}</div>
                  </div>
                </div>
              )}
            </div>
            <img 
              src={s.image} 
              alt={s.name} 
              className="w-24 h-18 object-cover rounded-md"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StationDetailPage = ({ params, onBack }: { params: any, onBack: () => void }) => {
  const [selectedStationId, setSelectedStationId] = useState(
    params?.id ?? MOCK_STATIONS[0].id,
  );

  useEffect(() => {
    setSelectedStationId(params?.id ?? MOCK_STATIONS[0].id);
  }, [params?.id]);

  const station = MOCK_STATIONS.find(s => s.id === selectedStationId) || MOCK_STATIONS[0];

  const unbalanceData = [
    { name: '电压 (V)', a: 220.5, b: 219.8, c: 221.2 },
    { name: '电流 (A)', a: 12.5, b: 12.2, c: 12.8 },
    { name: '有功功率 (kW)', a: 2.5, b: 2.4, c: 2.6 },
  ];

  const statsGrid = (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
          <Thermometer size={14} /> 最高温度
        </div>
        <div className={cn('text-xl font-bold', station.maxTemp > 75 ? 'text-red-500' : 'text-gray-900')}>
          {station.status === '离线' ? '—' : `${station.maxTemp} ℃`}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
          <AlertTriangle size={14} /> 电流不平衡率
        </div>
        <div
          className={cn(
            'text-xl font-bold',
            station.currentUnbalance > 15 ? 'text-red-500' : 'text-gray-900',
          )}
        >
          {station.status === '离线' ? '—' : `${station.currentUnbalance} %`}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
          <AlertTriangle size={14} /> 电压不平衡率
        </div>
        <div
          className={cn(
            'text-xl font-bold',
            station.voltageUnbalance > 4 ? 'text-red-500' : 'text-gray-900',
          )}
        >
          {station.status === '离线' ? '—' : `${station.voltageUnbalance} %`}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
          <Info size={14} /> 功率因素
        </div>
        <div className="text-xl font-bold text-gray-900">
          {station.status === '离线' ? '—' : '0.985'}
        </div>
      </div>
    </div>
  );

  const overviewCard = (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4 gap-2">
        <h3 className="font-bold text-gray-900 shrink-0">配电房概况</h3>
        <div className="relative min-w-0 max-w-[58%]">
          <select
            value={selectedStationId}
            onChange={e => setSelectedStationId(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-200 rounded-lg py-1.5 pl-2 pr-7 text-xs text-teal-600 font-medium outline-none truncate"
          >
            {MOCK_STATIONS.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-teal-600 pointer-events-none"
          />
        </div>
      </div>
      <div className="flex justify-around py-2">
        <div className="text-center">
          <div className="text-[10px] text-gray-400 mb-1">当前状态</div>
          <div
            className={cn(
              'text-sm font-semibold',
              station.status === '正常'
                ? 'text-teal-600'
                : station.status === '异常'
                  ? 'text-red-500'
                  : 'text-gray-400',
            )}
          >
            {station.status}
          </div>
        </div>
        <div className="w-[1px] h-8 bg-gray-100 self-center" />
        <div className="text-center">
          <div className="text-[10px] text-gray-400 mb-1">当前功率</div>
          <div className="text-sm font-semibold text-gray-900">{station.currentPower} kW</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-[10px] text-gray-400 mb-1">当月发电量</div>
          <div className="text-sm font-semibold text-gray-900">
            {station.monthlyGenerationKwh.toLocaleString()} kWh
          </div>
        </div>
        <div className="text-center border-l border-gray-100">
          <div className="text-[10px] text-gray-400 mb-1">当月上网电量</div>
          <div className="text-sm font-semibold text-gray-900">
            {station.monthlyGridExportKwh.toLocaleString()} kWh
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="bg-teal-600 p-4 pt-8 flex items-center text-white">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-lg font-medium pr-6">单站监控</h1>
      </div>

      <div className="p-4 space-y-4">
        {overviewCard}
        {statsGrid}

        {/* Temperature Monitoring */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">并网柜测温监控</h3>
          <div className="space-y-4">
            {['进线 1', '出线 1'].map((line, i) => {
              const cTemp = i === 0 ? 76.8 : 40.1;
              return (
                <div key={line} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="text-xs font-medium text-gray-600 mb-2">{line}</div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-[10px] text-gray-400">A相</div>
                      <div className="text-sm font-mono">
                        {station.status === '离线' ? '—' : `${i === 0 ? 42.5 : 38.2}℃`}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-gray-400">B相</div>
                      <div className="text-sm font-mono">
                        {station.status === '离线' ? '—' : `${i === 0 ? 43.1 : 39.5}℃`}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-gray-400">C相</div>
                      <div
                        className={cn(
                          'text-sm font-mono',
                          station.status !== '离线' && cTemp > 75 && 'text-red-500',
                        )}
                      >
                        {station.status === '离线' ? '—' : `${cTemp}℃`}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unbalance Table */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">三相不平衡数据</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400 border-b border-gray-50">
                  <th className="text-left py-2 font-normal">参数类型</th>
                  <th className="py-2 font-normal">A相</th>
                  <th className="py-2 font-normal">B相</th>
                  <th className="py-2 font-normal">C相</th>
                </tr>
              </thead>
              <tbody>
                {unbalanceData.map(row => (
                  <tr key={row.name} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 text-gray-600">{row.name}</td>
                    <td className="py-3 text-center font-mono">{row.a}</td>
                    <td className="py-3 text-center font-mono">{row.b}</td>
                    <td className="py-3 text-center font-mono">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

type AlarmRecord = {
  id: string;
  stationName: string;
  monitorPoint: string;
  content: string;
  alarmValue: string;
  status: '未处理' | '已处理';
  alarmTime: string;
  processTime: string | null;
};

const MOCK_ALARM_ROWS: AlarmRecord[] = [
  {
    id: '1',
    stationName: '宁波海曙光伏电站',
    monitorPoint: '并网柜温度',
    content: '#1逆变器A相温度告警',
    alarmValue: '82.5℃',
    status: '未处理',
    alarmTime: '2024-03-08 10:15:22',
    processTime: null,
  },
  {
    id: '2',
    stationName: '宁波鄞州光伏电站',
    monitorPoint: '电流不平衡率',
    content: '电流不平衡超标',
    alarmValue: '18.2%',
    status: '已处理',
    alarmTime: '2024-03-08 09:30:15',
    processTime: '2024-03-08 11:20:00',
  },
  {
    id: '3',
    stationName: '金华金字火腿',
    monitorPoint: '并网柜测温',
    content: '电缆接头温度过高',
    alarmValue: '76.8℃',
    status: '未处理',
    alarmTime: '2024-03-07 16:42:10',
    processTime: null,
  },
  {
    id: '4',
    stationName: '杭州中兴工业园电站',
    monitorPoint: '电压不平衡',
    content: '三相电压不平衡率越限',
    alarmValue: '4.1%',
    status: '已处理',
    alarmTime: '2024-03-07 08:05:33',
    processTime: '2024-03-07 09:18:22',
  },
];

const AlarmDetailRow = ({
  label,
  children,
  multiline,
}: {
  label: string;
  children: React.ReactNode;
  multiline?: boolean;
}) => {
  if (multiline) {
    return (
      <div className="px-4 py-3.5 border-b border-gray-100 last:border-b-0">
        <div className="text-[13px] text-gray-500 mb-1.5">{label}</div>
        <div className="text-[15px] text-gray-900 leading-relaxed">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3.5 border-b border-gray-100 last:border-b-0">
      <span className="text-[13px] text-gray-500 shrink-0 pt-0.5">{label}</span>
      <div className="text-[15px] text-gray-900 text-right flex-1 min-w-0 break-words">{children}</div>
    </div>
  );
};

const AlarmDataPage = ({
  onNavigate,
}: {
  onNavigate: (name: string, params?: any) => void;
}) => {
  const [listTab, setListTab] = useState<'all' | '未处理' | '已处理'>('all');
  const [stationFilter, setStationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [applied, setApplied] = useState({
    station: '',
    status: '' as '' | '未处理' | '已处理',
    start: '',
    end: '',
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [detail, setDetail] = useState<AlarmRecord | null>(null);

  const filtered = MOCK_ALARM_ROWS.filter(row => {
    if (applied.station && row.stationName !== applied.station) return false;
    if (applied.status && row.status !== applied.status) return false;
    if (applied.start && row.alarmTime.slice(0, 10) < applied.start) return false;
    if (applied.end && row.alarmTime.slice(0, 10) > applied.end) return false;
    return true;
  });

  const listRows = filtered.filter(row => listTab === 'all' || row.status === listTab);

  const runQuery = () => {
    setApplied({
      station: stationFilter,
      status: statusFilter as '' | '未处理' | '已处理',
      start: dateStart,
      end: dateEnd,
    });
    setFilterOpen(false);
  };

  const resetFilters = () => {
    setStationFilter('');
    setStatusFilter('');
    setDateStart('');
    setDateEnd('');
    setApplied({ station: '', status: '', start: '', end: '' });
  };

  const miniCapsule = (
    <div className="absolute right-3 top-8 flex gap-2">
      <div className="bg-black/20 rounded-full px-3 py-1 flex items-center gap-2 text-xs text-white">
        <span>•••</span>
        <div className="w-[1px] h-3 bg-white/30" />
        <div className="w-3 h-3 rounded-full border-2 border-white" />
      </div>
    </div>
  );

  if (detail) {
    return (
      <div className="min-h-screen bg-[#f2f4f7] pb-8">
        <div className="bg-teal-600 text-white px-4 pt-8 pb-6 relative">
          {miniCapsule}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setDetail(null)}
              className="p-1 -ml-1 shrink-0 rounded-lg active:bg-white/10"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="flex-1 text-center text-lg font-medium pr-10">告警详情</h1>
          </div>
        </div>
        <div className="px-3 -mt-3">
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] overflow-hidden">
            <div className="px-4 py-4 bg-gradient-to-br from-teal-50/90 via-white to-white border-b border-gray-100">
              <div className="text-xs text-gray-500 mb-2 tracking-wide">告警状态</div>
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
                  detail.status === '已处理'
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-red-50 text-red-600',
                )}
              >
                {detail.status}
              </span>
            </div>
            <AlarmDetailRow label="电站名称">{detail.stationName}</AlarmDetailRow>
            <AlarmDetailRow label="监测点">{detail.monitorPoint}</AlarmDetailRow>
            <AlarmDetailRow label="告警内容" multiline>
              {detail.content}
            </AlarmDetailRow>
            <AlarmDetailRow label="告警值">
              <span className="text-red-600 font-semibold tabular-nums">{detail.alarmValue}</span>
            </AlarmDetailRow>
            <AlarmDetailRow label="告警时间">{detail.alarmTime}</AlarmDetailRow>
            <AlarmDetailRow label="处理时间">{detail.processTime ?? '—'}</AlarmDetailRow>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-screen bg-[#f2f4f7]">
      <div className="bg-teal-600 text-white px-4 pt-8 pb-0 relative">
        {miniCapsule}
        <div className="flex items-center pb-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="p-1 -ml-1 shrink-0 rounded-lg active:bg-white/10"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="flex-1 text-center text-lg font-medium pr-10">告警数据</h1>
        </div>

        <div className="bg-white rounded-t-2xl shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.12)] px-1 pt-1">
          <div className="flex">
            {(
              [
                { key: 'all' as const, label: '全部' },
                { key: '未处理' as const, label: '未处理' },
                { key: '已处理' as const, label: '已处理' },
              ] as const
            ).map(t => (
              <button
                key={t.key}
                type="button"
                onClick={() => setListTab(t.key)}
                className={cn(
                  'relative flex-1 py-3 text-sm font-medium transition-colors',
                  listTab === t.key ? 'text-teal-600' : 'text-gray-400',
                )}
              >
                {t.label}
                {listTab === t.key && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-teal-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-3 pt-3 space-y-3">
        <button
          type="button"
          onClick={() => setFilterOpen(o => !o)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/90 text-sm text-teal-700 font-medium shadow-sm ring-1 ring-black/[0.04] active:bg-white"
        >
          <SlidersHorizontal size={16} strokeWidth={2} />
          {filterOpen ? '收起筛选' : '筛选条件'}
          {(applied.station || applied.status || applied.start || applied.end) && (
            <span className="text-xs font-normal text-gray-400">（已应用）</span>
          )}
        </button>

        {filterOpen && (
          <div className="bg-white rounded-2xl p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] space-y-3">
            <div>
              <div className="text-xs font-medium text-gray-600 mb-1.5">电站名称</div>
              <select
                value={stationFilter}
                onChange={e => setStationFilter(e.target.value)}
                className="w-full rounded-xl border-0 bg-gray-50 py-2.5 px-3 text-sm text-gray-900 outline-none ring-1 ring-gray-200/80 focus:ring-2 focus:ring-teal-500/30"
              >
                <option value="">电站选择</option>
                {Array.from(new Set(MOCK_ALARM_ROWS.map(r => r.stationName))).map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-600 mb-1.5">状态</div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border-0 bg-gray-50 py-2.5 px-3 text-sm outline-none ring-1 ring-gray-200/80 focus:ring-2 focus:ring-teal-500/30"
              >
                <option value="">请选择状态</option>
                <option value="未处理">未处理</option>
                <option value="已处理">已处理</option>
              </select>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1">
                <CalendarRange size={14} className="text-gray-400" /> 告警时间
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateStart}
                  onChange={e => setDateStart(e.target.value)}
                  className="min-w-0 flex-1 rounded-xl border-0 bg-gray-50 py-2 px-2 text-xs outline-none ring-1 ring-gray-200/80"
                />
                <span className="text-xs text-gray-400">至</span>
                <input
                  type="date"
                  value={dateEnd}
                  onChange={e => setDateEnd(e.target.value)}
                  className="min-w-0 flex-1 rounded-xl border-0 bg-gray-50 py-2 px-2 text-xs outline-none ring-1 ring-gray-200/80"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={runQuery}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-teal-600 py-2.5 text-sm font-medium text-white shadow-sm active:bg-teal-700"
              >
                <Search size={16} /> 查询
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-100 py-2.5 text-sm font-medium text-gray-700 active:bg-gray-200"
              >
                <RotateCcw size={16} /> 重置
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {listRows.length === 0 ? (
            <div className="rounded-2xl bg-white py-16 text-center text-sm text-gray-400 shadow-sm ring-1 ring-black/[0.04]">
              暂无数据
            </div>
          ) : (
            listRows.map(row => (
              <button
                key={row.id}
                type="button"
                onClick={() => setDetail(row)}
                className="w-full rounded-2xl bg-white p-4 text-left shadow-[0_4px_20px_-6px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.04] transition-transform active:scale-[0.99]"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span className="line-clamp-2 text-left text-[15px] font-semibold leading-snug text-gray-900">
                    {row.stationName}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-sm font-medium',
                      row.status === '已处理' ? 'text-teal-600' : 'text-red-500',
                    )}
                  >
                    {row.status}
                  </span>
                </div>
                <div className="space-y-2 text-[13px] text-gray-500">
                  <div className="flex gap-1">
                    <span className="shrink-0 text-gray-400">监测点</span>
                    <span className="text-gray-700"> {row.monitorPoint}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="shrink-0 text-gray-400">告警内容</span>
                    <span className="line-clamp-2 text-gray-700"> {row.content}</span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-1">
                    <span className="text-gray-400">告警值</span>
                    <span className="font-semibold text-red-600">{row.alarmValue}</span>
                  </div>
                  <div className="pt-0.5 text-xs text-gray-400">告警时间 {row.alarmTime}</div>
                </div>
              </button>
            ))
          )}
        </div>

        <p className="pb-2 text-center text-xs text-gray-400">共 {listRows.length} 条记录</p>
      </div>
    </div>
  );
};

const HOUR_LABELS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

function buildTempCurveData() {
  return HOUR_LABELS.map((time, i) => {
    const a = 40 + Math.sin(i / 3.2) * 4 + i * 0.14;
    const b = 41 + Math.cos(i / 3.5) * 3.5 + i * 0.11;
    const c =
      i >= 14 && i <= 20 ? 70 + Math.sin(i * 0.75) * 10 : 43 + Math.sin(i / 2.8) * 3.2;
    return {
      time,
      a: Math.round(a * 10) / 10,
      b: Math.round(b * 10) / 10,
      c: Math.round(Math.min(c, 82) * 10) / 10,
    };
  });
}

function buildUnbalanceCurveData() {
  return HOUR_LABELS.map((time, i) => {
    const currentUnb =
      i > 9 && i < 19 ? 12 + Math.sin(i * 0.4) * 3.2 : 3.5 + Math.sin(i / 4) * 2.2;
    const voltageUnb =
      i % 5 === 2 || i % 7 === 4 ? 2.15 + Math.sin(i * 0.3) * 0.5 : 0.65 + Math.sin(i / 4.2) * 0.45;
    const pf = 0.92 + Math.sin(i / 5.5) * 0.065;
    const Ia = 122 + Math.sin(i * 0.5) * 8;
    const Ib = 118 + Math.cos(i * 0.45) * 7;
    const Ic = 125 + Math.sin(i * 0.52) * 9;
    const Va = 220.2 + Math.sin(i / 6) * 1.2;
    const Vb = 219.5 + Math.cos(i / 5.8) * 1.1;
    const Vc = 221 + Math.sin(i / 5.5) * 1.3;
    return {
      time,
      currentUnb: Math.round(currentUnb * 100) / 100,
      voltageUnb: Math.round(voltageUnb * 100) / 100,
      pf: Math.round(pf * 1000) / 1000,
      Ia: Math.round(Ia * 10) / 10,
      Ib: Math.round(Ib * 10) / 10,
      Ic: Math.round(Ic * 10) / 10,
      Va: Math.round(Va * 10) / 10,
      Vb: Math.round(Vb * 10) / 10,
      Vc: Math.round(Vc * 10) / 10,
    };
  });
}

const HistoryCurvesPage = ({
  onNavigate,
}: {
  onNavigate: (name: string, params?: any) => void;
}) => {
  type CurveKind = 'temp' | 'unbalance';
  const [curveTab, setCurveTab] = useState<CurveKind>('temp');
  const [curveStationId, setCurveStationId] = useState(MOCK_STATIONS[0].id);
  const [queryDate, setQueryDate] = useState('2024-03-08');
  const [cableId, setCableId] = useState('in1');
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);
  const [showC, setShowC] = useState(true);
  const [showCurrentUnb, setShowCurrentUnb] = useState(true);
  const [showVoltageUnb, setShowVoltageUnb] = useState(true);
  const [showPf, setShowPf] = useState(true);

  const tempData = React.useMemo(() => buildTempCurveData(), []);
  const unbalanceData = React.useMemo(() => buildUnbalanceCurveData(), []);

  const miniCapsule = (
    <div className="absolute right-3 top-8 flex gap-2">
      <div className="bg-black/20 rounded-full px-3 py-1 flex items-center gap-2 text-xs text-white">
        <span>•••</span>
        <div className="w-[1px] h-3 bg-white/30" />
        <div className="w-3 h-3 rounded-full border-2 border-white" />
      </div>
    </div>
  );

  const compactField =
    'w-full rounded-lg border-0 bg-gray-50 py-1.5 px-2 text-xs text-gray-900 outline-none ring-1 ring-gray-200/90 focus:ring-2 focus:ring-teal-500/25';

  return (
    <div className="pb-24 min-h-screen bg-[#f2f4f7]">
      <div className="relative bg-teal-600 pb-0 text-white">
        {miniCapsule}
        <div className="flex items-center px-4 pb-2 pt-8">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="-ml-1 shrink-0 rounded-lg p-1 active:bg-white/10"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="flex-1 pr-10 text-center text-lg font-medium">历史曲线</h1>
        </div>
        <div className="rounded-t-2xl bg-white px-1 pt-1 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.12)]">
          <div className="flex">
            <button
              type="button"
              onClick={() => setCurveTab('temp')}
              className={cn(
                'relative flex-1 py-2.5 text-[13px] font-medium transition-colors',
                curveTab === 'temp' ? 'text-teal-600' : 'text-gray-400',
              )}
            >
              并网柜温度曲线
              {curveTab === 'temp' && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-9 -translate-x-1/2 rounded-full bg-teal-600" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setCurveTab('unbalance')}
              className={cn(
                'relative flex-1 py-2.5 text-[13px] font-medium transition-colors',
                curveTab === 'unbalance' ? 'text-teal-600' : 'text-gray-400',
              )}
            >
              三相不平衡曲线
              {curveTab === 'unbalance' && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-9 -translate-x-1/2 rounded-full bg-teal-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {curveTab === 'temp' && (
        <div className="space-y-2 px-3 pb-3 pt-2">
          <div className="space-y-2 rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-black/[0.04]">
            <div>
              <div className="mb-0.5 text-[11px] text-gray-500">选择电站</div>
              <select
                value={curveStationId}
                onChange={e => setCurveStationId(e.target.value)}
                className={compactField}
              >
                {MOCK_STATIONS.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="mb-0.5 text-[11px] text-gray-500">选择日期</div>
                <input
                  type="date"
                  value={queryDate}
                  onChange={e => setQueryDate(e.target.value)}
                  className={compactField}
                />
              </div>
              <div>
                <div className="mb-0.5 text-[11px] text-gray-500">线缆筛选</div>
                <select
                  value={cableId}
                  onChange={e => setCableId(e.target.value)}
                  className={compactField}
                >
                  <option value="in1">#1 进线</option>
                  <option value="out1">#1 出线</option>
                </select>
              </div>
            </div>
            <div>
              <div className="mb-1 text-[11px] text-gray-500">显示相位</div>
              <div className="flex gap-3">
                <label className="flex cursor-pointer items-center gap-1">
                  <input
                    type="checkbox"
                    checked={showA}
                    onChange={e => setShowA(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-teal-600"
                  />
                  <span className="text-xs font-medium text-amber-600">A相</span>
                </label>
                <label className="flex cursor-pointer items-center gap-1">
                  <input
                    type="checkbox"
                    checked={showB}
                    onChange={e => setShowB(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-teal-600"
                  />
                  <span className="text-xs font-medium text-emerald-600">B相</span>
                </label>
                <label className="flex cursor-pointer items-center gap-1">
                  <input
                    type="checkbox"
                    checked={showC}
                    onChange={e => setShowC(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-teal-600"
                  />
                  <span className="text-xs font-medium text-red-600">C相</span>
                </label>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-lg bg-teal-600 py-2 text-xs font-medium text-white shadow-sm active:bg-teal-700"
            >
              查询
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/[0.04]">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h2 className="text-sm font-bold text-gray-900">并网柜线缆温升趋势图</h2>
              <div className="flex items-center gap-1 shrink-0 text-[11px] text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                告警阈值: 75°C
              </div>
            </div>
            <div className="h-56 w-full min-w-0 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tempData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="time" tick={{ fontSize: 9 }} interval={3} />
                  <YAxis domain={[0, 88]} tick={{ fontSize: 9 }} width={32} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <ReferenceLine
                    y={75}
                    stroke="#ef4444"
                    strokeDasharray="6 4"
                    label={{ value: '75°C', fill: '#ef4444', fontSize: 10, position: 'insideTopRight' }}
                  />
                  {showA && (
                    <Line type="monotone" dataKey="a" name="A相温度" stroke="#f97316" strokeWidth={2} dot={false} />
                  )}
                  {showB && (
                    <Line type="monotone" dataKey="b" name="B相温度" stroke="#22c55e" strokeWidth={2} dot={false} />
                  )}
                  {showC && (
                    <Line type="monotone" dataKey="c" name="C相温度" stroke="#ef4444" strokeWidth={2} dot={false} />
                  )}
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04]">
            <div className="border-b border-gray-100 px-3 py-2.5">
              <h3 className="text-sm font-bold text-gray-900">数据明细报表</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[320px] w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80 text-gray-500">
                    <th className="sticky left-0 z-10 bg-gray-50/95 py-2 pl-3 pr-2 text-left font-normal">
                      时间点
                    </th>
                    <th className="py-2 px-2 text-right font-normal">A相温度(°C)</th>
                    <th className="py-2 px-2 text-right font-normal">B相温度(°C)</th>
                    <th className="py-2 px-2 pr-3 text-right font-normal">C相温度(°C)</th>
                  </tr>
                </thead>
                <tbody>
                  {tempData.map((row, i) => (
                    <tr
                      key={row.time}
                      className={cn('border-b border-gray-50', i % 2 === 1 ? 'bg-gray-50/50' : 'bg-white')}
                    >
                      <td className="sticky left-0 z-10 whitespace-nowrap bg-inherit py-2 pl-3 pr-2 text-gray-700">
                        {row.time}
                      </td>
                      <td className="py-2 px-2 text-right font-mono text-gray-800">{row.a}</td>
                      <td className="py-2 px-2 text-right font-mono text-gray-800">{row.b}</td>
                      <td
                        className={cn(
                          'py-2 px-2 pr-3 text-right font-mono',
                          row.c >= 75 ? 'font-semibold text-red-600' : 'text-gray-800',
                        )}
                      >
                        {row.c}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {curveTab === 'unbalance' && (
        <div className="space-y-2 px-3 pb-3 pt-2">
          <div className="space-y-2 rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-black/[0.04]">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="mb-0.5 text-[11px] text-gray-500">选择电站</div>
                <select
                  value={curveStationId}
                  onChange={e => setCurveStationId(e.target.value)}
                  className={compactField}
                >
                  {MOCK_STATIONS.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="mb-0.5 text-[11px] text-gray-500">查询日期</div>
                <input
                  type="date"
                  value={queryDate}
                  onChange={e => setQueryDate(e.target.value)}
                  className={compactField}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 text-[11px] text-gray-500">曲线选项</div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <label className="flex cursor-pointer items-center gap-1">
                  <input
                    type="checkbox"
                    checked={showCurrentUnb}
                    onChange={e => setShowCurrentUnb(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-teal-600"
                  />
                  <span className="text-xs text-gray-800">电流不平衡率</span>
                </label>
                <label className="flex cursor-pointer items-center gap-1">
                  <input
                    type="checkbox"
                    checked={showVoltageUnb}
                    onChange={e => setShowVoltageUnb(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-teal-600"
                  />
                  <span className="text-xs text-gray-800">电压不平衡率</span>
                </label>
                <label className="flex cursor-pointer items-center gap-1">
                  <input
                    type="checkbox"
                    checked={showPf}
                    onChange={e => setShowPf(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-teal-600"
                  />
                  <span className="text-xs text-gray-800">功率因数</span>
                </label>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-lg bg-teal-600 py-2 text-xs font-medium text-white shadow-sm active:bg-teal-700"
            >
              查询
            </button>
          </div>

          {showCurrentUnb && (
            <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/[0.04]">
              <div className="mb-2 flex justify-between gap-2">
                <h3 className="text-sm font-bold text-gray-900">电流不平衡趋势图</h3>
                <span className="text-[11px] text-red-600">阈值：15%</span>
              </div>
              <div className="h-48 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={unbalanceData} margin={{ top: 6, right: 6, left: -14, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="time" tick={{ fontSize: 9 }} interval={3} />
                    <YAxis domain={[0, 18]} tick={{ fontSize: 9 }} width={30} tickFormatter={v => `${v}%`} />
                    <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 12 }} />
                    <ReferenceLine y={15} stroke="#ef4444" strokeDasharray="6 4" />
                    <Line type="monotone" dataKey="currentUnb" name="电流不平衡率" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {showVoltageUnb && (
            <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/[0.04]">
              <div className="mb-2 flex justify-between gap-2">
                <h3 className="text-sm font-bold text-gray-900">电压不平衡趋势图</h3>
                <span className="text-[11px] text-red-600">阈值：2%</span>
              </div>
              <div className="h-48 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={unbalanceData} margin={{ top: 6, right: 6, left: -14, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="time" tick={{ fontSize: 9 }} interval={3} />
                    <YAxis domain={[0, 3]} tick={{ fontSize: 9 }} width={30} tickFormatter={v => `${v}%`} />
                    <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ fontSize: 12 }} />
                    <ReferenceLine y={2} stroke="#ef4444" strokeDasharray="6 4" />
                    <Line
                      type="monotone"
                      dataKey="voltageUnb"
                      name="电压不平衡率"
                      stroke="#eab308"
                      strokeWidth={2}
                      dot={{ r: 2, fill: '#eab308' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {showPf && (
            <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/[0.04]">
              <h3 className="mb-2 text-sm font-bold text-gray-900">功率因素趋势图</h3>
              <div className="h-48 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={unbalanceData} margin={{ top: 6, right: 6, left: -14, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="time" tick={{ fontSize: 9 }} interval={3} />
                    <YAxis domain={[0.8, 1]} tick={{ fontSize: 9 }} width={34} />
                    <Tooltip contentStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="pf" name="功率因数" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04]">
            <div className="border-b border-gray-100 px-3 py-2.5">
              <h3 className="text-sm font-bold text-gray-900">三相不平衡数据明细</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-max min-w-full text-[10px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/90 text-gray-500">
                    <th className="sticky left-0 z-10 whitespace-nowrap bg-gray-50 py-2 pl-3 pr-2 text-left font-normal">
                      时间点
                    </th>
                    <th className="whitespace-nowrap px-1.5 py-2 text-right font-normal">A相电流(A)</th>
                    <th className="whitespace-nowrap px-1.5 py-2 text-right font-normal">B相电流(A)</th>
                    <th className="whitespace-nowrap px-1.5 py-2 text-right font-normal">C相电流(A)</th>
                    <th className="whitespace-nowrap px-1.5 py-2 text-right font-normal">A相电压(V)</th>
                    <th className="whitespace-nowrap px-1.5 py-2 text-right font-normal">B相电压(V)</th>
                    <th className="whitespace-nowrap px-1.5 py-2 text-right font-normal">C相电压(V)</th>
                    <th className="whitespace-nowrap px-1.5 py-2 text-right font-normal">电流不平衡率(%)</th>
                    <th className="whitespace-nowrap px-1.5 py-2 pr-3 text-right font-normal">电压不平衡率(%)</th>
                    <th className="whitespace-nowrap py-2 pr-3 text-right font-normal">功率因数</th>
                  </tr>
                </thead>
                <tbody>
                  {unbalanceData.map((row, i) => (
                    <tr
                      key={row.time}
                      className={cn('border-b border-gray-50', i % 2 === 1 ? 'bg-gray-50/40' : 'bg-white')}
                    >
                      <td className="sticky left-0 z-10 whitespace-nowrap bg-inherit py-2 pl-3 pr-2 text-gray-700">
                        {row.time}
                      </td>
                      <td className="whitespace-nowrap py-2 px-1.5 text-right font-mono text-gray-800">{row.Ia}</td>
                      <td className="whitespace-nowrap py-2 px-1.5 text-right font-mono text-gray-800">{row.Ib}</td>
                      <td className="whitespace-nowrap py-2 px-1.5 text-right font-mono text-gray-800">{row.Ic}</td>
                      <td className="whitespace-nowrap py-2 px-1.5 text-right font-mono text-gray-800">{row.Va}</td>
                      <td className="whitespace-nowrap py-2 px-1.5 text-right font-mono text-gray-800">{row.Vb}</td>
                      <td className="whitespace-nowrap py-2 px-1.5 text-right font-mono text-gray-800">{row.Vc}</td>
                      <td className="whitespace-nowrap py-2 px-1.5 text-right font-mono text-gray-800">
                        {row.currentUnb}
                      </td>
                      <td
                        className={cn(
                          'whitespace-nowrap py-2 px-1.5 text-right font-mono',
                          row.voltageUnb > 2 ? 'font-semibold text-red-600' : 'text-gray-800',
                        )}
                      >
                        {row.voltageUnb}
                      </td>
                      <td className="whitespace-nowrap py-2 pr-3 text-right font-mono text-gray-800">{row.pf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentPage, setCurrentPage] = useState({ name: 'home', params: null });
  const [stationContextMode, setStationContextMode] = useState<'om' | 'monitoring'>('monitoring');
  const stationContextRef = useRef<'om' | 'monitoring'>(stationContextMode);
  stationContextRef.current = stationContextMode;

  const onHomeSegmentChange = useCallback((segment: 'om' | 'monitoring') => {
    stationContextRef.current = segment;
    setStationContextMode(segment);
  }, []);

  const navigate = (name: string, params: any = null) => {
    if (name === 'station' || name === 'wholeStationMonitor') {
      const mode: 'om' | 'monitoring' = params?.mode ?? stationContextRef.current;
      if (params?.mode) {
        stationContextRef.current = params.mode;
        setStationContextMode(params.mode);
      }
      setCurrentPage({ name, params: { ...params, mode } });
      return;
    }
    setCurrentPage({ name, params });
  };

  const renderPage = () => {
    switch (currentPage.name) {
      case 'home':
        return <HomePage onNavigate={navigate} onHomeSegmentChange={onHomeSegmentChange} />;
      case 'station':
        return <StationListPage params={currentPage.params} onNavigate={navigate} />;
      case 'wholeStationMonitor':
        return <WholeStationMonitorPage params={currentPage.params} onNavigate={navigate} />;
      case 'stationDetail':
        return (
          <StationDetailPage
            params={currentPage.params}
            onBack={() => {
              const p = currentPage.params;
              if (p?.from === 'wholeStationMonitor') {
                navigate('wholeStationMonitor', { mode: p?.mode ?? stationContextRef.current });
              } else if (p?.from === 'home') {
                navigate('home');
              } else {
                navigate('station');
              }
            }}
          />
        );
      case 'alarms':
        return <AlarmDataPage onNavigate={navigate} />;
      case 'curves':
        return <HistoryCurvesPage onNavigate={navigate} />;
      case 'mine':
        return <MinePage />;
      default:
        return <HomePage onNavigate={navigate} onHomeSegmentChange={onHomeSegmentChange} />;
    }
  };

  // Sync bottom tab with current page
  useEffect(() => {
    if (
      currentPage.name === 'home' ||
      currentPage.name === 'wholeStationMonitor' ||
      currentPage.name === 'alarms' ||
      currentPage.name === 'curves'
    ) {
      setActiveTab('home');
      return;
    }
    if (currentPage.name === 'stationDetail') {
      const f = currentPage.params?.from;
      if (f === 'wholeStationMonitor' || f === 'home') {
        setActiveTab('home');
      } else {
        setActiveTab('station');
      }
      return;
    }
    if (currentPage.name === 'station') {
      setActiveTab('station');
      return;
    }
    if (currentPage.name === 'mine') {
      setActiveTab('mine');
    }
  }, [currentPage.name, currentPage.params?.from]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') navigate('home');
    if (tab === 'station') navigate('station');
    if (tab === 'mine') navigate('mine');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen font-sans text-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentPage.name}-${currentPage.params?.id ?? ''}-${currentPage.params?.mode ?? ''}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      
      <TabBar activeTab={activeTab} setActiveTab={handleTabChange} />
    </div>
  );
}
