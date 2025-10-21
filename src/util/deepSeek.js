const DEEPSEEK_API_KEY = 'sk-c30433f8819045efa0e9ca003e276f27'; // 替换为你的 DeepSeek API Key
 
/**
 * 调用 DeepSeek API 示例
 * @param {Object} data 请求参数
 * @returns {Promise} API 响应
 */
export function postStream(data) {
  return fetch('https://api.deepseek.com/chat/completions', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
  }
})
}