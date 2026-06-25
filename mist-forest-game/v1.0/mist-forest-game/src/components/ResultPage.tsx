import React, { useMemo, useRef } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { DimensionScores } from '../store';

interface ResultPageProps {
  scores: DimensionScores;
  onRestart: () => void;
}

// 辅助函数：标准化分数 (0-100) 用于雷达图展示
const normalizeScore = (score: number, maxExpected: number = 10) => {
  return Math.min(Math.max(Math.round((score / maxExpected) * 100), 10), 100);
};

export const ResultPage: React.FC<ResultPageProps> = ({ scores, onRestart }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 解析雷达图数据
  const radarData = useMemo(() => {
    return [
      { subject: '生存焦虑', A: normalizeScore(scores.StressSurvival, 8), fullMark: 100 },
      { subject: '社交疲惫', A: normalizeScore(scores.StressSocial, 8), fullMark: 100 },
      { subject: '自我内耗', A: normalizeScore(scores.StressSelf, 8), fullMark: 100 },
      { subject: '环境戒备(N)', A: normalizeScore(scores.N, 8), fullMark: 100 },
      { subject: '探索欲(O)', A: normalizeScore(scores.O, 8), fullMark: 100 },
    ];
  }, [scores]);

  // 计算结果身份
  const resultProfile = useMemo(() => {
    const maxStress = Math.max(scores.StressSurvival, scores.StressSocial, scores.StressSelf);
    
    if (scores.StressLevel > 15 || maxStress === scores.StressSelf) {
      return {
        title: "迷雾深处的独行者",
        subtitle: "你习惯于向内索求答案，却也容易被自己困住。",
        desc: "极高的自我要求和敏感的心思，让你在森林中步步为营。外界的风吹草动都会引起你的警觉。试着原谅自己的不完美，偶尔停下来看看风景，森林并非处处都是敌人。"
      };
    } else if (maxStress === scores.StressSocial) {
      return {
        title: "提灯的守望人",
        subtitle: "你总是在照亮别人，却忘了自己的灯油也会耗尽。",
        desc: "你拥有极高的共情能力（高宜人性），但在人际交往中过度消耗了自己。在森林中，你总是害怕别人迷路，却不知不觉压抑了自己的真实需求。请学会为自己划定边界。"
      };
    } else if (maxStress === scores.StressSurvival) {
      return {
        title: "披荆斩棘的开拓者",
        subtitle: "你的剑很锋利，但长期紧绷的弦容易断裂。",
        desc: "你极具行动力与责任感（高尽责性与外向性），面对现实的压力习惯于正面迎击。但在不断的冲锋中，你忽略了身体和情绪的疲惫。放下剑，允许自己偶尔做一个软弱的凡人。"
      };
    } else {
      return {
        title: "游刃有余的吟游诗人",
        subtitle: "世界是一个巨大的草台班子，而你在其中歌唱。",
        desc: "你的心理状态非常健康，能够较好地平衡现实压力与内心情绪。开放与随和是你度过难关的法宝。请继续保持这份轻盈，享受接下来的旅程。"
      };
    }
  }, [scores]);

  const handleSaveImage = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: '#0a0f0d',
          scale: 2, // 提高清晰度
        });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = '幻雾森林_灵魂解析卡.png';
        link.href = image;
        link.click();
      } catch (err) {
        console.error("生成图片失败", err);
        alert("保存图片失败，请重试或直接截图分享");
      }
    }
  };

  return (
    <div className="w-full min-h-screen py-10 px-4 flex flex-col items-center overflow-y-auto">
      {/* 结果卡片容器 (用于截图) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        ref={cardRef}
        className="w-full max-w-md bg-forest-light border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative"
      >
        {/* 卡片头部 - 角色 */}
        <div className="pt-10 pb-6 px-6 text-center border-b border-gray-800/50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-magic-purple via-transparent to-transparent"></div>
          <h3 className="text-gray-400 text-xs tracking-[0.2em] mb-2 font-sans relative z-10">你的灵魂倒影</h3>
          <h1 className="text-3xl font-serif text-white tracking-wider mb-2 relative z-10">{resultProfile.title}</h1>
          <p className="text-magic-green text-sm italic relative z-10">{resultProfile.subtitle}</p>
        </div>

        {/* 卡片中部 - 雷达图 */}
        <div className="h-64 w-full bg-forest-dark/30 py-4 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12, fontFamily: 'sans-serif' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a2622', border: '1px solid #374151' }}
                itemStyle={{ color: '#fff' }}
              />
              <Radar 
                name="灵魂刻度" 
                dataKey="A" 
                stroke="#6b46c1" 
                fill="#6b46c1" 
                fillOpacity={0.4} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 卡片底部 - 解析 */}
        <div className="p-8 text-gray-300">
          <h4 className="text-sm text-gray-500 tracking-widest mb-3 font-sans border-l-2 border-magic-purple pl-2">潜意识解析</h4>
          <p className="text-sm leading-relaxed text-justify opacity-90">
            {resultProfile.desc}
          </p>
          
          <div className="mt-8 pt-4 border-t border-gray-800/50 flex justify-between items-center opacity-50">
            <span className="text-xs">幻雾森林心理评估仪</span>
            <span className="text-xs italic">仅供娱乐与自我探索</span>
          </div>
        </div>
      </motion.div>

      {/* 操作按钮区 (不在截图中显示) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 flex gap-4"
      >
        <button 
          onClick={handleSaveImage}
          className="px-6 py-2 bg-magic-purple/20 border border-magic-purple/50 text-white rounded text-sm hover:bg-magic-purple/40 transition-colors"
        >
          保存专属卡片
        </button>
        <button 
          onClick={onRestart}
          className="px-6 py-2 bg-transparent border border-gray-600 text-gray-400 rounded text-sm hover:text-white hover:border-gray-400 transition-colors"
        >
          再次踏入森林
        </button>
      </motion.div>
    </div>
  );
};
