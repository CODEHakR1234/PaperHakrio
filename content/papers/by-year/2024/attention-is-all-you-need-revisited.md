---
title: "Attention Is All You Need (Revisited)"
description: "Transformer 아키텍처의 핵심 개념과 현재까지의 영향"
tags: [paper, NLP, transformer, attention, year-2017, classic]
authors: "Vaswani et al."
venue: "NeurIPS 2017"
year: 2017
arxiv: "https://arxiv.org/abs/1706.03762"
status: completed
---

# 📄 Attention Is All You Need

> **Authors**: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin  
> **Venue**: NeurIPS 2017  
> **Links**: [arXiv](https://arxiv.org/abs/1706.03762) | [GitHub](https://github.com/tensorflow/tensor2tensor)

---

## 🎯 한 줄 요약
> RNN과 CNN 없이 오직 attention mechanism만으로 구성된 Transformer 모델을 제안하여 기계번역에서 SOTA를 달성하고, 현재 모든 LLM의 기반이 된 혁신적인 논문

---

## 📋 Abstract
기존의 sequence transduction 모델들은 복잡한 RNN이나 CNN을 기반으로 했지만, 이 논문에서는 오직 attention mechanism만을 사용하는 새로운 네트워크 아키텍처인 Transformer를 제안한다. 기계번역 실험에서 기존 모델들보다 우수한 성능을 보이면서도 더 병렬화가 가능하고 훈련 시간이 단축되었다.

---

## 🔑 Key Contributions
1. **Self-Attention 기반 아키텍처**: RNN/CNN 없이 순수 attention만으로 구성
2. **Multi-Head Attention**: 여러 representation subspace에서 동시에 attention 수행
3. **Positional Encoding**: 순서 정보를 위한 위치 인코딩 도입
4. **병렬화 가능**: RNN의 순차적 처리 한계 극복

---

## 🏗️ Method/Architecture

### 📐 Overall Architecture
- **Encoder-Decoder 구조**: 6개 레이어씩 스택
- **Self-Attention**: 입력 시퀀스 내 모든 위치 간 관계 모델링
- **Feed-Forward Networks**: 각 위치에 독립적으로 적용

### 🔧 Key Components
- **Multi-Head Attention**: 8개 헤드로 다양한 관점에서 attention 계산
- **Positional Encoding**: sin/cos 함수를 이용한 위치 정보 주입
- **Layer Normalization**: 각 sub-layer 후 적용
- **Residual Connections**: 그래디언트 소실 방지

### 💡 Novel Ideas
- Attention을 유일한 메커니즘으로 사용
- 완전한 병렬 처리 가능
- 장거리 의존성 효과적 모델링

---

## 🧪 Experiments

### 📊 Datasets
- **WMT 2014 English-German**: 4.5M 문장 쌍
- **WMT 2014 English-French**: 36M 문장 쌍

### 📈 Results
| Method | EN-DE BLEU | EN-FR BLEU | Training Cost |
|--------|-------------|-------------|---------------|
| ByteNet | 23.75 | - | - |
| ConvS2S | 25.16 | 40.46 | 9 days |
| **Transformer** | **28.4** | **41.8** | **3.5 days** |

### 🔍 Analysis
- 기존 SOTA 대비 2+ BLEU 점수 향상
- 훈련 시간 대폭 단축 (병렬화 효과)
- Attention visualization을 통한 해석 가능성 제공

---

## 💭 Personal Notes

### ✅ Strengths
- 혁신적인 아키텍처로 패러다임 전환
- 뛰어난 성능과 효율성 동시 달성
- 해석 가능한 attention weights
- 다양한 태스크로 확장 가능성

### ❌ Limitations
- 메모리 사용량이 시퀀스 길이에 제곱으로 증가
- 작은 데이터셋에서는 과적합 위험
- 위치 정보 표현의 한계

### 🤔 Questions & Ideas
- 더 긴 시퀀스 처리를 위한 효율적 attention 방법?
- 다른 도메인(CV, Speech)으로의 확장 가능성?
- Attention pattern의 언어학적 해석?

### 🔗 Related Work
- [[BERT]] - Transformer encoder 기반 사전훈련 모델
- [[GPT Series]] - Transformer decoder 기반 생성 모델
- [[Vision Transformer]] - CV 분야로의 확장

---

## 📚 References
- Bahdanau et al. (2014) - Neural Machine Translation by Jointly Learning to Align and Translate
- Luong et al. (2015) - Effective Approaches to Attention-based Neural Machine Translation

---

## 🏷️ Tags
#paper #NLP #transformer #attention #classic #foundational #year-2017

---

> **읽은 날짜**: 2025-09-23  
> **난이도**: ⭐⭐⭐⭐☆ (5점 만점)  
> **추천도**: ⭐⭐⭐⭐⭐ (5점 만점)  
> **영향력**: 🌟 **Game Changer** - AI 분야 전체를 바꾼 논문
