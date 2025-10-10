---
title: OpenVLA
description: Paper read in 2025
tags:
  - papers
  - year-2025
---
[Concept Reviews]
   ↓
 [VIMA / SayCan] ─▶ conceptual grounding
   ↓
 [RT-1 → RT-2] ─▶ scalable VLA foundation
   ↓
 [Open-X / OpenVLA] ─▶ open-source unification
   ↓
 [BridgeData / DROID] ─▶ data infrastructure
   ↓
 [VLABench / CALVIN] ─▶ evaluation standard
   ↓
 [RoboFlamingo / π₀] ─▶ future direction

## **1) 개념·리뷰 (입문/지도)**

- **Vision-Language-Action Models: Concepts, Progress, Applications and Challenges** — R. Sapkota et al. (2025)
    
    [arXiv:2505.04769](https://arxiv.org/abs/2505.04769)
    
    → 가장 최신의 VLA 종합 리뷰. 전체 지도, 분류, 한계, 미래 방향까지 정리.
    
- **A Survey on Vision-Language-Action Models** — X. Liu et al. (2025)
    
    [arXiv:2507.01925](https://arxiv.org/abs/2507.01925)
    
    → Sapkota et al. 보다 기술적 세부에 초점. 아키텍처 비교와 훈련 전략 정리.
    

---

## **2) OpenVLA 본편 (논문·코드·사이트)**

- **OpenVLA: An Open-Source Vision-Language-Action Model** — M. J. Kim et al. (2024)
    
    [arXiv:2406.09246](https://arxiv.org/abs/2406.09246) | [github.com/openvla/openvla](https://github.com/openvla/openvla)
    
    → OpenVLA의 공식 논문. RT-계열 모델을 오픈소스로 재현.
    
- **Open X-Embodiment: Robotic Learning Datasets and RT-X Models** — Open X-Embodiment Collab. (2023)
    
    [arXiv:2310.08864](https://arxiv.org/abs/2310.08864)
    
    → OpenVLA와 RT-2가 사용하는 대규모 로봇 데이터셋 기반 논문.
    

---

## **3) VLA 핵심 계보 (모델/아이디어)**

- **RT-1: Robotics Transformer for Real-World Control at Scale** — A. Brohan et al. (2022)
    
    [arXiv:2212.06817](https://arxiv.org/abs/2212.06817)
    
    → 최초의 대규모 Transformer-기반 로봇 정책 모델. VLA 시대의 출발점.
    
- **RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control** — A. Brohan et al. (2023)
    
    [arXiv:2307.15818](https://arxiv.org/abs/2307.15818)
    
    → 웹 지식을 로봇 행동으로 전이하는 핵심 아이디어. OpenVLA의 직접적 전신.
    

---

## **4) 전구축/전처 유산 (컨셉 기원)**

- **VIMA: General Robot Manipulation with Multimodal Prompts** — Y. Jiang et al. (NeurIPS 2022)
    
    [arXiv:2210.03094](https://arxiv.org/abs/2210.03094)
    
    → 멀티모달 프롬프트로 로봇 조작 지시. VLA의 프롬프트 기반 철학 시작.
    
- **SayCan: Do As I Can, Not As I Say — Grounding Language in Robotic Affordances** — M. Ahn et al. (2022)
    
    [arXiv:2204.01691](https://arxiv.org/abs/2204.01691)
    
    → 언어 명령을 ‘가능한 행동(affordance)’에 연결하는 아이디어. RT-1의 전신.
    

---

## **5) 벤치마크·평가 (성능 측정 표준)**

- **VLABench: A Large-Scale Benchmark for Language-Conditioned Robotics Manipulation** — S. Zhang et al. (2024)
    
    [arXiv:2412.18194](https://arxiv.org/abs/2412.18194) | [vlabench.github.io](https://vlabench.github.io)
    
    → OpenVLA 포함 VLA 모델 평가용 대표 벤치마크.
    
- **CALVIN: A Benchmark for Language-Conditioned Policy Learning for Long-Horizon Robot Manipulation** — O. Mees et al. (2021)
    
    [arXiv:2112.03227](https://arxiv.org/abs/2112.03227)
    
    → 장기 조작 과제용 표준 데이터셋. VLA 연구의 기본 비교 지표.
    

---

## **6) 대규모 로봇 데이터셋 (훈련 인프라)**

- **BridgeData V2: A Dataset for Robot Learning at Scale** — H. Walke et al. (2023)
    
    [arXiv:2308.12952](https://arxiv.org/abs/2308.12952)
    
    → Berkeley RAIL 팀의 대규모 로봇 데이터셋. RT/ OpenVLA 모두 활용.
    
- **DROID: A Large-Scale In-the-Wild Robot Manipulation Dataset** — K. Desingh et al. (2024)
    
    [arXiv:2403.12945](https://arxiv.org/abs/2403.12945)
    
    → 실제 현장 로봇 데이터를 모은 ‘in-the-wild’ 형식 대규모 데이터셋.
    

---

## **7) 확장/변형 (최신 트렌드)**

- **RoboFlamingo: Vision-Language Foundation Models as Effective Robot Imitators** — X. Li et al. (ICLR 2024)
    
    [arXiv:2311.01378](https://arxiv.org/abs/2311.01378)
    
    → VLM → VLA 전이 성능을 입증한 중간 교량 모델. OpenVLA 이전단계 이해용.
    
- **π₀: A Vision-Language-Action Flow Model for General Robot Control** — (2024/2025)
    
    [arXiv:2410.24164](https://arxiv.org/abs/2410.24164)
    
    → 최신 Flow Matching 기반 VLA. OpenVLA 이후의 진화 방향 참고용.