---
title: Считаем до трёх (数到三)
published: 2025-02-03
description: '[搬运]我正在为我校学生准备计算机体系结构课程讲义，并想通过一个小型实践项目让学生们构建一个基于三进制逻辑的可编程计算器。本文重点介绍基础模块——三进制多路复用器的设计与实现。本文仅涉及最基础的加法器及其硬件实现，后续文章将逐步展开更复杂的组件。'
image: ''
tags: [Unauthorized archiving]
category: 'Trit'
draft: false 
---
:::note[来源]
以下内容来源于与 haqreu 的 [Считаем до трёх](https://habr.com/ru/articles/324062/)，仅对其进行翻译，著作权归原作者所有。
:::
## 三进制计算

我正在为我校学生准备计算机体系结构课程讲义，并想通过一个小型实践项目让学生们构建一个基于三进制逻辑的可编程计算器。本文重点介绍基础模块——三进制多路复用器的设计与实现。本文仅涉及最基础的加法器及其硬件实现，后续文章将逐步展开更复杂的组件。


- **数到三：一（三进制复用器与加法器）**
- [数到三：二（存储单元](https://blog.project-starfield.cn/posts/trit/trit-haqreu-2/)
- [数到三：三（计数器）](https://blog.project-starfield.cn/posts/trit/trit-haqreu-3/)
- [数到三：四（单三进制位计算器与指令系统）](https://blog.project-starfield.cn/posts/trit/trit-haqreu-4/)

我选择了平衡三进制系统，每个三进制位（трит）可表示-1、0或1。关于该系统的详细说明可参考此处。对于所有“为什么选择三进制？”的问题，我的回答是：“Because I can”（因为我可以）。

![img1](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img1.jpg?raw=true)

## 构建材料：三进制多路复用器

### 逻辑层面

三进制多路复用器是核心构建模块。逻辑上，它有五个引脚：一个选择信号输入（sel），根据该信号的值（-1、0、1），输出端（out）将连接到三个输入信号（inN、inO或inP）之一。其电路符号如下：

解复用器功能类似，根据选择信号将输入分配到三个输出之一。我使用的硬件模块具有双向开关，因此可同时作为复用器和解复用器（但目前暂未使用解复用功能）。

![img2](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img2.png?raw=true)

### 硬件实现

该设计源自亚历山大·沙巴尔申（Александр Шабаршин），我直接采用了其方案，仅将封装改为表面贴装以降低成本（中国采购单价约0.5美元）。在发现该设计前，我曾尝试用CD4016和CD4007搭建电路，但体积庞大且效率低下。DG403开关芯片实现了真正的三进制逻辑，无需冗余的二进制编码。

沙巴尔申进一步设计了专用三进制逻辑芯片TRIMUX，使用两片DG403芯片分别工作在-5V~0V和0V~5V电压范围，支持-5V、0V、5V三态信号。每两片DG403可容纳两个三进制复用器。

![img3](https://github.com/hoshiriaki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img3.png?raw=true)

![img4](https://github.com/hoshiriaki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img4.jpg?raw=true)

![img5](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img5.png?raw=true)

---

## 应用案例：单参数函数

### 基础运算

- **加1**：输入A通过复用器选择输出A+1（模三运算）。
- **减1**：类似逻辑实现A-1。
- **最大值函数**：max(A,0)的实现。
- **最小值函数**：min(A,0)的实现。

![img6](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img6.png?raw=true)

![img7](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img7.png?raw=true)

![img8](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img8.png?raw=true)

![img9](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img9.png?raw=true)

---

## 双参数函数：半加器

### A + B 的实现

半加器需3-4个复用器。第一层处理输入A的函数，第二层根据B的值选择输出。

![img10](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img10.png?raw=true)

### 共识函数（Consensus）

若A=B=-1则输出-1；若A=B=1则输出1；否则输出0。

![img11](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img11.png?raw=true)

### 硬件测试

半加器输出S（和）与C（进位），满足A + B = S + 3C。测试时：

- 红灯表示-1，熄灭表示0，绿灯表示1。
- 下表展示所有9种输入组合的S和C值：

![img12](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img12.jpg?raw=true)

| S,C | B=-1 | B=0 | B=1 |
| --- | --- | --- | --- |
| A=-1 | 1,-1 | -1,0 | 0,0 |
| A=0 | -1,0 | 0,0 | 1,0 |
| A=1 | 0,0 | 1,0 | -1,1 |

---

## 三参数函数：全加器

全加器接受三个输入（A、B、Cin），输出S（和）与Cout（进位），满足A + B + Cin = S + 3Cout。其结构继承半加器（绿色部分），并增加Cin处理层。

![img13](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img13.png?raw=true)

### 溢出逻辑

溢出位的计算与半加器类似，电路复用其逻辑模块。

![img14](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img14.png?raw=true)

### 硬件实现

![img15](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img15.png?raw=true)

![img16](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img16.jpg?raw=true)

全加器支持27种输入组合。下表展示Cin=-1、0、1时的输出：

**Cin = -1**

| A\B | -1 | 0 | 1 |
| --- | --- | --- | --- |
| -1 | 0,0 | 1,0 | -1,0 |
| 0 | 1,0 | 0,0 | 0,0 |
| 1 | -1,0 | 0,0 | 1,0 |

**Cin = 0**

| A\B | **-1** | **0** | **1** |
| --- | --- | --- | --- |
| -1 | 1,0 | -1,0 | 0,0 |
| 0 | -1,0 | 0,0 | 1,0 |
| 1 | 0,0 | 1,0 | -1,1 |

**Cin = 1**

| A\B | -1 | 0 | 1 |
| --- | --- | --- | --- |
| -1 | -1,0 | 0,0 | 1,0 |
| 0 | 0,0 | 1,0 | -1,1 |
| 1 | 1,0 | -1,1 | 0,1 |

全加器可通过堆叠实现多位数运算。下图展示两位加法器结构：

![img17](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img17.jpg?raw=true)

![img18](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu1img18.jpg?raw=true)

---

## 结语

本文介绍了三进制计算的基础模块。后续将探讨计数器、存储器和ALU等组件。敬请期待！

---

*翻译注：技术术语与电路设计细节均按行业标准译法处理，部分俄语人名保留原名。表格格式已调整为中文排版习惯。*