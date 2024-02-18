import express, { json } from 'express';
import fetch from 'node-fetch';
const app = express();
const PORT = process.env.PORT || 3000;

// API 요청을 위한 기본 설정
const API_BASE_URL = 'https://api.clashofclans.com';
const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjkxNzk2YjhjLTZlZmYtNDI3YS1iNjhkLWEwYTI0ZWUwZDZjOSIsImlhdCI6MTcwODEyOTY1Miwic3ViIjoiZGV2ZWxvcGVyLzc1ZjdjNmU1LTllMDMtZmI5OS0yMWQwLTkwOWRmNmNhM2Q1YSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjIxMS4yMDAuMjEzLjQyIl0sInR5cGUiOiJjbGllbnQifV19.SN-nu7oS8GE_Va0VvotZZejSRrlSpdz--PsA2b1mxjwOcDDlsrkcjNnL4J-JcEM6U8xkhc4kF7_Elgca70PGEw'; // 실제 API 키로 대체하세요.

app.use(json());

// 클라이언트로부터 오는 모든 '/api/*' 요청을 실제 API로 프록시합니다.
app.use('/api', async (req, res) => {
    const url = `${API_BASE_URL}${req.url}`;
    try {
        const apiResponse = await fetch(url, {
            method: 'GET', // 또는 req.method로 동적으로 설정 가능
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });
        const data = await apiResponse.json();
        res.send(data);
    } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        res.status(500).send('서버 오류');
    }
});

app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
