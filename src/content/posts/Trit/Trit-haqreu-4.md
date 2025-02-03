---
title: 'Считаем до трёх: четыре（数到三：四）'
published: 2025-02-03
description: '[搬运]这是第四篇文章，后续内容将陆续发布。目录如下：...'
image: ''
tags: [Unauthorized archiving]
category: 'Trit'
draft: false 
---
:::note[来源]
以下内容来源于与 haqreu 的[Считаем до трёх](https://habr.com/ru/articles/337606/)，仅对其进行翻译，著作权归原作者所有。
:::
## **可行性验证：单三态计算器**  

这是第四篇文章，后续内容将陆续发布。目录如下：  

- [数到三：一（三进制复用器与加法器）](https://blog.project-starfield.cn/posts/trit/trit-haqreu-1/)
- [数到三：二（存储单元](https://blog.project-starfield.cn/posts/trit/trit-haqreu-2/)
- [数到三：三（计数器）](https://blog.project-starfield.cn/posts/trit/trit-haqreu-3/)
- **数到三：四（单三进制位计算器与指令系统）**

以下是本文讨论的核心硬件实物图（跳线之王！）：  

![img1](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu4img1.jpg?raw=true)  

# **远期规划：三态计算器的指令系统**  

如先前所述，我的目标是构建一个基于三态逻辑的简易可编程硬件设备。目前倾向于采用  [此处](http://www.nedopc.org/forum/viewtopic.php?f=79&t=17752)  

提出的指令系统：  
- 每条指令长度固定（5个三态位）  
- 2个三态位用于指令标识符，3个三态位（一个三态组）用于参数  

**NN**(-4) — 未来扩展（带进位/借位的加减法、根据符号标志和进位标志跳过指令等）  
**NO**(-3) — 跳转至ttt地址（未来可通过R13寄存器切换内存段）  
**NP**(-2) — 对R1和R2执行OPB ttt（通用二元指令，R3和R4提供额外参数），设置符号标志  
**ON**(-1) — 对R1执行OPA ttt（通用一元指令，结果写入R1），设置符号标志  
**OO**(0) — 寄存器复制（详见下文）  
**OP**(+1) — 将三态组写入R1寄存器  
**PN**(+2) — 将三态组写入R2寄存器  
**PO**(+3) — 将三态组写入R3寄存器  
**PP**(+4) — 将三态组写入R4寄存器  

**寄存器复制操作：**  
指令编码 -> 功能描述
OONNN -> 复制R1到R13
OONNO -> 复制R1到R12
OONNP -> 复制R1到R11
OONON -> 复制R1到R10
OONOO -> 复制R1到R9
OONOP -> 复制R1到R8
OOPON -> 复制R1到R7
OOPOO -> 复制R1到R6
OOPOP -> 复制R1到R5
OOONN -> 复制R1到R4
OOONO -> 复制R1到R3
OOONP -> 复制R1到R2
OOOON -> R1减1并设置符号标志
OOOOO -> 检查R1并设置符号标志
OOOOP -> R1加1并设置符号标志
OOOPN -> 复制R2到R1
OOOPO -> 复制R3到R1
OOOPP -> 复制R4到R1
OOPNN -> 复制R5到R1
OOPNO -> 复制R6到R1
OOPNP -> 复制R7到R1
OOPON -> 复制R8到R1
OOPOO -> 复制R9到R1
OOPOP -> 复制R10到R1
OOPPN -> 复制R11到R1
OOPPO -> 复制R12到R1
OOPPP -> 复制R13到R1

注意：复制操作仅涉及R1寄存器。其他寄存器间的复制需分两步完成，但指令参数的三态位允许寻址多达13个寄存器。  

指令存储器将使用三态开关实现。由于指令参数为三态组，指令存储器仅支持三态地址（27条指令），容量不足。因此将采用多段内存设计，R13寄存器用于切换段，形成六态地址总线。实际指令内存容量仅受限于焊接工作量。  

单个指令段由15块如下电路板组成：  

![img2](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu4img2.jpg?raw=true)  

每块板搭载9个三态开关，指令通过双色LED直观显示。  

但在焊接数百个三态复用器前，需先验证基础架构的可行性——构建更简易的计算器。  

# **当前任务：单三态计算器**  

简化至极限：  
- 仅支持9条指令，每条由高两位三态位（I）和低两位三态位（J）定义：  
**IJ**  
NN — 复制R1至R4  
NO — 复制R1至R3  
NP — 复制R1至R2  
ON — R1减1并设置符号标志  
OO — 检查R1并设置符号标志  
OP — R1加1并设置符号标志  
PN — 复制R2至R1  
PO — 复制R3至R1  
PP — 复制R4至R1  

- 四组单三态寄存器+符号标志  
- 无指令存储器，无需指令计数器  

### **寄存器构建**  

采用模块化组装与测试，避免密集布线错误。四组电平触发存储单元（参见  [第二篇文章](https://blog.project-starfield.cn/posts/trit/trit-haqreu-2/)  ）结构如下：  

![img3](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu4img3.png?raw=true)  

为简化接口，寄存器通过1-4复用器寻址（简化版1-9复用器）：  

![img4](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu4img4.png?raw=true)  
![img5](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu4img5.png?raw=true)  

寄存器模块输入为两位三态地址，输出对应存储单元的C、A、Q引脚。测试视频如下：  

### **时序控制与地址分配**  

寄存器复制通过中间缓冲器完成：  
1. 负时钟电平：数据从寄存器复制至缓冲器  
2. 正时钟电平：数据从缓冲器复制至目标寄存器  

地址分配逻辑基于指令码（IJ）和时钟信号（CLK）：  

![img6](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu4img6.png?raw=true)  

红色复用器生成源地址，绿色复用器生成目标地址，蓝色复用器根据CLK切换模式。测试视频如下：  

### **数据复制与运算逻辑**  

基础复制逻辑：  

![img7](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu4img7.png?raw=true)  

当指令高位非零时，缓冲器输出直连至存储器输入；当高位为零时，通过半加器（参见  [第一篇文章](https://blog.project-starfield.cn/posts/trit/trit-haqreu-1/)  ）执行加减操作并更新符号标志。完整计算器架构如下：  

![img8](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu4img8.png?raw=true)  

实物组装图：  

![img9](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu4img9.jpg?raw=true)  

测试过程中发现的劣质跳线（致敬东方合作伙伴！）：  

![img10](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu4img10.jpg?raw=true)  

# **总结**  

三态计算器的构建路径已明确，需投入约300-400个三态复用器。  

- 算术逻辑单元（ALU）需为每个三态位独立设计  
- 需扩展寄存器、指令计数器、指令存储器及解码电路  

欢迎提出新思路与建议！  