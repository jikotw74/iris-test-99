# CLAUDE.md - AI 開發指南

## 專案概覽

這是一個 **99 乘法表測驗遊戲**，使用 React + TypeScript + Vite 構建的互動式學習應用。學生可以在限時競賽中練習 2-9 乘法表。

## 技術棧

- **React 19** + **TypeScript** + **Vite 7**
- **GitHub Actions** 自動部署到 **GitHub Pages**
- 無後端，純前端靜態應用

## 常用指令

```bash
npm run dev      # 啟動開發服務器 (localhost:5173)
npm run build    # TypeScript 編譯 + 生產構建
npm run lint     # ESLint 代碼檢查
npm run preview  # 預覽構建結果
```

## 目錄結構

```
src/
├── App.tsx                 # 主應用邏輯和狀態管理
├── types.ts                # TypeScript 類型定義
├── utils.ts                # 工具函數（題目生成、答案驗證）
├── narrativeProblems.ts    # 敘述題型題庫（100+種題目模板）
└── components/
    ├── DifficultySelector.tsx  # 難度和題庫選擇頁面
    ├── Game.tsx                # 遊戲主頁面
    ├── GameOver.tsx            # 遊戲結束頁面
    ├── PenaltyModal.tsx        # 錯題複習模態框
    └── VirtualKeyboard.tsx     # 虛擬鍵盤組件
```

## 核心功能

### 遊戲模式
- **基本計算模式**: 直接顯示乘法算式 (3 × 5 = ?)
- **敘述題型模式**: 生活情境應用題

### 遊戲流程
1. 選擇題型（基本/敘述）
2. 選擇題庫（2-9 乘法表，可勾選）
3. 選擇難度（簡單/普通/困難/自訂）
4. 限時答題
5. 答錯觸發錯題複習
6. 遊戲結束顯示分數和正確率

### 預設難度
- 簡單：120 秒，15 秒/題
- 普通：90 秒，10 秒/題
- 困難：60 秒，5 秒/題

## 關鍵檔案說明

| 檔案 | 功能 |
|-----|------|
| `App.tsx` | 遊戲狀態管理、流程控制、答案驗證 |
| `types.ts` | Difficulty, Question, NarrativeQuestion 等類型定義 |
| `utils.ts` | generateQuestion(), checkAnswer() 等工具函數 |
| `narrativeProblems.ts` | 敘述題模板，含 {num1}, {num2} 佔位符 |
| `DifficultySelector.tsx` | 三步驟選擇：題型→題庫→難度 |
| `Game.tsx` | 遊戲 UI、倒數計時、輸入處理 |
| `PenaltyModal.tsx` | 錯題複習，需輸入完整乘法算式 |

## 開發注意事項

1. **乘法表範圍**: 僅 2-9，不包含 1（已移除）
2. **敘述題**: 需輸入完整乘法算式（num1 × num2 = 答案）
3. **響應式設計**: 使用 90vh/90dvh，支援手機視口
4. **虛擬鍵盤**: 支援手機操作，按鈕為 1-9, 0, 刪除, 送出

## 部署

- **主網址**: https://jikotw74.github.io/iris-test-99/
- **自動部署**: 推送到 `main` 分支自動觸發
- **PR Preview**: PR 會自動產生預覽連結
- **Base 路徑**: `/iris-test-99/`（透過環境變數 `VITE_BASE_PATH` 可覆寫）

## CI/CD 流程

- `.github/workflows/deploy.yml` - main 分支部署
- `.github/workflows/preview.yml` - PR 預覽部署

## 類型參考

```typescript
// 難度設置
interface Difficulty {
  name: string;
  totalTime: number;
  timePerQuestion: number;
}

// 基本計算題
interface Question {
  num1: number;
  num2: number;
  answer: number;
}

// 敘述題
interface NarrativeQuestion {
  id: string;
  narrative: string;
  num1: number;
  num2: number;
  answer: number;
  unit: string;
}

// 題型模式
type QuestionMode = 'basic' | 'narrative';
```
