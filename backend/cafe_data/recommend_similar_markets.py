'''
2024-01-04 by 이경민,김태원
예비창업자(요식업)를 위한 추천시스템 만들기
2022년 기준 데이터 사용
=======================
사용하는 변수:
    features = ['Monthly_Average_Sales', 'Workplace', 'Resident',
                    'Male','Female',
                    'Age_Group_10s', 'Age_Group_20s','Age_Group_30s', 'Age_Group_40s', 'Age_Group_50s', 'Age_Group_60s']
함수 인수 설명:               
    final_data : input data
    service_name : 업종선택 (한국)
    locations : 자치구 선택(중복가능, 리스트형태)
    user_preferences : features에 맞게 dict으로 입력
    n : n개의 상권 추천

사용:
    result_data = recommend_similar_markets(final_data, '한식음식점', ['송파구', '마포구', '관악구'], {
        'Monthly_Average_Sales': 336031,
        'Workplace': 60,
        'Resident': 40,
        'Male': 55,
        'Female': 45,
        'Age_Group_10s': 0,
        'Age_Group_20s': 0,
        'Age_Group_30s': 1,
        'Age_Group_40s': 0,
        'Age_Group_50s': 0,
        'Age_Group_60s': 0,
    }, n=5)

'''
import numpy as np
import pandas as pd
from fuzzywuzzy import fuzz as fw_fuzz
import skfuzzy as fuzz
from .models import Sales

def get_sales_data():
    sales_objects = Sales.objects.all()

    data_dict = {
        'New_Column': [],
        'Commercial_Code': [],
        'Service_Industry_Name': [],
        'Administrative_District':[],
        'Deposit_Amount': [],
        'Monthly_Rent': [],
        'Workplace': [],
        'Resident': [],
        'Male': [],
        'Female': [],
        'Monthly_Average_Sales': [],
        'Age_Group_10s': [],
        'Age_Group_20s': [],
        'Age_Group_30s': [],
        'Age_Group_40s': [],
        'Age_Group_50s': [],
        'Age_Group_60s': [],
    }

    # 데이터를 딕셔너리에 저장합니다.
    for item in sales_objects:
        data_dict['New_Column'].append(item.new_column)
        data_dict['Commercial_Code'].append(item.commercial_code)
        data_dict['Service_Industry_Name'].append(item.service_industry_name)
        data_dict['Administrative_District'].append(item.administrative_district)
        data_dict['Deposit_Amount'].append(item.deposit_amount)
        data_dict['Monthly_Rent'].append(item.monthly_rent)
        data_dict['Workplace'].append(item.workplace)
        data_dict['Resident'].append(item.resident)
        data_dict['Male'].append(item.male)
        data_dict['Female'].append(item.female)
        data_dict['Monthly_Average_Sales'].append(item.monthly_average_sales)
        data_dict['Age_Group_10s'].append(item.age_group_10s)
        data_dict['Age_Group_20s'].append(item.age_group_20s)
        data_dict['Age_Group_30s'].append(item.age_group_30s)
        data_dict['Age_Group_40s'].append(item.age_group_40s)
        data_dict['Age_Group_50s'].append(item.age_group_50s)
        data_dict['Age_Group_60s'].append(item.age_group_60s)

    # 데이터를 DataFrame으로 변환합니다.
    return pd.DataFrame(data_dict)

# DataFrame 생성
final_data = get_sales_data()

print(final_data)

def recommend_similar_markets(service_name, locations, user_preferences, n=5):
    fuzzy_df = final_data[final_data['Service_Industry_Name'] == service_name]
    fuzzy_df2 = fuzzy_df[fuzzy_df['Administrative_District'].isin(locations)]
    fuzzy_df3 = fuzzy_df2.set_index('Commercial_Code')
 
    features = [ 'Workplace', 'Resident',
                'Male','Female',
                'Age_Group_20s','Age_Group_30s', 'Age_Group_40s', 'Age_Group_50s', 'Age_Group_60s']
    data_matrix = fuzzy_df3[features].values.T
 
    num_clusters = 5
    cntr, u, _, _, _, _, _ = fuzz.cluster.cmeans(
        data_matrix,
        num_clusters,
        m=2,
        error=0.005,
        maxiter=1000,
        init=None
    )
 
    user_df = pd.DataFrame(user_preferences, index=[0])
    newdata = user_df.values.T
 
    cntr1, u1, _, _, _, _ = fuzz.cluster.cmeans_predict(newdata, cntr, m=2, error=0.005, maxiter=1000)
 
    user_membership = np.argmax(u1, axis=0)
    user_cluster = user_membership[0]
    print('user_cluster:',user_cluster)
 
    similar_markets_indices = np.where(u[user_cluster] > 0.94)[0]
 
    columns = final_data.columns.tolist()
    origin = pd.DataFrame(columns=columns)
    recommended_results = pd.DataFrame(columns=columns)
 
    for index in similar_markets_indices:
        market_code = fuzzy_df3.index[index]
        cluster_membership_prob = u[user_cluster, index]
 
        original_data = fuzzy_df2[fuzzy_df2['Commercial_Code'] == market_code]
        origin = pd.concat([origin, original_data], ignore_index=True)
        origin.loc[len(origin) - 1, 'percentage'] = cluster_membership_prob  # percentage 추가
 
    # percentage을 기준으로 내림차순으로 정렬
    sorted_origin = origin.sort_values(by='percentage', ascending=False)
 
    # 상위 n개의 결과만 유지
    recommended_results = sorted_origin.head(n)
 
    # 만약 추천된 결과가 n개 미만이라면 추가로 추천을 받음
    while len(recommended_results) < n:
        print(f'추천 결과가 {n}개 보다 적어 추가로 추천받습니다.')
        additional_results = recommended_results.copy()
        # 기존에 선택된 결과 제외하고 다시 추천
        fuzzy_df3 = fuzzy_df3.drop(fuzzy_df3.index.intersection(additional_results['Commercial_Code']))
        similar_markets_indices = np.where(u[user_cluster] > 0.94)[0]
 
        for index in similar_markets_indices:
            market_code = fuzzy_df3.index[index]
            cluster_membership_prob = u[user_cluster, index]
 
            original_data = fuzzy_df2[fuzzy_df2['Commercial_Code'] == market_code]
            additional_results = pd.concat([additional_results, original_data], ignore_index=True)
            additional_results.loc[len(additional_results) - 1, 'percentage'] = cluster_membership_prob  # percentage 추가
 
        # percentage을 기준으로 내림차순으로 정렬하여 상위 n개만 다시 선택
        additional_results = additional_results.sort_values(by='percentage', ascending=False)
        recommended_results = additional_results.head(n)
       
    return recommended_results


