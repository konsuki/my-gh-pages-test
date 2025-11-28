'use server'; // これにより、このファイル内の関数は必ずサーバーで実行されます

import { GoogleGenerativeAI } from "@google/generative-ai";

// 環境変数からキーを取得
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function searchCommentsWithGemini(keyword, comments) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("API Key not configured on server");
    }

    // モデルの準備
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    // ※ gemini-2.5... はまだSDKで安定していない場合があるため、一旦標準的なモデルか、
    // 必要であれば文字列で指定してください。

    // プロンプトの作成（ロジックをサーバー側に移動）
    // 最初の500件のコメントのみを抽出してJSON化
    const commentsToAnalyze = comments.slice(0, 500);
    const commentsString = JSON.stringify(commentsToAnalyze, null, 2);

    const prompt = `
    以下の【コメント配列】の中から、textプロパティの値に"${keyword}"が含まれるオブジェクトのみを抽出してください。
    
    【制約事項】
    1. 結果は抽出されたオブジェクトの配列を含むJSON文字列として、他の説明文やマークダウン( \`\`\`json 等)を付けずに**そのまま出力**してください。
    2. 抽出対象は、必ずtextプロパティにキーワードが含まれているものに限定してください。

    【コメント配列】
    ${commentsString}
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // 不要なマークダウン記号が含まれていたら削除する簡単なクリーニング
        const cleanedText = text.replace(/```json|```/g, '').trim();

        return { success: true, data: cleanedText };
    } catch (error) {
        console.error("Gemini API Error:", error);
        return { success: false, error: error.message };
    }
}