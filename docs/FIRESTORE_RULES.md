# Firestore 安全規則文檔

本文件記錄了 99 乘法表測驗遊戲的 Firestore 安全規則。

## 規則文件位置

- **規則文件**: `/firestore.rules`

## Collection 結構

### `leaderboard` - 排行榜

儲存玩家成績記錄。

#### 欄位定義

| 欄位名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| `name` | string | 是 | 玩家名稱，1-20 字元 |
| `score` | int | 是 | 答對題數，>= 0 |
| `timeUsed` | int | 是 | 使用時間（秒），>= 0 |
| `difficulty` | string | 是 | 難度：`簡單`、`普通`、`困難` |
| `questionMode` | string | 是 | 題型：`basic`（基本計算）、`narrative`（敘述題型）|
| `selectedTables` | array | 是 | 選擇的題庫（2-9 的子集），長度 1-8 |
| `poolType` | string | 是 | 題庫池類型：`all`（全部題庫）、`partial`（部分題庫）|
| `timestamp` | timestamp | 是 | 記錄時間 |

#### 權限規則

| 操作 | 權限 | 說明 |
|------|------|------|
| `read` | 允許所有人 | 排行榜為公開資料 |
| `create` | 允許（需驗證） | 需通過欄位驗證才能建立 |
| `update` | 禁止 | 不允許修改現有記錄 |
| `delete` | 禁止 | 不允許刪除記錄 |

#### 建立驗證規則

建立新記錄時，會驗證以下條件：

1. **必填欄位檢查**: 必須包含所有必要欄位
2. **name 驗證**:
   - 必須是字串
   - 長度 1-20 字元
3. **score 驗證**:
   - 必須是整數
   - 值 >= 0
4. **timeUsed 驗證**:
   - 必須是整數
   - 值 >= 0
5. **difficulty 驗證**:
   - 必須是 `簡單`、`普通`、`困難` 其中之一
6. **questionMode 驗證**:
   - 必須是 `basic` 或 `narrative`
7. **selectedTables 驗證**:
   - 必須是陣列
   - 長度 1-8（至少選擇 1 個題庫，最多 8 個）
8. **timestamp 驗證**:
   - 必須是 timestamp 類型

## 部署規則

使用 Firebase CLI 部署規則：

```bash
firebase deploy --only firestore:rules
```

## 索引

排行榜查詢需要以下複合索引（定義於 `/firestore.indexes.json`）：

### 1. 主要排行榜查詢（含題庫池篩選）

```
Collection: leaderboard
Fields:
  - difficulty (Ascending)
  - poolType (Ascending)
  - questionMode (Ascending)
  - score (Descending)
  - timeUsed (Ascending)
```

### 2. Fallback 排行榜查詢（舊資料相容）

```
Collection: leaderboard
Fields:
  - difficulty (Ascending)
  - questionMode (Ascending)
  - score (Descending)
  - timeUsed (Ascending)
```

### 部署索引

使用 Firebase CLI 部署索引：

```bash
firebase deploy --only firestore:indexes
```

或者直接在 Firebase Console 中點擊錯誤訊息提供的連結來創建索引。

## 注意事項

1. **公開排行榜**: 此專案使用公開排行榜，不需要使用者驗證即可提交成績
2. **防濫用**: 目前無速率限制，建議後續加入 Firebase App Check 或其他防濫用機制
3. **資料完整性**: 前端會在提交前檢查 TOP10 資格，但規則層面不驗證排名
