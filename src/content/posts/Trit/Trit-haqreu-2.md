---
title: 'Считаем до трёх: два（数到三：二）'
published: 2025-02-03
description: '本系列文章聚焦三进制计算器的开发。上期我们构建了三进制多路复用器（TRIMUX）及加法器，本期重点探索**三进制存储单元**的设计。完整系列如下：......'
image: ''
tags: [Unauthorized archiving]
category: 'Trit'
draft: false 
license: false
---

:::note[来源]
以下内容来源于与 haqreu 的 [Считаем до трёх: два](https://habrahabr.ru/post/324650/)，仅对其进行翻译，著作权归原作者所有。
:::
## 三进制存储单元设计与实现

### 项目背景与系列文章

本系列文章聚焦三进制计算器的开发。上期我们构建了三进制多路复用器（TRIMUX）及加法器，本期重点探索**三进制存储单元**的设计。完整系列如下：

- [数到三：一（三进制复用器与加法器）](https://blog.project-starfield.cn/posts/trit/trit-haqreu-1/)
- **数到三：二（存储单元）**
- [数到三：三（计数器）](https://blog.project-starfield.cn/posts/trit/trit-haqreu-3/)
- [数到三：四（单三进制位计算器与指令系统）](https://blog.project-starfield.cn/posts/trit/trit-haqreu-4/)

---

### 硬件基础：三进制复用器

三进制复用器是本项目的核心模块。下图展示了两种实现版本：

1. **原始设计**：亚历山大·沙巴尔申设计的TRIMUX模块，采用穿孔安装技术。
2. **优化版本**：作者改进的表面贴装设计，减少过孔数量（仅12个），降低成本且便于手工制作。

![img1](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu2img1.jpg?raw=true)

![img2](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu2img2.png?raw=true)

---

### 输入/输出模块（trimuxIO）

为简化测试流程，作者设计了专用I/O模块：

- **每路I/O功能**：
    - 三档拨动开关（默认中位接地0V）。
    - 发射极跟随器确保弱信号稳定输出。
    - 输入模式时，开关可选择+5V或-5V，150Ω电阻防止短路。
- **测试板特性**：
    - 单层PCB，无跳线，集成9路相同I/O电路。
    - 支持静态存储单元测试（输入C、A、B，输出Q）。

![img3](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu2img3.png?raw=true)

![img4](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu2img4.png?raw=true)

![img5](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu2img5.jpg?raw=true)

---

### 静态存储单元：电平控制锁存器

**电路结构**：

- 使用两块复用器构建，主复用器根据时钟信号C选择输入A/B或保持当前状态。
- **工作逻辑**：
    - C=-1：输出Q锁定输入A。
    - C=1：输出Q锁定输入B。
    - C=0：Q保持原值，忽略输入。

![img6](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu2img6.png?raw=true)

---

### 动态存储单元：边沿触发触发器

### 二进制参考：主从D触发器

二进制边沿触发器由两个电平锁存器和一个反相器构成，其工作原理如下：

![img7](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu2img7.gif?raw=true)

![img8](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu2img8.jpeg?raw=true)

### 三进制实现方案

- **时钟信号处理**：将C分解为`min(C,0)`和`max(C,0)`，分别控制主从锁存器。
- **工作流程**：需连续两个上升沿才能将输入Am传递至输出Qs。
- **初始化要求**：上电后需手动初始化，避免输出未定义。

![img9](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu2img9.png?raw=true)

![img10](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu2img10.png?raw=true)

---

### 总结与展望

- **静态单元**：适用于简单数据锁存场景，成本低且易于实现。
- **动态单元**：作为三进制计数器的核心组件，支持时序逻辑操作。
- **挑战**：手工制作大规模三进制内存（如千三进制位）成本较高，但小规模演示完全可行。

**下期预告**：三进制计数器与算术逻辑单元（ALU）设计。

---

**翻译说明**

- 技术术语（如“триггер”）统一译为“触发器”，电压值（如“-5V”）保留原格式。
- 图片链接与占位符严格对应原文位置，Markdown标题层级调整以提升可读性。
- 去除分页符，通过章节划分维持逻辑连贯性。