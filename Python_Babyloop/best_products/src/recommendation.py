import requests
import pandas as pd
from sklearn.preprocessing import MinMaxScaler


def fetch_and_clean_data(api_url: str) -> pd.DataFrame:
    response = requests.get(api_url)
    json_data = response.json()
    # 현재 json_data 구조:
    # {
    #   "message": "success",
    #   "data": [ { "productName": "...", "likeCount": 10, ... }, ... ]
    # }

    # 1) 실제 리스트는 json_data["data"] 안에 있음
    products = json_data["data"]

    # 2) DataFrame 생성
    df = pd.DataFrame(products)
    # df.columns -> ["productName", "likeCount", "rentalCount", "viewCount", "ratingAvg"]

    # 3) 스네이크 케이스로 컬럼명 변환 (원래 코드가 like_count 등을 가정했다면)
    df = df.rename(
        columns={
            "productName": "product_name",
            "likeCount": "like_count",
            "rentalCount": "rental_count",
            "viewCount": "view_count",
            "ratingAvg": "rating_avg",
        }
    )

    # 4) 결측치는 0으로, 음수 제거
    df["like_count"] = df["like_count"].fillna(0)
    df["rental_count"] = df["rental_count"].fillna(0)
    df["view_count"] = df["view_count"].fillna(0)
    df["rating_avg"] = df["rating_avg"].fillna(0)

    df = df[
        (df["like_count"] >= 0)
        & (df["rental_count"] >= 0)
        & (df["view_count"] >= 0)
        & (df["rating_avg"] >= 0)
    ]

    return df


def get_popularity_recommendations(df: pd.DataFrame, top_n: int = 10) -> pd.DataFrame:
    """
    정규화 후 popularity_score(인기 점수)를 계산하여
    상위 N개의 상품을 반환한다.
    """
    if df.empty:
        return pd.DataFrame()  # 데이터가 비어 있으면 빈 결과 반환

    # 원본 보존을 위해 복사
    df_scaled = df.copy()

    # 1) MinMaxScaler로 정규화
    scaler = MinMaxScaler()
    df_scaled[["view_count", "like_count", "rental_count", "rating_avg"]] = (
        scaler.fit_transform(
            df_scaled[["view_count", "like_count", "rental_count", "rating_avg"]]
        )
    )

    # 2) 인기 점수 계산 (예: 평점에 가중치 2배)
    df_scaled["popularity_score"] = (
        df_scaled["view_count"]
        + df_scaled["like_count"]
        + df_scaled["rental_count"]
        + df_scaled["rating_avg"] * 2.0
    )

    # 3) popularity_score 내림차순 정렬 후 상위 N개 추출
    df_sorted = df_scaled.sort_values("popularity_score", ascending=False)
    return df_sorted.head(top_n)
