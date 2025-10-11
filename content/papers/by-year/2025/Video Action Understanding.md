---
title: Video Action Understanding
description: paper read in 2025
tags:
  - CV
  - papers
---

### **Video Action Understanding(2014–2025)**###

**Two-Stream CNN (NIPS 2014)**

• **핵심:** RGB + Optical Flow 병렬 구조로 motion 정보 활용 시작

• **논문:** [https://arxiv.org/abs/1406.2199](https://arxiv.org/abs/1406.2199)

• **코드:** [https://github.com/jfzhang95/pytorch-video-recognition](https://github.com/jfzhang95/pytorch-video-recognition)

**C3D (ICCV 2015)**

• **핵심:** 3D Conv으로 spatiotemporal feature 학습

• **논문:** [https://arxiv.org/abs/1412.0767](https://arxiv.org/abs/1412.0767)

• **코드:** [https://github.com/DavideA/c3d-pytorch](https://github.com/DavideA/c3d-pytorch)

**I3D (CVPR 2017)**

• **핵심:** ImageNet pretrained weight 3D화 (Inflated 3D ConvNet)

• **논문:** [https://arxiv.org/abs/1705.07750](https://arxiv.org/abs/1705.07750)

• **코드:** [https://github.com/piergiaj/pytorch-i3d](https://github.com/piergiaj/pytorch-i3d)

**Non-local Neural Networks (CVPR 2018)**

• **핵심:** Self-attention으로 프레임 간 장거리 관계 모델링

• **논문:** [https://arxiv.org/abs/1711.07971](https://arxiv.org/abs/1711.07971)

• **코드:** [https://github.com/AlexHex7/Non-local_pytorch](https://github.com/AlexHex7/Non-local_pytorch)

**SlowFast Networks (ICCV 2019)**

• **핵심:** 빠른/느린 시간 해상도를 결합한 dual-stream 구조

• **논문:** [https://arxiv.org/abs/1812.03982](https://arxiv.org/abs/1812.03982)

• **코드:** [https://github.com/facebookresearch/SlowFast](https://github.com/facebookresearch/SlowFast)

**TimeSformer (NeurIPS 2021)**

• **핵심:** Transformer를 비디오 인식에 적용 (space-time attention 분리)

• **논문:** [https://arxiv.org/abs/2102.05095](https://arxiv.org/abs/2102.05095)

• **코드:** [https://github.com/facebookresearch/TimeSformer](https://github.com/facebookresearch/TimeSformer)

**ViViT (ICCV 2021)**

•      **핵심:** 비디오 인식용 pure Transformer 모델 (spatial/temporal factorization)

• **논문:** [https://arxiv.org/abs/2103.15691](https://arxiv.org/abs/2103.15691)

• **코드:** [https://github.com/google-research/scenic/tree/main/scenic/projects/vivit](https://github.com/google-research/scenic/tree/main/scenic/projects/vivit)

**InternVideo (CVPR 2022)**

• **핵심:** CLIP 확장 → Video-Language Pretraining (cross-modal alignment)

• **논문:** [https://arxiv.org/abs/2212.03191](https://arxiv.org/abs/2212.03191)

• **코드:** [https://github.com/OpenGVLab/InternVideo](https://github.com/OpenGVLab/InternVideo)

**VideoMAE (ICLR 2023)**

• **핵심:** Masked autoencoding으로 self-supervised video pretraining 달성

• **논문:** [https://arxiv.org/abs/2203.12602](https://arxiv.org/abs/2203.12602)

• **코드:** [https://github.com/MCG-NJU/VideoMAE](https://github.com/MCG-NJU/VideoMAE)


**EgoSchema (CVPR 2025)**

• **핵심:** Temporal reasoning + 인과 관계 이해 (VLA 확장점)

• **논문:** [https://egoschema.stanford.edu/](https://egoschema.stanford.edu/)

• **코드****:** [https://github.com/StanfordVL/EgoSchema](https://github.com/StanfordVL/EgoSchema)