---
title: "Attention Is All You Need (간단 정리)"
description: "Transformer의 핵심 아이디어와 영향만 짧게"
tags: [paper, NLP, transformer, attention, year-2017, classic]
authors: "Vaswani et al."
venue: "NeurIPS 2017"
year: 2017
arxiv: "https://arxiv.org/abs/1706.03762"
status: completed
---

# Attention Is All You Need

> **Authors**: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin  
> **Venue**: NeurIPS 2017  
> **Links**: [arXiv](https://arxiv.org/abs/1706.03762) | [GitHub](https://github.com/tensorflow/tensor2tensor)

---

## 한 줄 메모
RNN/CNN 없이 attention만으로 번역 모델을 만든 논문. 병렬화가 잘 돼서 학습이 빠르고, 지금 LLM들 기반이 된 구조.

---

## 핵심 요지(제가 이해한 대로)
- 순차 구조 없이 전체 토큰 관계를 한 번에 본다(self-attention)
- 다중 헤드로 서로 다른 관점을 병렬로 본다
- 위치 정보는 별도 인코딩으로 넣는다

---

## 무엇이 새로웠나
1) RNN을 걷어내고 attention만 사용  
2) multi-head로 병렬 표현  
3) positional encoding으로 순서 보존  
4) 전체적으로 학습/추론 병렬화에 유리

---

## 구조

### 전체 그림
- encoder–decoder 6층씩 (원 논문 기본 설정)
- self-attention + FFN 반복

### 부품
- multi‑head attention, positional encoding, residual, layer norm

### 아이디어 포인트
- 장거리 의존성에 강함, 병렬화 유리

---

## 실험

### 데이터셋
- **WMT 2014 English-German**: 4.5M 문장 쌍
- **WMT 2014 English-French**: 36M 문장 쌍

### 결과
| Method | EN-DE BLEU | EN-FR BLEU | Training Cost |
|--------|-------------|-------------|---------------|
| ByteNet | 23.75 | - | - |
| ConvS2S | 25.16 | 40.46 | 9 days |
| **Transformer** | **28.4** | **41.8** | **3.5 days** |

### 관찰
- BLEU 개선 + 학습 시간 단축
- attention 시각화로 해석 가능성 ↑

---

## 개인 메모

### 좋은 점
- 혁신적인 아키텍처로 패러다임 전환
- 뛰어난 성능과 효율성 동시 달성
- 해석 가능한 attention weights
- 다양한 태스크로 확장 가능성

### 한계
- 메모리 사용량이 시퀀스 길이에 제곱으로 증가
- 작은 데이터셋에서는 과적합 위험
- 위치 정보 표현의 한계

### 질문/아이디어
- 더 긴 시퀀스 처리를 위한 효율적 attention 방법?
- 다른 도메인(CV, Speech)으로의 확장 가능성?
- Attention pattern의 언어학적 해석?

### 관련 작업
- [[BERT]] - Transformer encoder 기반 사전훈련 모델
- [[GPT Series]] - Transformer decoder 기반 생성 모델
- [[Vision Transformer]] - CV 분야로의 확장

---

## 참고
- Bahdanau et al. (2014) - Neural Machine Translation by Jointly Learning to Align and Translate
- Luong et al. (2015) - Effective Approaches to Attention-based Neural Machine Translation

---

## 태그
#paper #NLP #transformer #attention #classic #foundational #year-2017

---

> 읽은 날짜: 2025-09-23  
> 난이도: 중상  
> 추천: 높음  
> 메모: 분야를 바꿔 놓은 논문
