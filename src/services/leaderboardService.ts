import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import type { LeaderboardEntry, DifficultyName, QuestionMode } from '../types';

const COLLECTION_NAME = 'leaderboard';
const TOP_LIMIT = 10;

// 將 Firestore 文件轉換為 LeaderboardEntry
const docToEntry = (doc: { id: string; data: () => Record<string, unknown> }): LeaderboardEntry => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name as string,
    score: data.score as number,
    timeUsed: data.timeUsed as number,
    difficulty: data.difficulty as DifficultyName,
    questionMode: data.questionMode as QuestionMode,
    selectedTables: (data.selectedTables as number[]) || [2, 3, 4, 5, 6, 7, 8, 9],
    timestamp: (data.timestamp as Timestamp)?.toDate() || new Date(),
  };
};

// 提交成績到排行榜
export const submitScore = async (
  entry: Omit<LeaderboardEntry, 'id' | 'timestamp'>
): Promise<string | null> => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase 未設定，無法提交成績');
    return null;
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...entry,
      timestamp: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('提交成績失敗:', error);
    throw error;
  }
};

// 取得指定難度和題型的 TOP10 排行榜
export const getLeaderboard = async (
  difficulty: DifficultyName,
  questionMode: QuestionMode
): Promise<LeaderboardEntry[]> => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase 未設定，無法取得排行榜');
    return [];
  }

  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('difficulty', '==', difficulty),
      where('questionMode', '==', questionMode),
      orderBy('score', 'desc'),
      orderBy('timeUsed', 'asc'),
      limit(TOP_LIMIT)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToEntry);
  } catch (error) {
    console.error('取得排行榜失敗:', error);
    throw error;
  }
};

// 檢查成績是否能進入 TOP10
export const checkIfTop10 = async (
  difficulty: DifficultyName,
  questionMode: QuestionMode,
  score: number,
  timeUsed: number
): Promise<boolean> => {
  if (!isFirebaseConfigured()) {
    return false;
  }

  try {
    const leaderboard = await getLeaderboard(difficulty, questionMode);

    // 如果排行榜不滿 10 人，直接可以進入
    if (leaderboard.length < TOP_LIMIT) {
      return true;
    }

    // 比較最後一名
    const lastEntry = leaderboard[leaderboard.length - 1];

    // 分數更高則進入
    if (score > lastEntry.score) {
      return true;
    }

    // 分數相同但時間更短則進入
    if (score === lastEntry.score && timeUsed < lastEntry.timeUsed) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('檢查 TOP10 失敗:', error);
    return false;
  }
};

// 按玩家名稱查詢成績記錄
export const searchByName = async (
  name: string,
  difficulty?: DifficultyName,
  questionMode?: QuestionMode
): Promise<LeaderboardEntry[]> => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase 未設定，無法查詢成績');
    return [];
  }

  if (!name.trim()) {
    return [];
  }

  try {
    // 建立基本查詢
    let q;
    if (difficulty && questionMode) {
      q = query(
        collection(db, COLLECTION_NAME),
        where('name', '==', name.trim()),
        where('difficulty', '==', difficulty),
        where('questionMode', '==', questionMode),
        orderBy('score', 'desc'),
        orderBy('timeUsed', 'asc'),
        limit(20)
      );
    } else if (difficulty) {
      q = query(
        collection(db, COLLECTION_NAME),
        where('name', '==', name.trim()),
        where('difficulty', '==', difficulty),
        orderBy('score', 'desc'),
        orderBy('timeUsed', 'asc'),
        limit(20)
      );
    } else if (questionMode) {
      q = query(
        collection(db, COLLECTION_NAME),
        where('name', '==', name.trim()),
        where('questionMode', '==', questionMode),
        orderBy('score', 'desc'),
        orderBy('timeUsed', 'asc'),
        limit(20)
      );
    } else {
      q = query(
        collection(db, COLLECTION_NAME),
        where('name', '==', name.trim()),
        orderBy('timestamp', 'desc'),
        limit(20)
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToEntry);
  } catch (error) {
    console.error('查詢玩家成績失敗:', error);
    throw error;
  }
};

// 取得玩家在排行榜中的名次（1-based，0 表示未上榜）
export const getRank = async (
  difficulty: DifficultyName,
  questionMode: QuestionMode,
  score: number,
  timeUsed: number
): Promise<number> => {
  if (!isFirebaseConfigured()) {
    return 0;
  }

  try {
    const leaderboard = await getLeaderboard(difficulty, questionMode);

    for (let i = 0; i < leaderboard.length; i++) {
      const entry = leaderboard[i];
      if (score > entry.score) {
        return i + 1;
      }
      if (score === entry.score && timeUsed < entry.timeUsed) {
        return i + 1;
      }
    }

    // 如果排行榜不滿，排在最後
    if (leaderboard.length < TOP_LIMIT) {
      return leaderboard.length + 1;
    }

    return 0; // 未上榜
  } catch (error) {
    console.error('取得名次失敗:', error);
    return 0;
  }
};
