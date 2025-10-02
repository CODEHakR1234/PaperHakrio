---
title: Classifier-Free Diffusion Guidance
year: 2022
description: Classifier 없이 Guidance를 확립할 수 있게 하는 기법 소개
arxiv: https://arxiv.org/pdf/2207.12598
github: https://github.com/lucidrains/classifier-free-guidance-pytorch?utm_source=chatgpt.com
tags:
  - CV
  - papers
  - "#SKKAI"
  - "#year-2025"
---

- 처음 제목을 읽었을 때는 classifier을 통해 diffusion sampling을 원하는 대로 보내는 사실 2번째 논문이지만 다음주에 읽는 그 논문이 생각 났다. 여기서는 그걸 넘어 classifier-free diffusion guidance를 시도하는 것 같았다.
- 논문을 순서대로 캡쳐하여 해당 부분을 읽고 든 생각을 작성하겠다.(영어로는 읽어도 잘 기억에 안 남는다. 한국어로 이해해야한다.)
- 나의 생각 <= 입니다

# Abstract 번역

분류기(Classifier) 가이던스는 최근 제안된 방법으로, 조건부 확산 모델에서 학습 후  
모드 커버리지(mode coverage)와 샘플 충실도(sample fidelity) 사이의 균형을 조절하는  
방법이다. 이는 다른 생성 모델에서의 저온 샘플링(low temperature sampling)이나  
절단(truncation)과 유사하다.

분류기 가이던스는 확산 모델의 점수 추정치(score estimate)와 이미지 분류기의  
그래디언트(gradient)를 결합하므로, 확산 모델과 별도로 분류기를 학습해야 한다.  
또한 “분류기 없이도 가이던스를 수행할 수 있는가?”라는 질문을 던진다.

저자들은 분류기 없이도 순수 생성 모델만으로 가이던스를 수행할 수 있음을 보인다.  
이를 **Classifier-Free Guidance**라 부르며, 조건부 확산 모델과 무조건적(unconditional)  
확산 모델을 함께 학습한 뒤, 두 점수 추정치를 결합하여 분류기 가이던스와 유사하게  
샘플 품질과 다양성 간의 trade-off를 달성한다.

- classifier라는 이야기를 처음에 시작하고 "조건부 확산 모델", "모드 커버리지", "샘플 충실도", "저온 샘플링", "절단" 놀랍게도 다 모르는 단어이다. 이걸 조금은 이해하고 넘어가야겠다.

> [!note]- 주요 단어 정의
> **모드 커버리지 (Mode coverage)**
> "모드"는 데이터 분포에서 자주 등장하는 패턴이나 범주를 뜻해요.
> 예를 들어, 고양이·강아지·새 이미지를 학습했다면, 각 동물 종류가 하나의 "모드"가 됩니다.
> 모드 커버리지는 모델이 모든 다양한 모드를 잘 커버하는지, 즉 다양한 패턴을 빠짐없이 생성하는 
> 능력을 말합니다.  
> **샘플 충실도 (Sample fidelity)**
> 생성된 데이터(예: 이미지)가 얼마나 진짜 같은지, 품질이 높은지를 나타내는 개념이에요.
> 충실도가 높으면 생성 이미지가 현실적인데, 대신 다양성이 줄어들 수도 있습니다.  
> **저온 샘플링 (Low temperature sampling)**
> 샘플링할 때 확률 분포의 "온도(temperature)" 파라미터를 낮추면, 모델이 더 안전하고 평균적인 결과를 내요.
> 즉, 더 선명하지만 다양성은 줄어드는 효과가 있습니다.  
> **절단 (Truncation)**
> 샘플링 과정에서 확률이 낮은 후보를 잘라내는 방법입니다.
> 흔히 GAN 같은 생성 모델에서 "품질을 높이기 위해 극단적이거나 이상한 샘플을 버리는 기법"이에요.  
> **점수 추정치 (Score estimate)**
> 확산 모델은 데이터의 확률분포의 기울기(gradient), 즉 "점수(score)"를 학습합니다.
> 쉽게 말해, "노이즈가 낀 데이터를 원래 데이터 쪽으로 조금 더 움직일 방향"을 알려주는 벡터입니다.  
> **분류기의 그래디언트 (Gradient from classifier)**
> 만약 우리가 조건부 이미지(예: "고양이")를 생성하고 싶다면, 분류기가 '이건 고양이일 확률'을 높이는 방향을 알려줍니다.
> 그 방향(gradient)을 점수 추정치에 더해주면, 원하는 조건에 맞는 이미지를 얻기 쉬워집니다.  
> **분류기 가이던스 (Classifier guidance)**
> 확산 모델이 학습한 "노이즈 제거 방향(점수)"에, 분류기의 "조건 강화 방향"을 더해서 샘플 품질을 조정하는 방법입니다.
> 단점: 별도의 분류기 모델을 추가로 학습해야 한다는 점.  
> **무조건적 모델 (Unconditional model)**
> 어떤 조건도 주지 않고 "그냥 데이터 분포 전체"를 학습한 모델입니다.
> **조건부 모델 (Conditional model)**
> 특정 조건(예: "고양이" 라벨)을 주었을 때만 해당 데이터 분포를 학습하는 모델입니다.  
> **분류기 없는 가이던스 (Classifier-Free Guidance, CFG)**
> "분류기 없이도 가이던스가 가능할까?"라는 발상에서 나온 방법.
> 무조건적 모델과 조건부 모델을 하나의 모델에서 동시에 학습한 뒤, 두 점수 추정치를 선형 결합합니다.
> 결과적으로 별도의 분류기 없이도 샘플 품질 vs 다양성의 균형을 조절할 수 있습니다.

**요약하면,**
분류기 가이던스: 확산 모델 + 추가 분류기 필요
분류기 없는 가이던스(CFG): 하나의 모델로 무조건/조건부 점수를 함께 학습 → 두 개를 섞어 쓰면 분류기 없이도 같은 효과

- 다시 초록을 읽어보자

분류기(Classifier) 가이던스는 최근 제안된 방법으로, 조건부 확산 모델에서 학습 후  
모드 커버리지(mode coverage)와 샘플 충실도(sample fidelity) 사이의 균형을 조절하는  
방법이다. 이는 다른 생성 모델에서의 저온 샘플링(low temperature sampling)이나  
절단(truncation)과 유사하다.

- 모드를 포괄하는 것과 샘플에 대한 퀄리티(다양성과 반비례 경향)의 균형이고 저온 샘플링, 절단 => 다양성을 줄어버림
- 결론적으로 조건부로 학습을 하다보니 전체적으로 모드를 포괄하지 못하지만 각 모드의 퀄리티는 좋아지겠네

분류기 가이던스는 확산 모델의 점수 추정치(score estimate)와 이미지 분류기의  
그래디언트(gradient)를 결합하므로, 확산 모델과 별도로 분류기를 학습해야 한다.  
또한 “분류기 없이도 가이던스를 수행할 수 있는가?”라는 질문을 던진다.

- 분류기가 확산 모델의 가이던스를 수행했는데 거기에 점수 추정치(score estimate)와 그래디언트(gradient)가 사용됬나보다.
- 이거 없이 가이던스를 수행할 수 있나? 신기하네

저자들은 분류기 없이도 순수 생성 모델만으로 가이던스를 수행할 수 있음을 보인다.  
이를 **Classifier-Free Guidance**라 부르며, 조건부 확산 모델과 무조건적(unconditional)  
확산 모델을 함께 학습한 뒤, 두 점수 추정치를 결합하여 분류기 가이던스와 유사하게  
샘플 품질과 다양성 간의 trade-off를 달성한다.

- 분류기가 필요없다 순수 생성 모델만으로 guidance를 수행할 수 있음을 보인다고 하네. 방법은 조건부 확산 모델과 무조건적 확산 모델을 함께 학습한 뒤, 두 점수 추정치를 결합하여 분류기 가이던스와 유사하게.. 이 둘을 섞으니깐 trade-off 달성하나보다. 근데 조건부 확산 모델 학습하는거를 모르는데 일단 더 읽어보자.

# 1.INTRODUCTION 번역

최근 확산 모델은 표현력이 뛰어나고 유연한 생성 모델군으로 주목받고 있으며,  
이미지·오디오 합성에서 경쟁력 있는 샘플 품질과 가능도(likelihood) 점수를 보여주고 있다  
(Sohl-Dickstein et al., 2015; Song & Ermon, 2019; Ho et al., 2020; Song et al., 2021b;  
Kingma et al., 2021; Song et al., 2021a).

- 그런가보다

이 모델들은 오디오 합성에서 훨씬 적은 추론 단계로도 자기회귀 모델에 버금가는 성능을  
달성하였으며 (Chen et al., 2021; Kong et al., 2021), ImageNet 생성에서는 BigGAN-deep  
(Brock et al., 2019)과 VQ-VAE-2 (Razavi et al., 2019)을 능가하는 FID 점수와 분류 정확도를  
달성하였다 (Ho et al., 2021; Dhariwal & Nichol, 2021).

- 대단하다

> [!note]- 저온 샘플링 설명
> 1. 기본 아이디어: “온도(temperature)” 파라미터  
> 	• 확률 분포에서 샘플링할 때, softmax나 분포에 온도 T 라는 파라미터를 곱해 줄 수 있습니다.  
> 	• 분포를 $\text{softmax}(z / T)$ 꼴로 바꾸면:  
> 	• T > 1 (고온, high temperature): 분포가 더 평평해짐 → 랜덤성이 커져 다양성 ↑, 품질 ↓  
> 	• T < 1 (저온, low temperature): 분포가 더 뾰족해짐 → 샘플이 확실한 후보에 집중 → 품질 ↑, 다양성 ↓  
> 
> 즉, **“저온 샘플”**이란 모델이 가장 확신하는 패턴 쪽으로 샘플링을 몰아서 더 선명하고 일관된 결과를 뽑는 방법이에요.  
> 반대로 고온 샘플은 다양한 결과를 내지만, 품질이 떨어질 수 있습니다.

즉, **“저온 샘플”** 이란 모델이 가장 확신하는 패턴 쪽으로 샘플링을 몰아서 **더 선명하고 일관된 결과**를 뽑는 방법이에요.

반대로 고온 샘플은 다양한 결과를 내지만, 품질이 떨어질 수 있습니다.


Dhariwal & Nichol (2021)은 추가로 학습된 분류기를 이용하여 확산 모델의 샘플 품질을  
향상시키는 기술인 **Classifier Guidance**를 제안하였다.

- 이거 설명하는 것 같다.

분류기 가이던스 이전에는, 확산 모델에서 Truncated BigGAN (Brock et al., 2019)이나  
저온 Glow (Kingma & Dhariwal, 2018)이 만들어내는 것과 유사한 “저온 샘플”을 생성하는  
방법이 알려져 있지 않았다.

- GAN에서 쓴 방법이 잘 안 먹힌 것 같다.

즉, 단순히 모델의 점수 벡터(score vectors)를 스케일링하거나, 확산 샘플링 과정에서 추가되는  
가우시안 노이즈의 양을 줄이는 방식은 효과적이지 않았다 (Dhariwal & Nichol, 2021).

이에 비해 분류기 가이던스는 확산 모델의 점수 추정치(score estimate)를  
분류기의 로그 확률(log probability)의 입력 그래디언트와 결합한다.

- 갑자기 어렵다. 추가 설명이 필요하다

> [!note]- 추가설명
> 
> ![](https://blog.kakaocdn.net/dna/MPDQN/btsQK9SljWJ/AAAAAAAAAAAAAAAAAAAAALe2Fv0JlC9gGoTU1WMk5dNtqZrfADUcaGn-HOYgQwSF/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1759244399&allow_ip=&allow_referer=&signature=E7SRzPXl4sa2AgLpsOBoU4BqOZ4%3D)

---

[그림 1] 64x64 ImageNet 확산 모델에서 malamute 클래스에 대해 분류기 없는 가이던스(Classifier-Free Guidance)를 적용한 예시.  
왼쪽은 비가이드 샘플(non-guided samples), 오른쪽으로 갈수록 가이던스 강도를 점차 높여가며 생성된 샘플을 보여준다.

- 오른쪽으로 갈 수록 개밖에 없다. 다양성 줄었지만 개 사진 퀄리티 업

[그림 2] 세 개의 가우시안 혼합 분포에 가이던스를 적용한 효과를 보여준다.  
각 혼합 구성 요소는 특정 클래스에 조건화된 데이터를 나타낸다.  
가장 왼쪽 그림은 비가이드된 주변 밀도(non-guided marginal density)이며,  
오른쪽으로 갈수록 가이던스 강도가 증가한 조건부 분포의 혼합 밀도를 보여준다.

- 가우시안 혼합 분포에 가이던스를 적용하니 분포가 분리된다.

분류기 그래디언트의 강도를 조절함으로써, Dhariwal & Nichol은  
Inception Score (Salimans et al., 2016)와 FID Score (Heusel et al., 2017)  
(즉, 정밀도와 재현율) 사이의 균형을 맞출 수 있음을 보였다.  
이는 BigGAN에서 truncation 파라미터를 조절하는 것과 유사하다.

> [!note]- BigGAN 에서 truncation 설명
> **BigGAN에서 truncation 파라미터 조절**  
> - BigGAN은 생성 과정에서 **잠재 벡터 z**를 정규분포에서 샘플링합니다.  
> - 이때 `truncation trick`이라고 해서, 분포의 극단적인 값들을 잘라내고  
>   $\;z \sim \mathcal{N}(0, I)$ 대신 $\;z$를 **중앙(평균 0) 근처로 제한**해서 사용합니다.  
> - **truncation ↓ (낮음)** → 샘플들이 평균 근처에서 나오므로 **더 선명하고 품질 높은 이미지**가 생성되지만, **다양성은 줄어듦**.  
> - **truncation ↑ (높음)** → 더 넓은 영역에서 z를 뽑아 **다양성이 커지지만**, 이미지 품질은 낮아질 수 있음.  
>  
> 즉, truncation 파라미터는 확산 모델의 **온도(temperature)** 파라미터와 유사하게  
> **“품질 ↔ 다양성”** 사이의 균형을 조절하는 역할을 합니다.

저자들의 관심사는 **“분류기 없이도 가이던스를 수행할 수 있는가?”** 이다.  
분류기 가이던스는 추가 분류기 학습이 필요하기 때문에 훈련 파이프라인을 복잡하게 만든다.  
또한 이 분류기는 노이즈가 섞인 데이터로 훈련되어야 하므로,  
기존에 사전 학습된 분류기를 그대로 사용하는 것이 불가능하다.

- 기존에 이미지를 보고 분류하는 분류기를 말하는 것 같다. (추가학습이 가장 큰 단점)

더 나아가, 분류기 가이던스는 샘플링 중에 점수 추정치와 분류기 그래디언트를 결합하므로,  
이는 이미지 분류기를 교란시키려는 그래디언트 기반 적대적 공격(adversarial attack)으로  
해석될 수 있다. 따라서 “분류기 가이던스가 FID나 IS 같은 분류기 기반 지표를 높이는 것은  
단순히 분류기를 속였기 때문이 아닌가?”라는 의문이 생긴다.

> [!note]- 추가설명
> **분류기 가이던스 = 분류기 선호에 맞춘 조작? 품질과 속임의 경계**  
>
> - **작동 원리**  
>   - 분류기 가이던스는 샘플링 도중 중간 상태 \(x_t\)를 업데이트할 때  
>     $$
>     s_\theta^{\text{guided}}(x_t,t,y)=s_\theta(x_t,t)+\lambda\nabla_{x_t}\log p(y|x_t)
>     $$  
>     를 사용합니다.  
>   - 여기서 두 번째 항 $\nabla_{x_t}\log p(y|x_t)$는 “분류기가 더 좋아하는 방향”으로 샘플을 살짝 조작합니다.  
>
> - **왜 적대적 공격처럼 보이나?**  
>   - 적대적 공격도 입력을 분류기 그래디언트 방향으로 살짝 교란해 **분류기 출력을 바꾸는 행위**입니다.  
>   - 따라서 “분류기 가이던스는 분류기를 속이려는 적대적 조작과 구조적으로 닮았다”는 지적이 나옵니다.  
>
> - **품질이 올라간 걸까, 속인 걸까?**  
>   - **사람 눈 기준**: 결과가 더 선명하고 조건에 맞게 보여서 품질이 실제로 좋아 보임.  
>   - **지표 기준(FID, IS)**: Inception 같은 분류기 기반 지표라서, 사실은 **분류기 내부 표현을 과도하게 만족시킨 결과**일 수 있음. 즉, 지표가 좋아진 게 진짜 품질 향상인지, 분류기를 “속인 것”인지 구분이 모호해집니다.  
>
> - **결론**  
>   - 분류기 가이던스는 본질적으로 **출력 보조 장치**: 모델이 본질적으로 더 잘 학습된 게 아니라, 분류기가 선호하는 방향으로 샘플링 경로를 수정하는 것.  
>   - 그래서 **속임과 품질 향상 사이의 경계**에 서 있습니다.  
>     - 분류기를 속이는 효과 덕분에 FID·IS가 올라갈 수도 있음.  
>     - 동시에 사람 눈에도 더 좋아 보이니 “품질”이 올라간 것처럼 느껴짐.  
>   - 결국, 이중성이 존재하기 때문에 연구자들이 “정말 품질이 올라간 건지, 지표 편향인지” 늘 따져보는 겁니다.  
>
> 👉 요약: **분류기 가이던스는 분류기 관점에서 최적화된 결과라 품질이 올라간 것처럼 보이지만, 실제로는 ‘속임 효과’일 가능성이 있어 해석에 주의가 필요하다.**

또한 분류기 그래디언트를 따르는 것은 비매개적(nonparametric) 생성기를 사용하는 GAN 학습과도  
유사한데, 이는 곧 분류기 가이던스를 적용한 확산 모델이 이미 분류기 기반 지표에서 잘 알려진  
GAN의 특성을 닮아가고 있기 때문일 수도 있다.

- 분류기의 보조로 이미지를 생성하는 행태가 GAN의 D의 도움을 받아 잠재공간을 구성하는 GAN의 학습과 유사하기 때문인 것 같다. 

> [!note]- 추가설명  
> **분류기 가이던스와 GAN의 닮은 점**  
>
> - **비매개적(nonparametric) 생성기란?**  
>   - 어떤 생성 모델이 “직접 이미지를 만드는 신경망(파라미터화된 생성기)”이 아니라,  
>     **분류기나 판별기의 그래디언트**를 따라 샘플을 갱신하는 방식이면 “비매개적 생성기”라고 불립니다.  
>   - 예전 GAN 연구 초창기에는, 생성기가 없고 판별기 \(D(x)\)의 그래디언트를 따라 데이터 공간에서 직접 샘플을 업데이트하는 시도가 있었어요.  
>
> - **분류기 가이던스와의 연결**  
>   - 분류기 가이던스도 똑같이 “분류기 그래디언트 \(\nabla_x \log p(y|x)\)”를 이용해 샘플 \(x_t\)를 조작합니다.  
>   - 즉, 확산 모델이 원래의 점수 함수에 더해 **분류기 그래디언트를 이용하는 순간**, 일종의 “비매개적 생성기”처럼 동작하게 되는 셈이죠.  
>
> - **GAN과 닮았다는 의미**  
>   - GAN의 본질은 “생성자 G vs 판별자 D”의 경쟁인데, 판별기(D)가 좋아하는 방향으로 이미지를 수정하면 품질이 올라간 것처럼 보입니다.  
>   - 분류기 가이던스도 마찬가지로, “분류기가 좋아하는 특징” 쪽으로 샘플을 밀어내므로,  
>     **GAN이 판별기를 속여 지표를 올리는 현상과 유사한 속성을 보인다**는 겁니다.  
>
> - **정리**  
>   - 따라서 “분류기 가이던스를 적용한 확산 모델이 GAN의 특성을 닮아간다”는 말은,  
>     **둘 다 분류기/판별기의 그래디언트를 활용해 ‘품질 지표(FID, IS)’를 끌어올린다**는 점에서 구조적 유사성이 있다는 뜻입니다.  
>
> 👉 한 줄 요약: **분류기 가이던스는 분류기 그래디언트를 따라가는 방식이라, 판별기 그래디언트에 의존하던 초기 GAN의 학습 방식과 닮았고, 그래서 FID·IS 같은 지표 향상이 GAN 때와 비슷한 ‘분류기 친화성’ 효과일 수 있다는 말이다.**

이러한 의문을 해결하기 위해 저자들은 **Classifier-Free Guidance**를 제안한다.  
이 방법은 분류기를 전혀 사용하지 않고, 이미지 분류기의 그래디언트 방향으로 가는 대신,  
조건부 확산 모델과 동시에 학습된 무조건부 확산 모델의 점수 추정치를 결합한다.

- 분류기를 오질라게 비판하고 없는 방법을 제시한다

혼합 가중치(mixing weight)를 조정함으로써, FID/IS 간의 trade-off를  
분류기 가이던스와 유사하게 달성할 수 있다.

- FID 와 IS간의 trade-off란건 FID(다양성 치중) + IS(품질 치중) 이것의 밸런스이다.
> [!note]- 추가설명 
> **FID와 IS 정의 정리**  
> 
> - **Inception Score (IS)**  
>   - **목적**: 생성 이미지가 (1) 개별적으로는 분명한 클래스에 속하고, (2) 전체적으로는 다양한 클래스를 포함하는지 평가.  
>   - **방법**:  
>     1. 생성 이미지를 **사전 학습된 Inception v3 분류기**에 통과시켜 \(p(y|x)\)를 얻음.  
>     2. 각 이미지의 확률 분포가 특정 클래스에 치우칠수록(엔트로피↓) 품질 ↑.  
>     3. 전체 \(p(y)\) 분포가 고르게 퍼질수록 다양성 ↑.  
>     4. 최종 점수:  
>        $$
>        IS = \exp\Big( \mathbb{E}_x \big[ D_{KL}(p(y|x)\,\|\,p(y)) \big] \Big)
>        $$  
> 
> - **Fréchet Inception Distance (FID)**  
>   - **목적**: 생성 이미지와 실제 이미지의 **분포 차이**를 측정.  
>   - **방법**:  
>     1. 생성/실제 이미지를 Inception v3의 feature space로 임베딩.  
>     2. 각 집합을 가우시안 $(\mathcal{N}(\mu, \Sigma))$로 근사.  
>     3. 두 가우시안의 Fréchet 거리 계산:  
>        $$
>        FID = \|\mu_r - \mu_g\|^2 + \text{Tr}\big(\Sigma_r + \Sigma_g - 2(\Sigma_r \Sigma_g)^{1/2}\big)
>        $$  
>        - $(\mu_r, \Sigma_r)$: 실제 데이터 평균/공분산  
>        - $(\mu_g, \Sigma_g)$: 생성 데이터 평균/공분산  
> 
> - **비교**  
>   - **IS**: 생성 샘플 자체만 보고 평가 (분류기 확신 + 다양성).  
>   - **FID**: 생성 분포 vs 실제 분포 직접 비교 (더 널리 사용).  
>   - **공통점**: 둘 다 Inception 네트워크 기반이라, 분류기 편향 영향을 받을 수 있음.  

실험 결과, classifier-free guidance는 순수 생성 확산 모델만으로도  
다른 생성 모델들과 맞먹는 고충실도(high-fidelity) 샘플을 합성할 수 있음을 보여준다.


# **2. Background 번역**

우리는 연속 시간(continuous time)에서 확산 모델을 학습한다(Song et al., 2021b; Chen et al., 2021; Kingma et al., 2021).
$$
데이터 x \sim p(x)를 샘플링하고, 하이퍼파라미터 \sigma_{\min} < \sigma_{\max} \in \mathbb{R}에 대해
$$
$$
z = \{z_\sigma \mid \sigma \in [\sigma_{\min}, \sigma_{\max}]\}라 하면,
$$
$$
순방향 과정 q(z \mid x)는 분산 보존(variance-preserving) 마르코프 과정으로 정의된다 (Sohl-Dickstein et al., 2015):
$$
  
$$
q(z_\sigma \mid x) = \mathcal{N}(\alpha_\sigma x, \sigma^2_\sigma I), \quad \alpha^2_\sigma = \frac{1}{1 + e^{-\sigma}}, \quad \sigma^2_\sigma = 1 - \alpha^2_\sigma \tag{1}
$$
  
$$
q(z_\sigma \mid z_{\sigma’}) = \mathcal{N}\left(\frac{\alpha_\sigma}{\alpha_{\sigma’}} z_{\sigma’}, \, \sigma^2_{\sigma \mid \sigma’} I\right), \quad \sigma < \sigma’, \quad \sigma^2_{\sigma \mid \sigma’} = (1 - e^{\sigma - \sigma’}) \sigma^2_\sigma \tag{2}
$$
  
$$
여기서 p(z) (또는 p(z_\sigma))는 x \sim p(x)와 z \sim q(z \mid x)일 때의 주변 분포를 의미한다.
$$
또한 $$\sigma = \log \alpha^2_\sigma / \sigma^2_\sigma$$로 정의되므로, $\sigma는 z_\sigma$ 의 신호 대 잡음비(signal-to-noise ratio, SNR)의 로그 값**으로 해석할 수 있고, 순방향 과정은 $\sigma$ 가 감소하는 방향으로 진행된다.

- 처음에 딱 봤을 때 머리가 아팠지만 기존의 diffusion 모델의 연속시간에서의 forward과정임을 알 수 있었다. 기존에는 t라는 스텝이 주어져있고 discrete했다면 여기는 $\sigma$ 라는 연속 하이퍼 파라미터를 도입해 노이즈 양을 조절하였다. (1) 식은 처음 데이터 x가 주어질때 $\sigma^2_\sigma$에 따른 생성된 확률분포  $q(z_\sigma \mid x)$을 의미한다. 
- (2) 식은 일반적인 시간 흐름에서의 순방향 전파를 나타낸다. 
- $\sigma = \log \alpha^2_\sigma / \sigma^2_\sigma$ 이식은 $\alpha^2_\sigma$ 가 원본 신호이고 $\sigma^2_\sigma$을 나타내므로 신호 대비 잡음비이다.(감소방향은 원본 흐릿)
- (참고 $z_\sigma = \alpha_\sigma x + \sigma_\sigma \epsilon, \quad \epsilon \sim \mathcal{N}(0,I)$)

---

데이터 x에 조건을 두면, 순방향 과정은 다음의 전이로 역으로 표현될 수 있다:
$$
q(z_{\sigma’} \mid z_\sigma, x) = \mathcal{N}(\tilde{\mu}{\sigma’|\sigma}(z\sigma, x), \, \tilde{\sigma}^2_{\sigma’|\sigma} I) \tag{3}
$$
여기서
$$
\tilde{\mu}{\sigma’|\sigma}(z\sigma, x) = e^{-(\sigma’-\sigma)} \left(\frac{\alpha_{\sigma’}}{\alpha_\sigma}\right) z_\sigma + \left(1 - e^{-(\sigma’-\sigma)}\right)\alpha_{\sigma’} x
$$

$$
\tilde{\sigma}^2_{\sigma’|\sigma} = \left(1 - e^{-(\sigma’-\sigma)}\right) \sigma^2_{\sigma’}
$$

> [!note]- 추가설명 
> 📖 **1. 원래 forward 과정**  
> - 정의:  
>   $$
>   q(z_\sigma \mid x) = \mathcal{N}(\alpha_\sigma x, \; \sigma_\sigma^2 I)
>   $$  
> - 해석: 원본 데이터 $(x)$에서 시작해 점점 노이즈를 추가해 $(z_\sigma)$를 만드는 과정.  
>
> 📖 **2. 시점 사이의 전이 (transition)**  
> - 두 시점 $(\sigma, \sigma') ((\sigma < \sigma'))$가 있을 때,  
>   $$
>   q(z_{\sigma'} \mid z_\sigma, x)
>   $$  
>   - 의미: “조건부 전이(distribution between two noisy states)”.  
>   - 즉, $(z_\sigma)$를 알고 있을 때 $(z_{\sigma'})$를 어떻게 샘플링하는가를 정의.  
>
> 📖 **3. 평균 $(\tilde{\mu}_{\sigma'|\sigma}(z_\sigma, x))$**  
> - 식:  
>   $$
>   \tilde{\mu}_{\sigma'|\sigma}(z_\sigma, x)  
>   = e^{-(\sigma'-\sigma)} \Big(\frac{\alpha_{\sigma'}}{\alpha_\sigma}\Big) z_\sigma  
>   + \big(1 - e^{-(\sigma'-\sigma)}\big) \alpha_{\sigma'} x
>   $$  
> - 해석:  
>   - $(z_\sigma)$: 현재 noisy 상태  
>   - $(x)$: 원본 데이터  
>   - 계수 $(e^{-(\sigma'-\sigma)})$, $(1 - e^{-(\sigma'-\sigma)})$: 시간 간격에 따른 가중치  
>   - **결론**: 평균은 $(z_\sigma)$와 $(x)$의 선형 결합 → “다음 단계는 지금 상태와 원본 사이 어딘가”.  
>
> 📖 **4. 분산 $(\tilde{\sigma}^2_{\sigma'|\sigma})$**  
> - 식:  
>   $$
>   \tilde{\sigma}^2_{\sigma'|\sigma} = (1 - e^{-(\sigma'-\sigma)}) \sigma_{\sigma'}^2
>   $$  
> - 해석:  
>   - 시점 간격이 클수록 $((\sigma'-\sigma)↑)$ 더 많은 노이즈 추가.  
>   - 따라서 분산↑ → $(z_{\sigma'})$가 더 퍼져 있음.  
>
> 📖 **5. 왜 “역으로 표현된 forward 과정”인가?**  
> - 원래 forward: $(x \to z_\sigma)$ 바로 가는 분포.  
> - 이번 식: $(z_\sigma \to z_{\sigma'})$ 전이를 정의.  
> - 즉, forward를 **Markov chain**으로 명확히 만든 버전:  
>   $$
>   x \;\to\; z_\sigma \;\to\; z_{\sigma'} \;\to\; \cdots
>   $$  
- ddpm에서 $x_t$ 랑 $x$를 통해 $x_{t-1}$ 를 정의했던 과정과 유사하네요. 수식은 어려워...
---

역방향 생성 과정은 $$p_\theta(z_{\sigma_{\min}}) = \mathcal{N}(0, I)$$
- $\sigma_{\min}$이라고 정의하는게 연속된 하이퍼 파라미터여서 그때의 분포가 표준정규분포이다.
에서 시작한다. 전이는 다음과 같이 정의된다:

$$
p_\theta(z_{\sigma’} \mid z_\sigma) = \mathcal{N}\Big(\tilde{\mu}{\sigma’|\sigma}(z\sigma, x_\theta(z_\sigma)), \, (\tilde{\sigma}^2_{\sigma’|\sigma})^{1-v} (\sigma^2_{\sigma|\sigma’})^v \Big) \tag{4}
$$
여기서 v는 고정된 하이퍼파라미터다.

샘플링 시에는 $$\sigma_{\min} = \sigma_1 < \cdots < \sigma_T = \sigma_{\max}$$의 증가하는 시퀀스를 따라 이 전이를 적용한다. 즉, Sohl-Dickstein et al. (2015), Ho et al. (2020)의 **이산 시간 조상 샘플러(ancestral sampler)를 따른다.
$$모델 x_\theta가 정확하다면, T \to \infty일 때 $$샘플은 p(z)에 해당하는 확률미분방정식(SDE)의 해와 동일하게 분포하며 (Song et al., 2021b), 이를 $p_\theta(z)$라 표기한다.

> [!note]- 추가설명
> **DDPM vs 일반화된 역방향 과정 (분산 처리와 학습 여부)**  
>
> - **DDPM (Ho et al., 2020)**  
>   - 역방향 전이:  
>     $$
>     p_\theta(x_{t-1}\mid x_t) = \mathcal{N}(\mu_\theta(x_t, t), \; \beta_t I)
>     $$  
>   - $(\beta_t)$는 **고정된 분산**, 학습하지 않음.  
>   - 단순·안정적이지만 유연성이 부족.  
>
> - **일반화된 과정 (식 (4))**  
>   - 분산을 forward와 backward 항의 **혼합**으로 정의:  
>     $$
>     (\tilde{\sigma}^2_{\sigma'|\sigma})^{1-v}\;(\sigma^2_{\sigma|\sigma'})^v
>     $$  
>   - $(\tilde{\sigma}^2_{\sigma'|\sigma})$: forward 과정에서 유도된 **고정 분산**.  
>   - $(\sigma^2_{\sigma|\sigma'})$: 역방향에서 정의된 분산 → **학습 가능**.  
>   - $(v \in [0,1])$: 두 분산을 어떻게 섞을지 정하는 **하이퍼파라미터**.  
>
> - **의미**  
>   - \(v=0\): forward 고정 분산만 사용 → 학습 대상 아님.  
>   - \(v=1\): 역방향 분산만 사용 → 네트워크가 **분산까지 예측**해야 함.  
>   - \(0<v<1\): forward(안정성)와 backward(유연성)을 **트레이드오프**.  
>
> - **정리**  
>   - **DDPM**: 분산 고정, 단순하지만 제한적.  
>   - **일반화된 접근**: 필요에 따라 **분산도 학습**하여 더 유연한 역방향 전이를 정의.  
>
> 👉 한 줄 요약: **DDPM은 분산을 고정하지만, 일반화된 과정은 forward 고정 분산과 학습 가능한 역방향 분산을 섞어 안정성과 유연성을 동시에 추구한다.**

---

모델의 평균 추정은 $x_\theta(z_\sigma) \approx x$를 $q(z_{\sigma’} \mid z_\sigma, x)$에 대입함으로써 얻어진다 (Ho et al., 2020; Kingma et al., 2021).

$여기서 x_\theta는 입력으로 \sigma도 받지만, 표기 단순화를 위해 생략한다.$

우리는 **epsilon-예측** 방식으로 $x_\theta$를 파라미터화한다 (Ho et al., 2020):
$$
x_\theta(z_\sigma) = \frac{z_\sigma - \sigma \epsilon_\theta(z_\sigma)}{\alpha_\sigma}
$$
- 주어진 $z_\sigma$와 예측한 $\epsilon_\theta(z_\sigma)$을 이용해 $x_\theta(z_\sigma)$을 복원한다. 
학습 목표는 다음과 같다:
$$
\mathbb{E}{\epsilon, \sigma} \Big[ \| \epsilon\theta(z_\sigma) - \epsilon \|_2^2 \Big] \tag{5}
$$
  
$$
여기서 \epsilon \sim \mathcal{N}(0, I), z_\sigma = \alpha_\sigma x + \sigma \epsilon, \sigma는 분포 p(\sigma)에서 샘플링한다.
$$
- 우리가 알고 있는 익숙한 학습목표이다.
---

이 손실은 다중 잡음 스케일에서의 **denoising score matching** (Vincent, 2011; Hyvärinen & Dayan, 2005)에 해당한다.

- 이거 때문에 score function 공부했습니다.

또한 $p(\sigma)$가 균일 분포일 경우, 목적 함수는 주변 로그우도 $\log p(x)$에 대한 변분 하한(variational lower bound)에 비례한다 (Kingma et al., 2021).

비균일한 $p(\sigma)$를 사용할 경우, 이는 샘플 품질을 개선하기 위해 가중치를 조정할 수 있는 **가중 변분 하한(weighted variational lower bound)**으로 해석할 수 있다 (Ho et al., 2020).

> [!note]- 추가설명
> **노이즈 예측 손실과 DSM/ELBO의 관계**  
>
> **1. 노이즈 주입 (forward)**  
> $$
> z_\sigma = \alpha_\sigma x + \sigma \epsilon, \quad \epsilon \sim \mathcal{N}(0,I)
> $$  
>
> **2. 점수 함수 (score function)**  
> $$
> \nabla_z \log q(z_\sigma \mid x) 
> = -\frac{1}{\sigma^2}(z_\sigma - \alpha_\sigma x) 
> = -\frac{1}{\sigma}\epsilon
> $$  
>
> **3. epsilon-예측과 score의 관계**  
> $$
> \epsilon_\theta(z_\sigma) \approx \epsilon
> $$  
> 따라서  
> $$
> s_\theta(z_\sigma,\sigma) \approx -\frac{1}{\sigma}\,\epsilon_\theta(z_\sigma)
> $$  
>
> **4. 학습 목표 (MSE 손실)**  
> $$
> \mathcal{L}(\theta) 
> = \mathbb{E}_{x,\epsilon,\sigma} 
>   \big[ \|\epsilon_\theta(z_\sigma)-\epsilon\|_2^2 \big]
> $$  
>
> **5. DSM과의 동치성**  
> $$
> \mathcal{L}(\theta) 
> \;\propto\; 
> \mathbb{E}_{z,\sigma}\big[\|s_\theta(z,\sigma) - \nabla_z \log q_\sigma(z)\|_2^2\big]
> $$  
> 즉, 다중 스케일 DSM과 동일한 목적.  
>
> **6. $p(\sigma)$가 균일할 때**  
> $$
> \mathcal{L}(\theta) \;\propto\; -\text{ELBO} \;\;\;(\approx -\log p_\theta(x))
> $$  
> → 로그우도의 변분 하한 최적화와 동일.  
>
> **7. $p(\sigma)$가 비균일할 때**  
> $$
> \mathcal{L}(\theta) 
> \;\propto\; 
> \sum_{\sigma} w(\sigma)\,\mathbb{E}\big[\|\epsilon_\theta(z_\sigma)-\epsilon\|^2\big]
> $$  
> → Weighted ELBO로 해석, $w(\sigma)$에 따라 **샘플 품질 트레이드오프** 조절 가능.  
>
> **정리**  
> - MSE 손실 = 다중 잡음 스케일 DSM  
> - 균일 $p(\sigma)$ → ELBO  
> - 비균일 $p(\sigma)$ → Weighted ELBO (품질 개선 가능)  

- 멘탈 나갑니다.
---

조건부 생성 모델링(conditional generative modeling)의 경우, 데이터 x는 조건 정보 c(예: 클래스 레이블)과 함께 주어진다.

이때 유일한 수정은 역방향 함수 근사기가 c를 추가 입력으로 받는 것뿐이다. 즉, $\epsilon_\theta(z_\sigma, c)$를 사용한다.

- 조건을 추가로 받는 것이 유일한 수정이다.

# **3. Guidance**

GAN이나 Flow 기반 생성 모델의 흥미로운 특성 중 하나는, 샘플링 시 생성 모델에 주는 노이즈 입력의 **분산(variance)** 이나 **범위(range)** 를 줄임으로써 **truncated sampling** 또는 **low temperature sampling**을 할 수 있다는 점이다. 이렇게 하면 샘플의 **다양성(diversity)** 은 줄어들지만, **품질(quality)** 은 향상된다.

- 넘어갈게요 

예를 들어 BigGAN (Brock et al., 2019)의 truncation은 낮은 truncation과 높은 truncation 값 각각에 대해 **FID score**와 **Inception score** 사이의 **trade-off 곡선**을 만들어낸다. Glow (Kingma & Dhariwal, 2018)의 low temperature 샘플링도 비슷한 효과를 보인다.

- 앞에서 한 말 또하네 

하지만 확산 모델에서 단순히 truncation이나 low temperature sampling을 구현하려는 시도는 잘 동작하지 않는다. 예컨대 **모델의 score를 스케일링**하거나, 역과정(reverse process)에서의 **가우시안 노이즈 분산을 줄이는 방법**은, 확산 모델이 흐릿하고 품질이 낮은 샘플을 생성하게 만든다 (Dhariwal & Nichol, 2021).

- ???

---

## **3.1 Classifier Guidance**

확산 모델에서 truncation과 유사한 효과를 얻기 위해, Dhariwal & Nichol (2021)은 **classifier guidance**를 도입했다.

확산 score는 원래 다음과 같이 근사된다:

$$

\epsilon_\theta(z_\sigma, c) ;\approx; -\sigma ,\nabla_{z_\sigma} \log p(z_\sigma \mid c).

$$
- 조건부 확산 모델에 대한 우도의 gradient 즉 score는 예측한 노이즈로 근사된다. 

여기에 보조 분류기 $p_\theta(c \mid z_\sigma)$의 로그 가능도 기울기를 포함시키면, 수정된 score는 다음과 같다:

$$

\tilde{\epsilon}_\theta(z_\sigma, c)

= \epsilon_\theta(z_\sigma, c) - w \sigma \nabla_{z_\sigma} \log p_\theta(c \mid z_\sigma)

;;\approx;;

-\sigma \nabla_{z_\sigma} \big[ \log p(z_\sigma \mid c) + w \log p_\theta(c \mid z_\sigma) \big].

$$

여기서 w는 guidance 강도를 조절하는 파라미터다.

- 해당 스코어에서 c를 분류하는 확률을 예측하는 분류기의 score를 가중치를 달아 유도하면 더욱 해당 조건의 분포로 향하는 방향으로 설정된다. (일단 이렇게 이해 했습니다.)

따라서 수정된 score $\tilde{\epsilon}_\theta$를 사용하면, 샘플은 다음 분포에서 근사적으로 생성된다:
$$

\tilde{p}_\theta(z_\sigma \mid c) ;\propto; p_\theta(z_\sigma \mid c), p_\theta(c \mid z_\sigma)^{,w}.

$$
즉, 분류기가 올바른 레이블에 높은 가능도를 부여하는 데이터를 모델이 더 선호하게 된다. 이는 **Inception Score(IS)** 를 높이는 방향으로 작용한다. 실제로 Dhariwal & Nichol은 w>0일 때 샘플의 **다양성이 줄어드는 대가로 IS가 향상**됨을 발견했다.

- CG에 관한 일차적인 이해 완료 

---

### **무조건 모델 vs 조건부 모델**

흥미로운 점은, **무조건(unconditional) 모델**에 guidance weight w+1을 적용하는 것이, **조건부 모델**에 weight w를 적용하는 것과 동일해야 한다는 것이다:

$$

p_\theta(z_\sigma \mid c) , p_\theta(c \mid z_\sigma)^w

;\propto;

p_\theta(z_\sigma) , p_\theta(c \mid z_\sigma)^{,w+1}.

$$

score의 관점에서 쓰면:

$$

\epsilon_\theta(z_\sigma) - (w+1)\sigma \nabla_{z_\sigma}\log p_\theta(c \mid z_\sigma)

;\approx;

-\sigma \nabla_{z_\sigma}\Big[ \log p(z_\sigma) + (w+1)\log p_\theta(c \mid z_\sigma) \Big]

$$

$$

= -\sigma \nabla_{z_\sigma}\Big[ \log p(z_\sigma \mid c) + w\log p_\theta(c \mid z_\sigma) \Big].

$$

하지만 Dhariwal & Nichol은 실험적으로 **무조건 모델 + guidance**보다 **조건부 모델 + guidance**가 더 나은 결과를 낸다고 보고했다. 따라서 이후에서는 조건부 모델 기반의 guidance에 집중한다.

- 수식적으로는 동일함 근데 실험에서는 조건부 모델 + guidance가 더 나은 결과 그 이유는 분류기가  $p_\theta(c \mid z_\sigma)$을 정확하게 근사하지 못하기 때문이다.

---
## **3.2 Classifier-Free Guidance**

Classifier guidance는 IS/FID 절충을 잘 수행하지만, 여전히 **외부 분류기의 gradient**에 의존한다. 우리는 분류기를 제거하면서도 동일한 효과를 내는 **classifier-free guidance**를 제안한다.

핵심 아이디어는 **하나의 모델을 조건부와 무조건부 동시에 학습**하는 것이다.
- 완전히 핵심 알고리즘 

무조건 score 추정기:
$$
    
    \epsilon_\theta(z_\sigma) = \epsilon_\theta(z_\sigma, c=\varnothing).
    
$$

조건부 score 추정기:
$$
    
    \epsilon_\theta(z_\sigma, c).
    
 $$

학습 과정에서 확률 $p_{\text{uncond}}$로 c를 null 토큰 $\varnothing$으로 대체하여 **공동 학습(joint training)** 을 수행한다.

- 동일한 구조에서 c에 공집합의 유무를 통해 조건 무조건 학습을 진행한다. 동일한 네트워크 

샘플링 시, 두 score를 선형 결합하여 새로운 guided score를 만든다:

$$
\tilde{\epsilon}_\theta(z_\sigma, c) ;=; (1+w),\epsilon_\theta(z_\sigma, c) - w,\epsilon_\theta(z_\sigma). \tag{6}
$$

![[assets/Pasted image 20250924225552.png]]

---

### **암묵적 분류기와의 관계**

직관적으로는, 이는 암묵적 분류기
$$

\pi(c \mid z_\sigma) ;\propto; \frac{p(z_\sigma \mid c)}{p(z_\sigma)}

$$
의 gradient와 관련 있다.

만약 우리가 정확한 score $\epsilon^*(z_\sigma, c)$와 $\epsilon^*(z_\sigma)$를 알고 있다면:

$$

\nabla_{z_\sigma}\log \pi(c\mid z_\sigma) = -\tfrac{1}{\sigma}\left[ \epsilon^*(z_\sigma, c) - \epsilon^*(z_\sigma) \right].

$$
- $w(\epsilon^*(z_\sigma, c) - \epsilon^*(z_\sigma))$ 보인다 보여...

이를 classifier guidance에 적용하면:

$$
\tilde{\epsilon}^*(z_\sigma, c) = (1+w)\epsilon^*(z_\sigma, c) - w \epsilon^*(z_\sigma),
$$

즉 식 (6)과 같은 형태가 된다.

다만 실제로는 우리가 갖는 $\epsilon_\theta$는 추정치이므로, 이것이 어떤 분류기의 gradient라고 보장되지는 않는다.

- 추정의 조합, 정확하지 않을 듯 

---
### **Algorithm 1. Joint Training**
![[assets/Pasted image 20250924220613.png]]
- $p_{uncond}$ 의 확률로 c에 공집합을 넣어 학습 시킨다. 기본적으로 조건부 확산모델의 학습법을 따르지만 적은 확률로 같이 무조건 확산 모델의 학습법을 적용 시킨다. 두가지의 분포를 동시에 학습한다. log SNR을 무작위로 정해 학습을 한다. 
---
### **Algorithm 2. Sampling**
![[Pasted image 20250924220655.png]]
- $w$와 $c$는 주어진다. 그리고 log SNR을 정렬하고 작은 값부터 큰 값 순으로(점점 노이즈 적어진다.)
- 이제 초기 노이즈에서 두가지 샘플링(조건, 무조건)을 진행하고 해당 샘플링으로 다음 스텝 복원 값을 구하고 반복하여 정해진 T 값을 실행한다. 
# 4 EXPERIMENTS 번역
---

우리는 classifier-free guidance를 적용한 확산 모델을 **클래스 조건부 ImageNet**(Russakovsky et al., 2015)에 대해 학습한다.

이 실험 세팅은 BigGAN 논문(Brock et al., 2019) 이후부터, FID와 Inception Score 사이의 trade-off를 연구하기 위한 표준 환경으로 사용되어 왔다.

이 실험의 목적은, classifier-free guidance가 classifier guidance와 유사하게 FID/IS 절충을 달성할 수 있음을 보여주는 **개념 증명(proof of concept)** 이며, 반드시 SOTA 수준의 샘플 품질을 달성하려는 것이 아니다.
- 유사해도 성공 

이를 위해, 우리는 Dhariwal & Nichol (2021)이 사용한 **guided diffusion 모델**의 아키텍처와 하이퍼파라미터를 동일하게 사용한다(단, Section 2에서 기술한 continuous time 학습 방식을 제외).
- CG와 동일하게 가볼게요 

이 설정은 classifier guidance에 맞추어 최적화된 것이므로, classifier-free guidance에는 최적이 아닐 수 있다. 
- 밑밥 

또한 우리는 조건부와 무조건적 모델을 하나의 아키텍처 안에 통합하여, 별도의 분류기를 두지 않았다. 따라서 모델 용량은 이전 연구보다 오히려 줄어들었다.
- 장점 어필 

그럼에도 불구하고 우리의 classifier-free guided 모델은 여전히 경쟁력 있는 샘플 품질 지표를 달성했으며, 때로는 기존 방법을 능가하기도 했다.
- 그럼에도 극복 

---

## **4.1 Classifier-Free Guidance 강도 변화**

이 절의 핵심은 본 논문의 주장을 실험적으로 검증하는 것이다:

즉, classifier-free guidance가 classifier guidance나 GAN truncation과 유사하게 Inception Score와 FID 사이의 절충을 만들어낼 수 있다는 점이다.
- 가장 큰 업적 trade-off 가능하게 함 

우리는 제안한 classifier-free guidance를 **64×64** 및 **128×128** 해상도의 클래스 조건부 ImageNet 생성에 적용하였다.

- **Table 1, Fig. 4** → 64×64 모델 결과
    
- **Table 2, Fig. 5** → 128×128 모델 결과
 
여기서 우리는 $w \in \{0, 0.1, 0.2, …, 4\}$ 범위에서 guidance 강도를 바꾸어 실험했으며, 각 값에 대해 50,000개의 샘플을 생성하여 FID와 Inception Score를 계산했다 (Heusel et al., 2017; Salimans et al., 2016 절차에 따름).

- 모든 모델은 로그 SNR의 범위를 $\sigma_{\min} = -20, \sigma_{\max} = 20$으로 사용했다.
    
- 64×64 모델은 sampler 노이즈 보간 계수 v = 0.3으로 40만 스텝 학습했다.
    
- 128×128 모델은 v = 0.2로 270만 스텝 학습했다.

**결과:**

- 작은 guidance 강도(w=0.1 또는 0.3)에서 최상의 FID 점수를 얻었다.
    
- 강한 guidance$(w \approx 4)$에서 최상의 Inception Score를 얻었다.
    
- 두 극단 사이에서는 FID가 단조 감소하고, Inception Score가 단조 증가하는 **명확한 절충 곡선**이 나타났다.

- w에 따라 IS와 FID 조절 가능하다.

이 결과는 Dhariwal & Nichol (2021), Ho et al. (2021)과 비교해도 좋은 성능을 보이며, 특히 **128×128 모델은 당시 문헌에서 최고 성능**을 기록했다.
- SOTA

예를 들어 w=0.3일 때, 128×128 ImageNet에서 우리의 모델은 classifier-guided ADM-G보다 더 낮은 FID를 기록했다.

또한 w=4.0에서는 BigGAN-deep이 최적 IS 수준에서 평가될 때보다 FID와 IS 모두에서 더 나은 성능을 보였다.

샘플 시각화(Fig. 1, 3, 6~8)를 보면, guidance 강도가 커질수록 **샘플 다양성은 줄어들고 개별 샘플의 품질은 향상**되는 기대된 효과가 뚜렷하게 나타났다.
- 원하는 방향성 나옴

---

## **4.2 무조건적 학습 확률 변화**

Classifier-free guidance에서 학습 시 주요 하이퍼파라미터는 $p_{\text{uncond}}$, 즉 학습 중 무조건적(조건 없는) 훈련을 수행할 확률이다.

- $p_{\text{uncond}}$ <= 하나의 네트워크 안에서 해당 파라미터를 통해 무조건 학습을 진행한다. 

우리는 64×64 ImageNet에서 $p_{\text{uncond}} \in \{0.1, 0.2, 0.5\}$로 모델을 학습하여, 다양한 guidance 강도에서 샘플 품질을 비교했다.

**결과:**

- $p_{\text{uncond}} = 0.5$는 항상 성능이 가장 나빴다.
    
- $p_{\text{uncond}} = 0.1과 0.2$는 거의 동일한 수준으로 잘 작동했다.
    

따라서 diffusion 모델의 용량 중 **상대적으로 작은 비율만 무조건적 학습에 사용해도 충분**하며, 효과적인 classifier-free guidance를 얻을 수 있음을 알 수 있다.

- 적은 비율이 유리하다.

이는 Dhariwal & Nichol이 classifier guidance에서 보고한 현상과도 유사하다. 즉, 작은 용량의 분류기만으로도 충분히 좋은 guidance 성능을 얻을 수 있었는데, classifier-free guidance에서도 같은 양상이 반복되었다.

---

## **4.3 샘플링 스텝 수 변화**

샘플링 스텝 수 T는 확산 모델의 샘플 품질에 큰 영향을 준다고 알려져 있다.

따라서 우리는 128×128 ImageNet 모델에 대해 $T \in \{128, 256, 1024\}$를 비교했다.

**결과:**

- 스텝 수가 많을수록 샘플 품질이 향상되었다.
    
- 특히 T=256은 샘플 품질과 속도 사이에서 가장 좋은 균형을 보였다.

비교를 위해, Dhariwal & Nichol (2021)의 ADM-G 모델도 약 T=256 스텝을 사용했는데, 우리의 모델은 이보다 더 나은 성능을 달성했다.

다만 중요한 점은, 우리의 방식은 샘플링 시 조건부 score와 무조건적 score를 각각 계산해야 하므로, 스텝마다 모델을 두 번 평가해야 한다.

- 샘플링을 두가지 방식으로 해야한다. 샘플링 속도 느리거나 VRAM 낭비 

따라서 동일한 아키텍처를 사용한다면, 공정한 비교를 위해서는 T=128을 기준으로 보아야 하며, 이 경우에는 FID에서 ADM-G보다 다소 성능이 떨어진다. 

- 엄밀한 의미에서 스텝 수 를 맞추면 절반 낮춰야 한다. 256 -> 128

# **5 DISCUSSION 번역**

---

우리의 classifier-free guidance 방법의 가장 실용적인 장점은 **극단적으로 단순하다**는 것이다.

학습 시에는 조건 정보를 무작위로 드롭(dropout)하는 **한 줄의 코드 수정**만 필요하고,

샘플링 시에는 조건부와 무조건적 score 추정을 **선형 결합**하는 또 다른 한 줄만 필요하다.

반면 classifier guidance는, 별도의 분류기를 학습해야 하므로 학습 파이프라인이 훨씬 복잡해진다.

게다가 이 분류기는 노이즈가 섞인 $z_\sigma$에서 학습되어야 하기 때문에, 일반적인 사전학습된 분류기를 그대로 쓸 수 없다.

- CG를 까면서(따로 학습해야하죠) 단순한데 효과적임을 강조한다. 

---

Classifier-free guidance는, classifier guidance와 마찬가지로 Inception Score(IS)와 FID 사이에서 절충을 할 수 있지만, **추가 학습된 분류기 없이 순수 생성 모델만으로 가능하다**는 점을 보여주었다.

- Intro에서 이야기한 분류기 개입의 결과에 대한 의심도 벗어날 수 있다. 

또한 우리의 확산 모델은 **제약이 없는 신경망(unconstrained neural networks)** 으로 파라미터화되기 때문에, score 추정값은 반드시 보존적 벡터장(conservative vector field)을 이루지 않는다.

- ???

즉, classifier guidance의 분류기 기울기와 달리, 우리의 classifier-free guided 샘플러가 따르는 step 방향은 분류기 기울기와 전혀 닮지 않는다.

따라서 이는 분류기에 대한 gradient 기반 적대적 공격(adversarial attack)으로 해석될 수 없으며, 그럼에도 불구하고 IS와 FID 같은 분류기 기반 지표를 높일 수 있음을 보여준다.

---

우리는 또 하나의 직관적 설명을 얻었다.

guidance는 **무조건적 가능도(unconditional likelihood)는 줄이고, 조건부 가능도(conditional likelihood)는 높이는** 방식으로 작동한다는 것이다.

Classifier-free guidance는 음의 score 항을 추가하여 무조건적 가능도를 줄인다.

이러한 방식은 아직까지 탐구되지 않았으며, 다른 응용 분야에서도 사용될 수 있을 것이다.

- ???

---

Classifier-free guidance는 여기서 무조건적 모델 학습에 의존하고 있지만, 어떤 경우에는 이를 피할 수도 있다.

만약 클래스 분포가 알려져 있고 클래스 개수가 적다면,
$$
\sum_c p(x \mid c)p(c) = p(x)
$$
관계를 이용하여 조건부 score들로부터 무조건적 score를 얻을 수 있다.

이 경우, 명시적으로 무조건적 모델을 학습하지 않아도 된다.

하지만 이는 가능한 클래스 수만큼 forward pass가 필요하기 때문에, 고차원 조건을 가진 상황에서는 비효율적이다.

- 맞는 말

---

Classifier-free guidance의 잠재적 단점 중 하나는 **샘플링 속도**다.

일반적으로 분류기는 생성 모델보다 작고 빠르기 때문에, classifier guidance가 classifier-free guidance보다 샘플링 속도 면에서 더 빠를 수 있다.

왜냐하면 classifier-free guidance는 조건부 score와 무조건적 score를 모두 계산해야 하므로, 확산 모델을 두 번 실행해야 하기 때문이다.

이 문제는 아키텍처를 변경하여 네트워크의 후반부에서 조건 정보를 주입하는 방식을 사용하면 완화될 수 있지만, 이는 미래 연구로 남겨둔다.

- 샘플링 단점 너무 눈에 보이는 단점 => 해결 방안 batch를 조건 과 비조건을 한번에 하나의 배치로 주고 샘플링하자. VRAM 두배 단점 하지만 속도 빨라짐 

---

마지막으로, **샘플 품질을 높이는 대신 다양성을 줄이는** 모든 guidance 방법은, 다양성 감소가 실제로 허용 가능한지에 대한 문제에 직면한다.

응용 분야에서 데이터의 일부가 과소대표(underrepresented)되는 경우, 다양성을 유지하는 것은 매우 중요하다.

따라서 향후 연구에서는, 샘플 품질을 유지하면서도 샘플 다양성을 보존할 수 있는 방법을 탐구하는 것이 흥미로운 방향이 될 것이다.

- 가능한가?? 

# **6 CONCLUSION 번역**

우리는 classifier-free guidance라는 방법을 제안했다.

이 방법은 확산 모델에서 **샘플의 품질을 향상**시키는 동시에 **샘플의 다양성을 줄이는** 효과를 낸다.

Classifier-free guidance는 **classifier가 없는 classifier guidance**라고 생각할 수 있다.

그리고 우리의 결과는, classifier-free guidance가 효과적임을 보여줌으로써,

**순수한 생성 확산 모델만으로도** classifier 기반의 샘플 품질 지표(예: Inception Score, FID)를 극대화할 수 있다는 것을 확인했다.

즉, 전혀 classifier gradient에 의존하지 않고도 동일한 성과를 달성할 수 있다.

우리는 앞으로 classifier-free guidance가 **더 다양한 환경과 데이터 모달리티**에 적용되는 연구가 이루어지기를 기대한다.

- CG 없이 모델의 결합만으로 FID와 IS trade-off 달성 