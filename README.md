# 99 乘法表測驗遊戲

一個用 React 和 TypeScript 製作的 99 乘法表測驗遊戲。

## 🎮 遊戲特色

- **預設難度選擇**：
  - 簡單：120 秒，每 15 秒切換題目
  - 普通：90 秒，每 10 秒切換題目
  - 困難：60 秒，每 5 秒切換題目
- **自訂難度**：自由設定總倒數時間與換題秒數，打造專屬挑戰
- **題庫勾選**：僅限制第一個數字 (第幾的乘法)，預設 2～9 全選，可取消還沒學會的 6、8 等乘法；1 不在題庫列表
- **錯題複習**：答錯時會跳出提示視窗，顯示正確算式，必須依序輸入對應的數字 (如 3 6 1 8) 後才能繼續作答，幫助加深記憶

- **雙重輸入方式**：
  - 使用鍵盤輸入數字和 Enter 送出答案
  - 使用滑鼠點選虛擬鍵盤

- **計分系統**：每答對一題得一分

- **倒數計時**：限時內盡可能答對更多題目

## 🚀 開始使用

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

### 建置專案

```bash
npm run build
```

### 程式碼檢查

```bash
npm run lint
```

## 🌐 部署

此專案已配置 GitHub Actions，會自動部署到 GitHub Pages。

每次推送到 `main` 分支時，會自動觸發建置和部署流程。

### GitHub Actions 自動部署流程

1. 到 GitHub 專案的 **Settings ▸ Pages**，將 **Build and deployment** 的來源 (Source) 設定為 **GitHub Actions**。這個專案已提供 `.github/workflows/deploy.yml`，會負責建置並推送靜態檔案到 Pages。
2. 推送程式碼到 `main` 後，GitHub 會自動啟動 **Deploy to GitHub Pages** workflow。你可以在 **Actions** 分頁看到即時執行情況與紀錄。
3. workflow 會執行 `npm ci`、`npm run build`，並將 `dist/` 產物上傳給 Pages，再由 `actions/deploy-pages` 完成部署。

### 查看部署成果

- 成功部署後，可以在 **Settings ▸ Pages** 或 workflow 的 `github-pages` environment 中找到公開網址。
- 以目前的設定，網站會出現在 `https://jikotw74.github.io/iris-test-99/`。若你 fork 專案，網址會改成 `https://<你的 GitHub 使用者名稱>.github.io/<repo 名稱>/`。
- 若想強制重新部署，可以在 **Actions** 分頁手動點選 workflow 並使用 **Run workflow** 觸發，或重新推送 (`git commit && git push`) 到 `main`。

## 🛠️ 技術棧

- React 19
- TypeScript
- Vite
- GitHub Actions (CI/CD)
- GitHub Pages

## 📝 授權

MIT

