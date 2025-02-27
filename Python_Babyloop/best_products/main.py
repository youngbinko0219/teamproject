from fastapi import FastAPI
from src.recommendation import fetch_and_clean_data, get_popularity_recommendations

app = FastAPI()

# 실제 상품 데이터를 제공하는 API 주소 (예시)
API_URL = "http://localhost:8080/popularity"


@app.get("/recommend")
def recommend_products(top_n: int = 4):
    # 1) API에서 데이터 불러오기 & 전처리
    df = fetch_and_clean_data(API_URL)

    # 2) 인기 기반 추천
    recommended_df = get_popularity_recommendations(df, top_n)

    # 3) 결과를 JSON 형태로 반환
    return recommended_df.to_dict(orient="records")


if __name__ == "__main__":
    import uvicorn

    # 로컬 개발용 서버 실행
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
