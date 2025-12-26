/**
 * 敘述題型題庫 - 100+種乘法應用題模板
 * 每個模板使用 {num1} 和 {num2} 作為數字佔位符
 * unit: 答案的單位
 * category: 題目分類，方便未來擴充篩選
 * type: 題目類型
 *   - 'standard': 標準乘法題 (num1 × num2 = answer)
 *   - 'comparison': 倍數比較題 ({num1}的{larger}倍比{num1}的{smaller}倍多多少，答案 = num1 × num2，其中 num2 = larger - smaller)
 *   - 'comparison_less': 反向倍數比較題 ({num1}的{smaller}倍比{num1}的{larger}倍少多少，答案同上)
 *   - 'combination': 相同數量合併題 (多個相同數量合併，答案 = num1 × num2，num2 為數量個數)
 *   - 'double': 求兩倍題 ({num1}的2倍是多少，答案 = num1 × 2)
 */

// 題目類型
export type NarrativeTemplateType = 'standard' | 'comparison' | 'comparison_less' | 'combination' | 'double';

export interface NarrativeTemplate {
  id: number;
  template: string;
  unit: string;
  category: string;
  type?: NarrativeTemplateType; // 預設為 'standard'
  fixedNum1?: number; // 用於固定 num1 值（例如：一週=7天）
  fixedNum2?: number; // 用於 combination 題型，指定固定的 num2 值（例如：兩人=2, 三人=3）
}

export const NARRATIVE_TEMPLATES: NarrativeTemplate[] = [
  // ===== 學校/教室場景 (1-15) =====
  {
    id: 1,
    template: '教室裡有{num1}排座位，每排有{num2}個座位，請問教室總共有幾個座位？',
    unit: '個',
    category: '學校',
  },
  {
    id: 2,
    template: '老師發給每位學生{num1}張貼紙，班上有{num2}位學生，請問老師總共發出幾張貼紙？',
    unit: '張',
    category: '學校',
  },
  {
    id: 3,
    template: '學校有{num1}間教室，每間教室有{num2}扇窗戶，請問學校總共有幾扇窗戶？',
    unit: '扇',
    category: '學校',
  },
  {
    id: 4,
    template: '圖書館有{num1}個書架，每個書架放了{num2}本書，請問圖書館總共有幾本書？',
    unit: '本',
    category: '學校',
  },
  {
    id: 5,
    template: '美術課上每位學生用了{num1}枝蠟筆，有{num2}位學生，請問總共用了幾枝蠟筆？',
    unit: '枝',
    category: '學校',
  },
  {
    id: 6,
    template: '學校合唱團有{num1}個小組，每組有{num2}個人，請問合唱團總共有幾個人？',
    unit: '個人',
    category: '學校',
  },
  {
    id: 7,
    template: '老師每天批改{num1}份作業，連續批改{num2}天，請問總共批改了幾份作業？',
    unit: '份',
    category: '學校',
  },
  {
    id: 8,
    template: '學校有{num1}層樓，每層樓有{num2}盞燈，請問學校總共有幾盞燈？',
    unit: '盞',
    category: '學校',
  },
  {
    id: 9,
    template: '課本有{num1}個單元，每個單元有{num2}頁，請問課本總共有幾頁？',
    unit: '頁',
    category: '學校',
  },
  {
    id: 10,
    template: '學校操場每天有{num1}個班級上體育課，連續{num2}天，請問總共有幾個班級上過體育課？',
    unit: '個班級',
    category: '學校',
  },
  {
    id: 11,
    template: '每個書包裝了{num1}本課本，班上有{num2}個書包，請問總共有幾本課本？',
    unit: '本',
    category: '學校',
  },
  {
    id: 12,
    template: '學校餐廳有{num1}張桌子，每張桌子坐{num2}個人，請問餐廳最多坐幾個人？',
    unit: '個人',
    category: '學校',
  },
  {
    id: 13,
    template: '老師每週上{num1}節課，連續上了{num2}週，請問總共上了幾節課？',
    unit: '節',
    category: '學校',
  },
  {
    id: 14,
    template: '黑板上貼了{num1}排獎狀，每排有{num2}張，請問總共有幾張獎狀？',
    unit: '張',
    category: '學校',
  },
  {
    id: 15,
    template: '班級閱讀比賽，每人讀{num1}本書，{num2}人參加，請問總共讀了幾本書？',
    unit: '本',
    category: '學校',
  },

  // ===== 購物場景 (16-30) =====
  {
    id: 16,
    template: '媽媽買了{num1}盒雞蛋，每盒有{num2}顆，請問總共買了幾顆雞蛋？',
    unit: '顆',
    category: '購物',
  },
  {
    id: 17,
    template: '一枝鉛筆{num1}元，小明買了{num2}枝，請問總共要付幾元？',
    unit: '元',
    category: '購物',
  },
  {
    id: 18,
    template: '超市有{num1}個貨架，每個貨架放了{num2}瓶飲料，請問總共有幾瓶飲料？',
    unit: '瓶',
    category: '購物',
  },
  {
    id: 19,
    template: '一包餅乾{num1}元，妹妹買了{num2}包，請問總共花了幾元？',
    unit: '元',
    category: '購物',
  },
  {
    id: 20,
    template: '水果店有{num1}箱蘋果，每箱有{num2}顆，請問總共有幾顆蘋果？',
    unit: '顆',
    category: '購物',
  },
  {
    id: 21,
    template: '糖果店每包糖果有{num1}顆，小華買了{num2}包，請問總共有幾顆糖果？',
    unit: '顆',
    category: '購物',
  },
  {
    id: 22,
    template: '一本漫畫書{num1}元，弟弟買了{num2}本，請問總共花了幾元？',
    unit: '元',
    category: '購物',
  },
  {
    id: 23,
    template: '文具店有{num1}盒彩色筆，每盒有{num2}枝，請問總共有幾枝彩色筆？',
    unit: '枝',
    category: '購物',
  },
  {
    id: 24,
    template: '一個麵包{num1}元，爸爸買了{num2}個，請問總共花了幾元？',
    unit: '元',
    category: '購物',
  },
  {
    id: 25,
    template: '玩具店每個機器人{num1}元，哥哥買了{num2}個，請問總共要幾元？',
    unit: '元',
    category: '購物',
  },
  {
    id: 26,
    template: '一包面紙有{num1}張，媽媽買了{num2}包，請問總共有幾張面紙？',
    unit: '張',
    category: '購物',
  },
  {
    id: 27,
    template: '書店每本故事書{num1}元，姐姐買了{num2}本，請問總共花了幾元？',
    unit: '元',
    category: '購物',
  },
  {
    id: 28,
    template: '一袋橘子有{num1}顆，奶奶買了{num2}袋，請問總共買了幾顆橘子？',
    unit: '顆',
    category: '購物',
  },
  {
    id: 29,
    template: '一瓶牛奶{num1}元，每天買{num2}瓶，連續買幾天共要幾元？答：{num2}天共{num1}×{num2}=',
    unit: '元',
    category: '購物',
  },
  {
    id: 30,
    template: '每盒巧克力有{num1}塊，禮盒裝了{num2}盒，請問總共有幾塊巧克力？',
    unit: '塊',
    category: '購物',
  },

  // ===== 動物場景 (31-45) =====
  {
    id: 31,
    template: '農場裡有{num1}隻母雞，每隻母雞生了{num2}顆蛋，請問總共有幾顆蛋？',
    unit: '顆',
    category: '動物',
  },
  {
    id: 32,
    template: '動物園有{num1}個籠子，每個籠子裡有{num2}隻兔子，請問總共有幾隻兔子？',
    unit: '隻',
    category: '動物',
  },
  {
    id: 33,
    template: '池塘裡有{num1}群鴨子，每群有{num2}隻，請問池塘總共有幾隻鴨子？',
    unit: '隻',
    category: '動物',
  },
  {
    id: 34,
    template: '牧場有{num1}匹馬，每匹馬每天吃{num2}公斤草，請問每天總共吃幾公斤草？',
    unit: '公斤',
    category: '動物',
  },
  {
    id: 35,
    template: '魚缸裡有{num1}層，每層游著{num2}條魚，請問魚缸總共有幾條魚？',
    unit: '條',
    category: '動物',
  },
  {
    id: 36,
    template: '蜂窩裡有{num1}隻蜜蜂，每隻蜜蜂採了{num2}朵花，請問總共採了幾朵花？',
    unit: '朵',
    category: '動物',
  },
  {
    id: 37,
    template: '寵物店有{num1}籠小鳥，每籠有{num2}隻，請問總共有幾隻小鳥？',
    unit: '隻',
    category: '動物',
  },
  {
    id: 38,
    template: '農場有{num1}頭牛，每頭牛每天產{num2}公升牛奶，請問每天總共產幾公升牛奶？',
    unit: '公升',
    category: '動物',
  },
  {
    id: 39,
    template: '樹上有{num1}個鳥巢，每個鳥巢有{num2}隻小鳥，請問總共有幾隻小鳥？',
    unit: '隻',
    category: '動物',
  },
  {
    id: 40,
    template: '狗媽媽生了{num1}窩小狗，每窩有{num2}隻，請問總共生了幾隻小狗？',
    unit: '隻',
    category: '動物',
  },
  {
    id: 41,
    template: '蝴蝶園有{num1}區，每區有{num2}隻蝴蝶，請問總共有幾隻蝴蝶？',
    unit: '隻',
    category: '動物',
  },
  {
    id: 42,
    template: '螞蟻窩有{num1}條通道，每條通道有{num2}隻螞蟻，請問總共有幾隻螞蟻？',
    unit: '隻',
    category: '動物',
  },
  {
    id: 43,
    template: '豬圈有{num1}間，每間住了{num2}隻豬，請問總共有幾隻豬？',
    unit: '隻',
    category: '動物',
  },
  {
    id: 44,
    template: '青蛙每天跳{num1}次，連續跳了{num2}天，請問總共跳了幾次？',
    unit: '次',
    category: '動物',
  },
  {
    id: 45,
    template: '每隻章魚有{num1}條觸手，海裡有{num2}隻章魚，請問總共有幾條觸手？',
    unit: '條',
    category: '動物',
  },

  // ===== 運動/比賽場景 (46-60) =====
  {
    id: 46,
    template: '運動會趣味比賽要{num1}個人一組，總共有{num2}組參加，請問共有幾個人參加？',
    unit: '個人',
    category: '運動',
  },
  {
    id: 47,
    template: '籃球隊每週練習{num1}次，連續練習{num2}週，請問總共練習了幾次？',
    unit: '次',
    category: '運動',
  },
  {
    id: 48,
    template: '游泳比賽有{num1}個泳道，每個泳道有{num2}位選手，請問總共有幾位選手？',
    unit: '位',
    category: '運動',
  },
  {
    id: 49,
    template: '足球隊有{num1}隊，每隊有{num2}名球員，請問總共有幾名球員？',
    unit: '名',
    category: '運動',
  },
  {
    id: 50,
    template: '跑步比賽每圈{num1}公尺，小明跑了{num2}圈，請問總共跑了幾公尺？',
    unit: '公尺',
    category: '運動',
  },
  {
    id: 51,
    template: '羽毛球比賽每場用{num1}個羽毛球，今天打了{num2}場，請問總共用了幾個羽毛球？',
    unit: '個',
    category: '運動',
  },
  {
    id: 52,
    template: '體育館有{num1}排觀眾席，每排有{num2}個座位，請問總共有幾個座位？',
    unit: '個',
    category: '運動',
  },
  {
    id: 53,
    template: '拔河比賽每隊{num1}人，共有{num2}隊，請問總共有幾人參加？',
    unit: '人',
    category: '運動',
  },
  {
    id: 54,
    template: '跳繩比賽每人跳{num1}下，有{num2}人參加，請問總共跳了幾下？',
    unit: '下',
    category: '運動',
  },
  {
    id: 55,
    template: '乒乓球桌有{num1}張，每張桌子{num2}人打，請問總共有幾人在打乒乓球？',
    unit: '人',
    category: '運動',
  },
  {
    id: 56,
    template: '接力賽每隊跑{num1}棒，共有{num2}隊，請問總共跑了幾棒？',
    unit: '棒',
    category: '運動',
  },
  {
    id: 57,
    template: '健身房有{num1}台跑步機，每台每天使用{num2}小時，請問總共使用幾小時？',
    unit: '小時',
    category: '運動',
  },
  {
    id: 58,
    template: '舞蹈班每次練習{num1}分鐘，練習了{num2}次，請問總共練習了幾分鐘？',
    unit: '分鐘',
    category: '運動',
  },
  {
    id: 59,
    template: '溜冰場每小時容納{num1}人，開放{num2}小時，請問總共可容納幾人次？',
    unit: '人次',
    category: '運動',
  },
  {
    id: 60,
    template: '獎牌架上有{num1}排獎牌，每排{num2}面，請問總共有幾面獎牌？',
    unit: '面',
    category: '運動',
  },

  // ===== 食物場景 (61-75) =====
  {
    id: 61,
    template: '蛋糕店每天烤{num1}個蛋糕，連續烤了{num2}天，請問總共烤了幾個蛋糕？',
    unit: '個',
    category: '食物',
  },
  {
    id: 62,
    template: '披薩切成{num1}片，訂了{num2}個披薩，請問總共有幾片披薩？',
    unit: '片',
    category: '食物',
  },
  {
    id: 63,
    template: '便當店每個便當裝{num1}道菜，今天賣了{num2}個便當，請問總共賣出幾道菜？',
    unit: '道',
    category: '食物',
  },
  {
    id: 64,
    template: '包子店每籠有{num1}個包子，賣了{num2}籠，請問總共賣了幾個包子？',
    unit: '個',
    category: '食物',
  },
  {
    id: 65,
    template: '壽司盤上有{num1}個壽司，點了{num2}盤，請問總共有幾個壽司？',
    unit: '個',
    category: '食物',
  },
  {
    id: 66,
    template: '冰淇淋店每杯放{num1}球冰淇淋，賣了{num2}杯，請問總共賣出幾球冰淇淋？',
    unit: '球',
    category: '食物',
  },
  {
    id: 67,
    template: '餃子每盤{num1}個，點了{num2}盤，請問總共有幾個餃子？',
    unit: '個',
    category: '食物',
  },
  {
    id: 68,
    template: '果汁店每天榨{num1}杯果汁，榨了{num2}天，請問總共榨了幾杯果汁？',
    unit: '杯',
    category: '食物',
  },
  {
    id: 69,
    template: '烤肉架上每次烤{num1}串肉，烤了{num2}次，請問總共烤了幾串肉？',
    unit: '串',
    category: '食物',
  },
  {
    id: 70,
    template: '雞蛋糕一份{num1}個，買了{num2}份，請問總共有幾個雞蛋糕？',
    unit: '個',
    category: '食物',
  },
  {
    id: 71,
    template: '巧克力盒每盒有{num1}顆，送了{num2}盒給朋友，請問總共送出幾顆巧克力？',
    unit: '顆',
    category: '食物',
  },
  {
    id: 72,
    template: '三明治切成{num1}塊，做了{num2}個三明治，請問總共有幾塊？',
    unit: '塊',
    category: '食物',
  },
  {
    id: 73,
    template: '飯糰店每天做{num1}個飯糰，連續做了{num2}天，請問總共做了幾個飯糰？',
    unit: '個',
    category: '食物',
  },
  {
    id: 74,
    template: '薯條一份有{num1}根，買了{num2}份，請問總共有幾根薯條？',
    unit: '根',
    category: '食物',
  },
  {
    id: 75,
    template: '月餅禮盒每盒{num1}個，準備了{num2}盒，請問總共有幾個月餅？',
    unit: '個',
    category: '食物',
  },

  // ===== 交通場景 (76-85) =====
  {
    id: 76,
    template: '公車每次載{num1}位乘客，今天開了{num2}趟，請問總共載了幾位乘客？',
    unit: '位',
    category: '交通',
  },
  {
    id: 77,
    template: '火車有{num1}節車廂，每節車廂有{num2}個座位，請問火車總共有幾個座位？',
    unit: '個',
    category: '交通',
  },
  {
    id: 78,
    template: '停車場有{num1}層，每層停{num2}輛車，請問停車場最多停幾輛車？',
    unit: '輛',
    category: '交通',
  },
  {
    id: 79,
    template: '腳踏車每小時騎{num1}公里，騎了{num2}小時，請問總共騎了幾公里？',
    unit: '公里',
    category: '交通',
  },
  {
    id: 80,
    template: '飛機有{num1}排座位，每排{num2}個座位，請問飛機總共有幾個座位？',
    unit: '個',
    category: '交通',
  },
  {
    id: 81,
    template: '捷運每天有{num1}班次，連續{num2}天，請問總共有幾班次？',
    unit: '班次',
    category: '交通',
  },
  {
    id: 82,
    template: '校車每趟載{num1}人，今天跑了{num2}趟，請問總共載了幾人？',
    unit: '人',
    category: '交通',
  },
  {
    id: 83,
    template: '汽車每公升油可跑{num1}公里，加了{num2}公升油，請問可以跑幾公里？',
    unit: '公里',
    category: '交通',
  },
  {
    id: 84,
    template: '遊覽車有{num1}輛，每輛坐{num2}人，請問總共可以坐幾人？',
    unit: '人',
    category: '交通',
  },
  {
    id: 85,
    template: '計程車一公里{num1}元，坐了{num2}公里，請問要付幾元？',
    unit: '元',
    category: '交通',
  },

  // ===== 家庭/生活場景 (86-95) =====
  {
    id: 86,
    template: '家裡有{num1}個房間，每個房間有{num2}盞燈，請問家裡總共有幾盞燈？',
    unit: '盞',
    category: '家庭',
  },
  {
    id: 87,
    template: '媽媽每天洗{num1}件衣服，連續洗了{num2}天，請問總共洗了幾件衣服？',
    unit: '件',
    category: '家庭',
  },
  {
    id: 88,
    template: '書架有{num1}層，每層放{num2}本書，請問書架總共放了幾本書？',
    unit: '本',
    category: '家庭',
  },
  {
    id: 89,
    template: '花園有{num1}排花，每排種了{num2}朵花，請問花園總共有幾朵花？',
    unit: '朵',
    category: '家庭',
  },
  {
    id: 90,
    template: '每個抽屜放{num1}雙襪子，有{num2}個抽屜，請問總共有幾雙襪子？',
    unit: '雙',
    category: '家庭',
  },
  {
    id: 91,
    template: '相框裡每張放{num1}張照片，有{num2}個相框，請問總共有幾張照片？',
    unit: '張',
    category: '家庭',
  },
  {
    id: 92,
    template: '爺爺每天走{num1}圈公園，走了{num2}天，請問總共走了幾圈？',
    unit: '圈',
    category: '家庭',
  },
  {
    id: 93,
    template: '弟弟每週練琴{num1}小時，練了{num2}週，請問總共練了幾小時？',
    unit: '小時',
    category: '家庭',
  },
  {
    id: 94,
    template: '垃圾桶每天收{num1}袋垃圾，收了{num2}天，請問總共收了幾袋垃圾？',
    unit: '袋',
    category: '家庭',
  },
  {
    id: 95,
    template: '每個窗戶掛{num1}串風鈴，家裡有{num2}個窗戶，請問總共有幾串風鈴？',
    unit: '串',
    category: '家庭',
  },

  // ===== 節日/特殊場景 (96-100) =====
  {
    id: 96,
    template: '中秋節每盒月餅有{num1}個，親戚送了{num2}盒，請問總共有幾個月餅？',
    unit: '個',
    category: '節日',
  },
  {
    id: 97,
    template: '聖誕樹上每層掛{num1}顆裝飾球，有{num2}層，請問總共掛了幾顆裝飾球？',
    unit: '顆',
    category: '節日',
  },
  {
    id: 98,
    template: '春節每個紅包裝{num1}元，包了{num2}個紅包，請問總共要準備幾元？',
    unit: '元',
    category: '節日',
  },
  {
    id: 99,
    template: '生日派對每位來賓送{num1}顆氣球，有{num2}位來賓，請問總共送出幾顆氣球？',
    unit: '顆',
    category: '節日',
  },
  {
    id: 100,
    template: '端午節每串粽子有{num1}顆，買了{num2}串，請問總共有幾顆粽子？',
    unit: '顆',
    category: '節日',
  },

  // ===== 數學概念場景 (101-120) =====
  // 倍數比較題型：{num1}的{larger}倍比{num1}的{smaller}倍多多少
  {
    id: 101,
    template: '{num1}的{larger}倍比{num1}的{smaller}倍多多少？',
    unit: '',
    category: '數學概念',
    type: 'comparison',
  },
  {
    id: 102,
    template: '小明有{num1}顆糖果的{larger}倍，小華有{num1}顆糖果的{smaller}倍，小明比小華多幾顆糖果？',
    unit: '顆',
    category: '數學概念',
    type: 'comparison',
  },
  {
    id: 103,
    template: '爸爸的年紀是{num1}歲的{larger}倍，媽媽的年紀是{num1}歲的{smaller}倍，爸爸比媽媽大幾歲？',
    unit: '歲',
    category: '數學概念',
    type: 'comparison',
  },
  {
    id: 104,
    template: '哥哥存了{num1}元的{larger}倍，弟弟存了{num1}元的{smaller}倍，哥哥比弟弟多存幾元？',
    unit: '元',
    category: '數學概念',
    type: 'comparison',
  },
  {
    id: 105,
    template: '甲班有{num1}人的{larger}倍，乙班有{num1}人的{smaller}倍，甲班比乙班多幾人？',
    unit: '人',
    category: '數學概念',
    type: 'comparison',
  },
  {
    id: 106,
    template: '大盒子裝了{num1}個球的{larger}倍，小盒子裝了{num1}個球的{smaller}倍，大盒子比小盒子多幾個球？',
    unit: '個',
    category: '數學概念',
    type: 'comparison',
  },
  {
    id: 107,
    template: '紅繩長{num1}公分的{larger}倍，藍繩長{num1}公分的{smaller}倍，紅繩比藍繩長幾公分？',
    unit: '公分',
    category: '數學概念',
    type: 'comparison',
  },
  {
    id: 108,
    template: '姐姐跑了{num1}圈的{larger}倍，妹妹跑了{num1}圈的{smaller}倍，姐姐比妹妹多跑幾圈？',
    unit: '圈',
    category: '數學概念',
    type: 'comparison',
  },

  // 相同數量合併題型：多個相同數量合併
  {
    id: 109,
    template: '哥哥有{num1}輛玩具車，弟弟也有{num1}輛玩具車，兩人共有幾輛玩具車？',
    unit: '輛',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 2,
  },
  {
    id: 110,
    template: '媽媽買了{num1}顆蘋果，爸爸也買了{num1}顆蘋果，一共買了幾顆蘋果？',
    unit: '顆',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 2,
  },
  {
    id: 111,
    template: '小明有{num1}張貼紙，小華有{num1}張貼紙，小美也有{num1}張貼紙，三人共有幾張貼紙？',
    unit: '張',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 3,
  },
  {
    id: 112,
    template: '姐姐存了{num1}元，妹妹也存了{num1}元，兩人共存了幾元？',
    unit: '元',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 2,
  },
  {
    id: 113,
    template: '甲組有{num1}人，乙組也有{num1}人，丙組也有{num1}人，丁組也有{num1}人，四組共有幾人？',
    unit: '人',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 4,
  },
  {
    id: 114,
    template: '第一天走了{num1}公里，第二天也走了{num1}公里，兩天共走了幾公里？',
    unit: '公里',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 2,
  },
  {
    id: 115,
    template: '奶奶給了{num1}顆糖，爺爺也給了{num1}顆糖，一共收到幾顆糖？',
    unit: '顆',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 2,
  },
  {
    id: 116,
    template: '每個書包有{num1}本書，班上有{num1}本書的{num2}倍，請問班上共有幾本書？',
    unit: '本',
    category: '數學概念',
  },
  {
    id: 117,
    template: '小狗每天吃{num1}碗飼料，連續{num2}天共吃幾碗飼料？',
    unit: '碗',
    category: '數學概念',
  },
  {
    id: 119,
    template: '每層樓有{num1}階樓梯，爬了{num2}層樓共爬幾階？',
    unit: '階',
    category: '數學概念',
  },
  {
    id: 120,
    template: '{num1}的{num2}倍是多少？',
    unit: '',
    category: '數學概念',
  },

  // ===== 延伸數學概念 (121-150) =====
  // 反向倍數比較題型：比...少多少
  {
    id: 121,
    template: '{num1}的{smaller}倍比{num1}的{larger}倍少多少？',
    unit: '',
    category: '數學概念',
    type: 'comparison_less',
  },
  {
    id: 122,
    template: '小華有{num1}顆糖果的{smaller}倍，小明有{num1}顆糖果的{larger}倍，小華比小明少幾顆糖果？',
    unit: '顆',
    category: '數學概念',
    type: 'comparison_less',
  },
  {
    id: 123,
    template: '妹妹存了{num1}元的{smaller}倍，哥哥存了{num1}元的{larger}倍，妹妹比哥哥少存幾元？',
    unit: '元',
    category: '數學概念',
    type: 'comparison_less',
  },
  {
    id: 124,
    template: '乙班有{num1}人的{smaller}倍，甲班有{num1}人的{larger}倍，乙班比甲班少幾人？',
    unit: '人',
    category: '數學概念',
    type: 'comparison_less',
  },
  {
    id: 125,
    template: '藍繩長{num1}公分的{smaller}倍，紅繩長{num1}公分的{larger}倍，藍繩比紅繩短幾公分？',
    unit: '公分',
    category: '數學概念',
    type: 'comparison_less',
  },

  // 更多相同數量合併變化（5人、6人版本）
  {
    id: 126,
    template: '小明有{num1}顆彈珠，小華有{num1}顆彈珠，小美有{num1}顆彈珠，小強有{num1}顆彈珠，小芳有{num1}顆彈珠，五人共有幾顆彈珠？',
    unit: '顆',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 5,
  },
  {
    id: 127,
    template: '一班有{num1}人，二班有{num1}人，三班有{num1}人，四班有{num1}人，五班有{num1}人，六班有{num1}人，六個班共有幾人？',
    unit: '人',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 6,
  },
  {
    id: 128,
    template: '星期一賣了{num1}個麵包，星期二也賣了{num1}個，星期三也賣了{num1}個，三天共賣了幾個麵包？',
    unit: '個',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 3,
  },
  {
    id: 129,
    template: '爸爸有{num1}本書，媽媽有{num1}本書，爺爺有{num1}本書，奶奶有{num1}本書，全家共有幾本書？',
    unit: '本',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 4,
  },
  {
    id: 130,
    template: '紅隊得{num1}分，藍隊也得{num1}分，黃隊也得{num1}分，綠隊也得{num1}分，紫隊也得{num1}分，五隊共得幾分？',
    unit: '分',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 5,
  },

  // 求兩倍題型
  {
    id: 131,
    template: '{num1}的2倍是多少？',
    unit: '',
    category: '數學概念',
    type: 'double',
  },
  {
    id: 132,
    template: '小明有{num1}元，他想存到現在的2倍，請問目標是幾元？',
    unit: '元',
    category: '數學概念',
    type: 'double',
  },
  {
    id: 133,
    template: '繩子長{num1}公分，接上同樣長的一段後，總長是幾公分？',
    unit: '公分',
    category: '數學概念',
    type: 'double',
  },
  {
    id: 134,
    template: '弟弟今年{num1}歲，明年弟弟的年紀加上今年的年紀是幾歲？',
    unit: '歲',
    category: '數學概念',
    type: 'double',
  },
  {
    id: 135,
    template: '籃子裡有{num1}顆蘋果，再放入同樣數量的蘋果後，共有幾顆？',
    unit: '顆',
    category: '數學概念',
    type: 'double',
  },

  // 倍數情境變化題
  {
    id: 137,
    template: '每包有{num1}片餅乾，買了{num2}包，共有幾片餅乾？',
    unit: '片',
    category: '數學概念',
  },
  {
    id: 138,
    template: '一盒有{num1}枝筆，{num2}盒共有幾枝筆？',
    unit: '枝',
    category: '數學概念',
  },
  {
    id: 139,
    template: '每人分到{num1}顆糖，{num2}人共分到幾顆糖？',
    unit: '顆',
    category: '數學概念',
  },
  {
    id: 140,
    template: '一週有7天，{num2}週共有幾天？',
    unit: '天',
    category: '數學概念',
    fixedNum1: 7,
  },

  // 更多倍數比較情境
  {
    id: 141,
    template: '大箱子裝了{num1}顆球的{larger}倍，小箱子裝了{num1}顆球的{smaller}倍，大箱子比小箱子多幾顆球？',
    unit: '顆',
    category: '數學概念',
    type: 'comparison',
  },
  {
    id: 142,
    template: '快車每小時跑{num1}公里的{larger}倍，慢車每小時跑{num1}公里的{smaller}倍，快車比慢車每小時多跑幾公里？',
    unit: '公里',
    category: '數學概念',
    type: 'comparison',
  },
  {
    id: 143,
    template: '甲工廠每天生產{num1}個零件的{larger}倍，乙工廠每天生產{num1}個零件的{smaller}倍，甲工廠比乙工廠每天多生產幾個零件？',
    unit: '個',
    category: '數學概念',
    type: 'comparison',
  },

  // 反向比較更多情境
  {
    id: 144,
    template: '小盒子裝了{num1}顆糖的{smaller}倍，大盒子裝了{num1}顆糖的{larger}倍，小盒子比大盒子少幾顆糖？',
    unit: '顆',
    category: '數學概念',
    type: 'comparison_less',
  },
  {
    id: 145,
    template: '弟弟走了{num1}步的{smaller}倍，哥哥走了{num1}步的{larger}倍，弟弟比哥哥少走幾步？',
    unit: '步',
    category: '數學概念',
    type: 'comparison_less',
  },

  // 兩人共有（另一種表達）
  {
    id: 146,
    template: '甲有{num1}個蘋果，乙的蘋果和甲一樣多，甲乙共有幾個蘋果？',
    unit: '個',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 2,
  },
  {
    id: 147,
    template: '上午賣出{num1}份早餐，下午也賣出{num1}份，一天共賣出幾份早餐？',
    unit: '份',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 2,
  },
  {
    id: 148,
    template: '左手拿{num1}顆彈珠，右手也拿{num1}顆彈珠，兩手共拿幾顆彈珠？',
    unit: '顆',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 2,
  },
  {
    id: 149,
    template: '第一次跳了{num1}下，第二次也跳了{num1}下，第三次又跳了{num1}下，總共跳了幾下？',
    unit: '下',
    category: '數學概念',
    type: 'combination',
    fixedNum2: 3,
  },
  {
    id: 150,
    template: '每層有{num1}個房間，這棟大樓有{num2}層，共有幾個房間？',
    unit: '個',
    category: '數學概念',
  },
];

// 獲取所有分類
export const NARRATIVE_CATEGORIES = [
  ...new Set(NARRATIVE_TEMPLATES.map((t) => t.category)),
];

// 根據分類獲取題目
export const getTemplatesByCategory = (category: string): NarrativeTemplate[] => {
  return NARRATIVE_TEMPLATES.filter((t) => t.category === category);
};

// 獲取隨機題目模板
export const getRandomTemplate = (
  categories?: string[]
): NarrativeTemplate => {
  const pool = categories?.length
    ? NARRATIVE_TEMPLATES.filter((t) => categories.includes(t.category))
    : NARRATIVE_TEMPLATES;
  return pool[Math.floor(Math.random() * pool.length)];
};
