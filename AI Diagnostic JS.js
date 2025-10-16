const { useState } = React;
const ChevronRight = lucide.ChevronRight;
const Sparkles = lucide.Sparkles;
const Brain = lucide.Brain;
const Palette = lucide.Palette;
const Zap = lucide.Zap;

const AIDiagnosticApp = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: 'q1',
      question: 'あなたの仕事で、AIに手伝ってほしいと思うのはどんな場面ですか？',
      options: [
        { text: 'アイデアや企画を考えるとき', scores: { chatgpt: 3, perplexity: 1, manus: 1 } },
        { text: 'デザインや画像を作るとき', scores: { canva: 3, gemini: 2, manus: 1 } },
        { text: '情報をリサーチするとき', scores: { perplexity: 3, chatgpt: 2, genspark: 1 } },
        { text: 'SNS投稿や発信をするとき', scores: { manus: 3, chatgpt: 2, canva: 1 } },
        { text: '同じ作業を何度も繰り返しているとき', scores: { genspark: 3, n8n: 2, chatgpt: 1 } }
      ]
    },
    {
      id: 'q2',
      question: '1日のうち、AIに使える時間はどのくらいですか？',
      options: [
        { text: '5分以内(スキマ時間)', scores: { chatgpt: 2, manus: 2 } },
        { text: '30分くらい(仕事の合間)', scores: { chatgpt: 2, canva: 2, perplexity: 1 } },
        { text: '1時間以上(本格活用)', scores: { genspark: 3, n8n: 2, manus: 2 } }
      ]
    },
    {
      id: 'q3',
      question: '仕事の中で「一番面倒」だと感じるのはどれですか？',
      options: [
        { text: '文章や企画を考えること', scores: { chatgpt: 3, perplexity: 2 } },
        { text: 'デザイン・画像作成', scores: { canva: 3, gemini: 2 } },
        { text: '調べ物・要約', scores: { perplexity: 3, chatgpt: 1 } },
        { text: '同じタスクを繰り返すこと', scores: { genspark: 3, n8n: 2 } }
      ]
    },
    {
      id: 'q4',
      question: 'AIを使ってどんな成果を得たいですか？',
      options: [
        { text: '作業時間を減らしたい', scores: { genspark: 3, n8n: 2, chatgpt: 1 } },
        { text: 'コンテンツの質を上げたい', scores: { chatgpt: 2, canva: 2, perplexity: 2 } },
        { text: '売上・フォロワーを伸ばしたい', scores: { manus: 3, canva: 2, chatgpt: 1 } },
        { text: '自動で回る仕組みを作りたい', scores: { genspark: 3, n8n: 3, manus: 2 } }
      ]
    },
    {
      id: 'q5',
      question: 'AIを使うときに一番苦手・困っていることは？',
      options: [
        { text: '指示の出し方がわからない', scores: { chatgpt: 2, manus: 2 } },
        { text: 'デザインがうまく作れない', scores: { canva: 3, gemini: 2 } },
        { text: '情報を探すのが大変', scores: { perplexity: 3, chatgpt: 1 } },
        { text: 'どのツールを使えばいいか', scores: { chatgpt: 2, genspark: 2 } }
      ]
    },
    {
      id: 'q6',
      question: '「AIに人格があって、自分の代わりに動く」と聞いたら？',
      options: [
        { text: '興味がある！試してみたい', scores: { manus: 3, genspark: 3, n8n: 2 } },
        { text: '便利そうだけど、難しそう', scores: { chatgpt: 2, manus: 2 } },
        { text: 'まだ自分には早い気がする', scores: { chatgpt: 3, canva: 2 } }
      ]
    },
    {
      id: 'q7',
      question: '1ヶ月後、AIでどうなっていたいですか？',
      options: [
        { text: '毎日の仕事が早く終わる', scores: { genspark: 3, chatgpt: 2, n8n: 2 } },
        { text: 'SNS発信がスムーズになる', scores: { manus: 3, canva: 2, chatgpt: 2 } },
        { text: '情報収集が爆速になる', scores: { perplexity: 3, chatgpt: 2 } },
        { text: 'AIが代わりに動く仕組み', scores: { genspark: 3, n8n: 3, manus: 3 } }
      ]
    }
  ];

  const resultPatterns = {
    thinking: {
      title: '文章・アイデア系',
      icon: React.createElement(Brain, { className: "w-8 h-8 text-blue-500" }),
      tools: [
        { 
          name: 'ChatGPT', 
          logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDQ4QzM3LjI1NDggNDggNDggMzcuMjU0OCA0OCAyNEM0OCAxMC43NDUyIDM3LjI1NDggMCAyNCAwQzEwLjc0NTIgMCAwIDEwLjc0NTIgMCAyNEMwIDM3LjI1NDggMTAuNzQ1MiA0OCAyNCA0OFoiIGZpbGw9IiMxMEEzN0YiLz4KPHBhdGggZD0iTTM1LjkgMTguN0MzNyAxNi4xIDM2LjcgMTMuMiAzNSAxMC45QzMzLjIgOC43IDMwLjQgNy40IDI3LjQgNy42QzI2LjIgNiAyNC43IDQuNyAyMi44IDRDMjEgMy4yIDE5IDMgMTcgMy40QzE1IDMuOCAxMy4zIDQuOCAxMS44IDYuMkMxMC40IDcuNiA5LjQgOS40IDguOSAxMS40QzYuOSAxMS45IDUuMSAxMy4yIDQgMTVDMi45IDE2LjggMi41IDE5IDMgMjEuMUMzLjQgMjMuMSA0LjYgMjUgNi40IDI2LjJDNS4yIDI4LjggNS41IDMxLjcgNy4zIDM0QzkuMSAzNi4yIDExLjkgMzcuNSAxNC45IDM3LjNDMTYgMzkgMTcuNiA0MC4yIDE5LjUgNDFDMjEuMyA0MS43IDIzLjMgNDEuOSAyNS4zIDQxLjVDMjcuMiA0MS4xIDI5IDQwLjEgMzAuNSAzOC43QzMxLjkgMzcuMyAzMi45IDM1LjUgMzMuNCAzMy41QzM1LjQgMzMgMzcuMiAzMS43IDM4LjMgMjkuOUMzOS40IDI4LjEgMzkuOCAyNS45IDM5LjMgMjMuOEMzOC45IDIxLjggMzcuNyAxOS45IDM1LjkgMTguN1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
          desc: '思考整理・アイデア出し・文章作成の相棒' 
        },
        { 
          name: 'Perplexity AI', 
          logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzIwODA4RCIvPgo8cGF0aCBkPSJNMjQgMTJMMzIgMTguNVYzMS41TDI0IDM4TDE2IDMxLjVWMTguNUwyNCAxMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
          desc: 'リサーチ力が圧倒的。最新情報を要約' 
        },
        { 
          name: 'Manus', 
          logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzNCODJGNiIvPgo8cGF0aCBkPSJNMTggMTJIMzBWMTZIMThWMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTQgMjBIMzRWMjRIMTRWMjBaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTggMjhIMzBWMzJIMThWMjhaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjIgMzZIMjZWNDBIMjJWMzZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=',
          desc: 'あなたの分身AIとして発信を自動化' 
        }
      ],
      message: 'ChatGPTが文章を作り、Perplexityが裏付けを取り、Manusが発信する。'
    },
    design: {
      title: 'デザイン・発信系',
      icon: React.createElement(Palette, { className: "w-8 h-8 text-pink-500" }),
      tools: [
        { 
          name: 'Canva', 
          logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iY2FudmEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBDNENDO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3QzNBRUQ7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0idXJsKCNjYW52YSkiLz4KPHBhdGggZD0iTTI0IDE2QzE5LjYgMTYgMTYgMTkuNiAxNiAyNEMxNiAyOC40IDE5LjYgMzIgMjQgMzJDMjguNCAzMiAzMiAyOC40IDMyIDI0QzMyIDE5LjYgMjguNCAxNiAyNCAxNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
          desc: '画像・動画をAIで瞬時に生成' 
        },
        { 
          name: 'Gemini', 
          logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ2VtaW5pIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6Izg3Q0VGQTtzdG9wLW9wYWNpdHk6MSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNEE5MEU1O3N0b3Atb3BhY2l0eToxIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcng9IjgiIGZpbGw9InVybCgjZ2VtaW5pKSIvPgo8cGF0aCBkPSJNMjQgMTJMMzAgMjRMMjQgMzZMMTggMjRMMjQgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=',
          desc: '同じトーンで画像を量産' 
        },
        { 
          name: 'Manus', 
          logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4