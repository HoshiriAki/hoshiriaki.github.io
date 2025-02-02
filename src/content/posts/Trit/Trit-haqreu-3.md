---
title: 'Считаем до трёх: три（数到三：三）'
published: 2025-02-03
description: ''
image: ''
tags: [Unauthorized archiving]
category: 'Trit'
draft: false 
---
:::note[来源]
以下内容来源于与 haqreu 的[Считаем до трёх](https://habr.com/ru/articles/328162/)，仅对其进行翻译，著作权归原作者所有。
:::
## 三进制计数器设计与实现

### 项目背景与系列进展

好的，我们继续。本文将介绍如何制作三进制计数器。需要提醒的是，我的目标是打造一个基于三态逻辑的最简可编程硬件设备。

这是第三篇文章，后续内容将陆续发布。目录如下：  

- [数到三：一（三进制复用器与加法器）](https://blog.project-starfield.cn/posts/trit/trit-haqreu-1/)
- [数到三：二（存储单元](https://blog.project-starfield.cn/posts/trit/trit-haqreu-2/)
- **数到三：三（计数器）**
- [数到三：四（单三进制位计算器与指令系统）](https://blog.project-starfield.cn/posts/trit/trit-haqreu-4/)

和往常一样，本文图片多于文字。以下是今天要讨论的核心硬件实物图：  

![img1](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img1.jpg?raw=true)  

# **前情提要**  

## **三态多路复用器**  

需要重申的是，整个系统的唯一基础元件是三态多路复用器，本质上是一个三位置开关。逻辑上它有五个引脚：选择信号（sel）输入三态信号，根据其值将三个输入信号（inN、inO、inP）中的一个传递到输出端（out）：  

![img2](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img2.png?raw=true)  

下图是搭载两个（解）复用器的电路板。按照  [原版命名](http://nedocon.com/store/trimux/)  ，我将其称为「Trimux」（三态复用器）。  

![img3](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img3.jpg?raw=true)  

若将复用器直接配置为信号跟随器（将-5V、0V、+5V分别接入N、O、P引脚），当S输入端输入三角波时，C输出端将产生阶梯信号：  

![img4](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img4.jpg?raw=true)  

本文将仅使用两个核心模块：半加器与存储单元。  

---  

## **半加器**  

在  [第一篇文章](https://habrahabr.ru/post/324062/#comment_10120828)  中，我们详细分析了半加器的工作原理。其原型板实物如下：  

![img5](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img5.jpg?raw=true)  

上方为半加器电路，下方为输入输出板。由于需要大量半加器，单独制作原型板效率过低，因此我设计了专用半加器板。其布局图如下：  

![img6](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img6.png?raw=true)  

成品板实物：  

![img7](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img7.jpg?raw=true)  
![img8](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img8.jpg?raw=true)  

该板需要插入三个Trimux模块。这并未违背「仅使用复用器作为基础元件」的原则，因为辅助板上仅包含用于节省布线的连接线。电阻仅作为限流元件，可移除。计算仍由Trimux完成。下图是半加器测试场景，输入输出板也已升级：  

![img9](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img9.jpg?raw=true)  

最终组装完成的半加器模块如下：  

![img10](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img10.jpg?raw=true)  

---  

## **三态存储器**  

在  [第二篇文章](https://habrahabr.ru/post/324650/)  中，我们证明了单个Trimux（包含两个三态复用器）可构成电平触发的存储单元（三态锁存器）。若将两个锁存器主从级联，则可实现边沿触发的动态存储单元（三态主从触发器）。  

值得一提的是，在上一篇文章的评论区，用户  [mayorovp](https://habr.com/ru/users/mayorovp/)  提出了一种仅需四个复用器的方案。我承诺尝试并已实现！  

以下是经调整后的方案：  

![img11](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img11.png?raw=true)  

当C端时钟信号连续经历N-O、O-P跳变时，该单元将输入A的值锁存至输出Q。  

与半加器类似，我设计了专用存储模块，其布局图如下：  

![img12](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img12.png?raw=true)  

该板包含两个独立的三态锁存器。若配置四个跳线，则可实现上述动态存储单元。  

成品板实物：  

![img13](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img13.jpg?raw=true)  

最终模块如下：  

![img14](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img14.jpg?raw=true)  

---  

# **简易三进制计数器**  

至此，我们可脱离复用器抽象层，使用更高阶模块构建系统。取三个存储单元与三个半加器，即可构成基础三进制计数器。  

六个模块的连接方式如下：  

![img15](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img15.png?raw=true)  

时钟输入端接入三态锯齿波信号。实际上，存储单元与半加器组合可实现基本分频器。若将红色「+1」替换为「-1」，计数器将执行减法。下图为原型板实物，左侧三个LED显示存储单元状态，右侧开关用于手动触发计数：  

![img16](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img16.jpg?raw=true)  

以下是遍历计数器27种状态的演示视频：  

该计数器的缺点在于：上电时状态不确定（长期断电后通常归零），且复位操作复杂（至少我未找到简单方法）。  

---  

# **进阶改进**  

感谢  [mayorovp](https://habr.com/ru/users/mayorovp/)  提出的存储单元方案。回顾前文，原动态存储单元比其方案多用了两个复用器。现尝试合并两者：  

![img17](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img17.png?raw=true)  

此计数器功能与前代相同，但多用了两个复用器。为何？因为我乐意！注意灰色标记的Bm与As输入端未使用——主锁存器时钟端永不接正信号，从锁存器时钟端永不接负信号。  

若再添加两个复用器：  

![img18](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img18.png?raw=true)  

当输入R为-1时，功能等同前代。但若R为0或+1，锁存器将捕获Bm与As的输入值！  

由此得到可双向计数且支持手动写入的三进制计数器。操作演示视频如下：  

最终，使用34个复用器（17个Trimux）可构建完整的三进制计数器。每增加一个存储单元与半加器即可扩展一位三态计数。  

参考Alexander Shabarshin 的[方案](http://www.nedopc.org/forum/viewtopic.php?f=79&t=60&start=15#p1913)  

，三进制时钟的分钟计数器需四位三态（81种状态，平衡三进制表示-40至40）。如何表示45分钟？他巧妙提议将其视为「差15分钟整点」！下图右下角的五个复用器用于整点时复位分钟计数器：  

![img19](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img19.png?raw=true)  

本文至此结束，下期尝试实现计算功能。  

# **附：电源设计**  

**电源模块制作简述**  
在撰写前两篇文章时，为获得双极性电源，我使用了简单的电阻分压器，但它发热严重。由于需要为三角波生成器提供±12V双极性电源，若使用两个自耦变压器（ЛАТР）则过于笨重，因此我决定自制电源模块。从中国订购了现成的电源模块并组装如下：  

![img20](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img20.jpg?raw=true)  

虽不知必要性，但还是在电源模块前加装了电源滤波器。由于涉及230V高压，必须配备外壳。我选用3mm厚的PVC板，通过镍铬丝加热弯曲成型：  

![img21](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img21.jpg?raw=true)  

最终得到如下结构的箱体：  

![img22](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img22.jpg?raw=true)  

内部电源模块布局如下：  

![img23](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img23.jpg?raw=true)  

成品电源模块已可投入使用：  

![img24](https://github.com/HoshiriAki/hoshiriaki.github.io/blob/main/src/content/posts/Trit/img/Trithaqreu3img24.jpg?raw=true)  

未精确计算总成本，但粗略估计约为30美元。  

---

